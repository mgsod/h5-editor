import { ref } from "vue";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/mudules/editor/mutation-type";
import { cloneDeep } from "lodash";
import { diffPatcher } from "@/store/mudules/editor/mutations";
import { IComponent } from "@/components/RenderComponent/Component";

const CRITICAL = 20;

export default () => {
  const store = useStore();
  const startX = ref(0);
  const startY = ref(0);
  const offsetX = ref(0);
  const offsetY = ref(0);
  const resize = ref(false);
  // 当前状态
  let left = cloneDeep(store.state.editor.pages);
  let resizeHandle: string;
  /**
   * 鼠标按下
   * @param event
   * @param handle
   */
  const mouseDown = (event: MouseEvent, handle: string) => {
    event.preventDefault();
    event.stopPropagation();
    const { clientX, clientY } = event;
    startX.value = clientX;
    startY.value = clientY;
    resize.value = true;
    resizeHandle = handle;
    document.body.addEventListener("mousemove", mouseMove);
    document.body.addEventListener("mouseup", mouseUp);
  };
  /**
   * 鼠标移动期间，更新坐标
   * @param event
   */
  const mouseMove = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (!resize.value) return;
    const component = store.state.editor.selectedComponents;
    let { width, height, top = 0, left = 0 } = component as IComponent;
    const { clientX, clientY } = event;
    offsetX.value = clientX - startX.value;
    offsetY.value = clientY - startY.value;
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
    store.commit(MUTATION_TYPE.RESIZE, {
      id: component?.id,
      width,
      height,
      top,
      left,
    });
  };
  const mouseUp = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    resize.value = false;
    document.body.removeEventListener("mousemove", mouseMove);
    document.body.removeEventListener("mouseup", mouseUp);
    // 记录一次快照
    diffPatcher.saveSnapshots(left, store.state.editor.pages);
    // 更新left
    left = cloneDeep(store.state.editor.pages);
    resizeHandle = "";
    offsetY.value = 0;
    offsetX.value = 0;
  };

  return {
    mouseDown,
    mouseMove,
    mouseUp,
    offsetY,
    offsetX,
    resize,
  };
};
