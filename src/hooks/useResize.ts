import { computed, Ref, ref } from "vue";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutation-type";
import { cloneDeep } from "lodash";
import { diffPatcher } from "@/store/Editor/mutations";
import { IComponent } from "@/components/Editor/RenderComponent/Component";
import { TComponent } from "@/components/Editor/RenderComponent/types";
import { Position } from "@/components/Editor/RenderComponent/Layout";

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
export default (position: Ref<Position>) => {
  const store = useStore();
  const startX = ref(0);
  const startY = ref(0);
  const offsetX = ref(0);
  const offsetY = ref(0);
  const resize = ref(false);
  const rePosition = ref(false);
  const resizePoint = computed(() => {
    const points = ["lt", "rt", "lb", "rb", "l", "t", "r", "b"];
    // 相对定位只能拖拽r，rb，b 三个点
    if (position.value === "relative") {
      return points.filter(
        (item) => !["lt", "rt", "lb", "l", "t"].includes(item)
      );
    }
    return points;
  });
  // 当前状态
  let left = cloneDeep(store.state.editor.pages);
  let resizeHandle: string;

  let currentComponent: TComponent | null = null;

  function mouseDown(event: MouseEvent, handle: string): void;
  function mouseDown(event: MouseEvent, handle: TComponent): void;
  function mouseDown(event: MouseEvent, handle: TComponent | string) {
    event.preventDefault();
    event.stopPropagation();
    const { clientX, clientY } = event;
    startX.value = clientX;
    startY.value = clientY;

    if (typeof handle === "string") {
      resize.value = true;
      resizeHandle = handle;
      currentComponent = {
        ...(store.state.editor.selectedComponents as TComponent),
      };
    } else {
      rePosition.value = true;
      currentComponent = { ...handle };
      if (handle.id === "root") return;
    }

    document.body.addEventListener("mousemove", mouseMove);
    document.body.addEventListener("mouseup", mouseUp);
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
    event.preventDefault();
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
        width += offsetX.value;
      }
      if (resizeHandle.includes("b")) {
        height += offsetY.value;
      }
      if (resizeHandle.includes("t")) {
        const tempHeight = height - offsetY.value;
        if (tempHeight >= CRITICAL) {
          height = tempHeight;
          top = top + offsetY.value;
        } else {
          const offset = height - CRITICAL;
          height = CRITICAL;
          top = top + offset;
        }
      }
      if (resizeHandle.includes("l")) {
        const tempWidth = width - offsetX.value;
        if (tempWidth >= CRITICAL) {
          width -= offsetX.value;
          left = left + offsetX.value;
        } else {
          const offset = width - CRITICAL;
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
      id: currentComponent?.id,
      width,
      height,
      top,
      left,
      margin,
    });
  };
  const mouseUp = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    resize.value = false;
    rePosition.value = false;
    document.body.removeEventListener("mousemove", mouseMove);
    document.body.removeEventListener("mouseup", mouseUp);
    // 记录一次快照
    diffPatcher.saveSnapshots(left, store.state.editor.pages);
    // 更新left
    left = cloneDeep(store.state.editor.pages);
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
