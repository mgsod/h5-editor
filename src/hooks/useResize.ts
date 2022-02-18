import { computed, ref } from "vue";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import { cloneDeep } from "lodash";
import { diffPatcher } from "@/store/Editor/util";
import { IComponent } from "@/components/Editor/BuiltInComponents/Component";
import { TComponent } from "@/components/Editor/ComponentTypes";
import { IPage } from "@/store/Editor";

const CRITICAL = 20;

let currentDomSize: { width: number; height: number } | null = null;

function getDomSize(id: string) {
  if (currentDomSize) return currentDomSize;
  const currentDom = document.getElementById(id) as HTMLElement;
  currentDomSize = {
    width: currentDom.offsetWidth,
    height: currentDom.offsetHeight,
  };
  return currentDomSize;
}

export default () => {
  const store = useStore();
  const startX = ref(0);
  const startY = ref(0);
  const offsetX = ref(0);
  const offsetY = ref(0);
  const resize = ref(false);
  const rePosition = ref(false);
  let currentComponent: TComponent | null = null;

  // 定位方式
  const position = computed(() => {
    return store.state.editor.selectedComponents?.position || "";
  });

  // 设置拖拽点
  const resizePoint = computed(() => {
    const all = ["lt", "rt", "lb", "rb", "l", "t", "r", "b"];
    if (store.state.editor.selectedComponents) {
      // 如果是根节点，或者带有根节点属性（例如tab组件中默认会又一个container容器，这个容器标识为根组件）
      // 不需要拖拽点
      if (
        store.state.editor.selectedComponents.id === "root" ||
        (store.state.editor.selectedComponents as TComponent).isRoot
      )
        return [];
      // 如果当前有组件拖拽进本组件，也不需要展示拖拽点。橙色虚线边控优先级高于选中边控
      if (
        store.state.editor.selectedComponents.id ===
        store.state.editor.enterContainer?.id
      ) {
        return [];
      }
      if (position.value === "relative" || position.value === "static") {
        // 相对定位只能拖拽r，rb，b 三个点
        return all.filter(
          (item) => !["lt", "rt", "lb", "l", "t"].includes(item)
        );
      } else {
        return all;
      }
    }
    return [];
  });

  // 当前状态
  let left: IPage[];
  let resizeHandle: string;

  /**
   * 鼠标按下的行为
   * @param event 鼠标事件对象
   * @param handle 当handle为string标识拖拽的各个点位，即resize。如果传入的是一个组件，则是改变位置
   */
  function mouseDown(event: MouseEvent, handle: string | TComponent) {
    //Event.preventDefault();
    event.stopPropagation();
    // 如果鼠标按下的是一个组件
    if (handle && typeof handle !== "string") {
      // 但是这个组件又不是当前选中的组件。不往下执行操作
      if (handle.id !== store.state.editor.selectedComponents?.id) {
        return;
      }
    }
    if (event.button !== 0) return;
    // 更新left
    left = cloneDeep(store.state.editor.pages);
    const { clientX, clientY } = event;
    startX.value = clientX;
    startY.value = clientY;
    currentComponent = {
      ...store.state.editor.selectedComponents,
    } as TComponent;
    if (
      currentComponent &&
      currentComponent.id !== "root" &&
      !currentComponent.isRoot
    ) {
      if (typeof handle === "string") {
        resize.value = true;
        resizeHandle = handle as string;
      } else {
        rePosition.value = true;
      }
      document.body.addEventListener("mousemove", mouseMove);
      document.body.addEventListener("mouseup", mouseUp);
    }
  }

  /**
   * 鼠标按下
   * @param event
   * @param handle
   */

  /**
   * 鼠标移动期间，更新坐标
   * @param event
   */
  const mouseMove = (event: MouseEvent) => {
    event.stopPropagation();
    //Event.preventDefault();
    const { clientX, clientY } = event;
    offsetX.value = clientX - startX.value;
    offsetY.value = clientY - startY.value;
    let width, height, top, left, margin;

    // 如果是更改大小
    if (resize.value) {
      ({
        width,
        height,
        top = 0,
        left = 0,
        margin,
      } = currentComponent as TComponent);
      if (width === "") {
        width = getDomSize((currentComponent as TComponent).id).width;
      }
      if (height === "") {
        height = getDomSize((currentComponent as TComponent).id).height;
      }
      if (resizeHandle.includes("r")) {
        (width as number) += offsetX.value;
      }
      if (resizeHandle.includes("b")) {
        (height as number) += offsetY.value;
      }
      if (resizeHandle.includes("t")) {
        const tempHeight = (height as number) - offsetY.value;
        if (tempHeight >= CRITICAL) {
          height = tempHeight;
          top = top + offsetY.value;
        } else {
          const offset = (height as number) - CRITICAL;
          height = CRITICAL;
          top = top + offset;
        }
      }
      if (resizeHandle.includes("l")) {
        const tempWidth = (width as number) - offsetX.value;
        if (tempWidth >= CRITICAL) {
          (width as number) -= offsetX.value;
          left = left + offsetX.value;
        } else {
          const offset = (width as number) - CRITICAL;
          width = CRITICAL;
          left = left + offset;
        }
      }
    }

    // 如果是更改位置
    if (rePosition.value) {
      ({
        top = 0,
        left = 0,
        width,
        height,
        margin,
      } = currentComponent as IComponent);
      if (position.value === "static") {
        if (margin) {
          const { top: marginTop = 0, left: marginLeft = 0 } = margin;
          margin = {
            top: marginTop + offsetY.value,
            left: marginLeft + offsetX.value,
          };
        } else {
          margin = {
            top: offsetY.value,
            left: offsetX.value,
          };
        }
      } else {
        top += offsetY.value;
        left += offsetX.value;
      }
    }
    store.commit(MUTATION_TYPE.RESIZE, {
      id: (currentComponent as IComponent).id,
      width,
      height,
      top,
      left,
      margin,
    });
  };
  const mouseUp = (event: MouseEvent) => {
    event.stopPropagation();
    //Event.preventDefault();
    resize.value = false;
    rePosition.value = false;
    document.body.removeEventListener("mousemove", mouseMove);
    document.body.removeEventListener("mouseup", mouseUp);
    // 记录一次快照
    diffPatcher.saveSnapshots(left, store.state.editor.pages);
    resizeHandle = "";
    offsetY.value = 0;
    offsetX.value = 0;
    currentDomSize = null;
  };

  return {
    mouseDown,
    resizePoint,
  };
};
