import { useStore } from "@/store";
import { nextTick, ref, watch, computed, Ref } from "vue";
import { IComponent } from "@/components/Editor/RenderComponent/Component";
import { findItemById } from "@/util";
import eventBus, { EventType } from "@/hooks/useEventBus";

interface borderStyle {
  left?: string;
  top?: string;
  width?: string;
  height?: string;
  display?: string;
}

export default (): {
  borderStyle: Ref<borderStyle>;
  enterContainerBorderStyle: Ref<borderStyle>;
} => {
  const store = useStore();
  const borderStyle = ref<borderStyle>({});
  const enterContainerBorderStyle = ref<borderStyle>({});
  let currentDom: HTMLElement | null = null;

  let enterContainerDom: HTMLElement | null = null;
  const enterContainer = computed(() => {
    return store.state.editor.enterContainer;
  });
  // 监听拖拽进目标容器的变化
  watch(enterContainer, () => {
    // 如果有目标容器
    if (enterContainer.value) {
      // 获取dom
      enterContainerDom = document.getElementById(
        enterContainer.value.id
      ) as HTMLElement;
    } else {
      enterContainerDom = null;
    }
    // 计算目标容器的边框样式
    enterContainerBorderStyle.value = computedEnterContainerBorderStyle();
    // 同时也需要再次计算默认边框的样式
    borderStyle.value = computedBorderStyle();
  });

  const computedEnterContainerBorderStyle = () => {
    const selected = store.state.editor.enterContainer;
    if (selected && enterContainerDom) {
      const { left, top, width, height } =
        enterContainerDom.getBoundingClientRect();
      return {
        left: left + "px",
        top: top + "px",
        width: width + "px",
        height: height + "px",
      };
    }
    return {
      display: "none",
    };
  };

  // 计算border样式
  const computedBorderStyle = () => {
    const selected = store.state.editor.selectedComponents;
    // 如果当前有选中的组件 且找到了dom元素
    // 且当前选中的组件不是正在被拖拽至容器的目标组件 或者 当前无正在拖拽的组件
    if (
      selected &&
      currentDom &&
      ((enterContainer.value && enterContainer.value.id !== selected.id) ||
        !enterContainer.value)
    ) {
      const { left, top, width, height } = currentDom.getBoundingClientRect();
      return {
        left: left + "px",
        top: top + "px",
        width: width + "px",
        height: height + "px",
      };
    }
    return {
      display: "none",
    };
  };

  // 选中组件
  const selectComponentId = computed(() => {
    return store.state.editor.selectedComponents?.id || "";
  });

  // 选中组件尺寸变化
  const selectComponentSize = computed(() => {
    if (store.state.editor.selectedComponents?.id) {
      const { left, right, top, bottom, width, height, margin } = store.state
        .editor.selectedComponents as IComponent;
      return {
        left,
        right,
        top,
        bottom,
        width,
        height,
        margin,
      };
    }
    return {
      left: "",
      right: "",
      top: "",
      bottom: "",
      width: "",
      height: "",
      margin: "",
    };
  });

  // 监听尺寸变化
  watch(
    selectComponentSize,
    async () => {
      await nextTick();
      borderStyle.value = computedBorderStyle();
    },
    { deep: true }
  );

  async function bindScroll(current: string) {
    await nextTick();
    currentDom = document.getElementById(current) as HTMLElement;
    borderStyle.value = computedBorderStyle();
    const parents = findAllParentContainer(
      findItemById(store.getters.currentPage.components, current) as IComponent
    );
    parents.forEach((item) => {
      const dom = (document.getElementById(item) as HTMLElement)
        .firstElementChild as HTMLElement;
      // 已经有滚动事件，不需要再绑定
      if (dom.onscroll) return;
      dom.onscroll = () => {
        borderStyle.value = computedBorderStyle();
      };
    });
    (document.getElementById("canvas") as HTMLElement).onscroll = () => {
      borderStyle.value = computedBorderStyle();
    };
  }

  watch(selectComponentId, (current) => {
    if (current) {
      bindScroll(current);
    }
  });

  const findAllParentContainer = (
    component: IComponent,
    result: string[] = []
  ): string[] => {
    if (component.parentId) {
      result.push(component.parentId);

      return findAllParentContainer(
        findItemById(
          store.getters.currentPage.components,
          component.parentId
        ) as IComponent,
        result
      );
    }
    return result;
  };

  // 监听updateBorder 更新border样式
  eventBus.$on(EventType.updateBorder, async (current?: string) => {
    await nextTick();
    if (current) {
      await bindScroll(current);
    }
    borderStyle.value = computedBorderStyle();
  });
  window.addEventListener("resize", () => {
    borderStyle.value = computedBorderStyle();
  });

  return {
    borderStyle,
    enterContainerBorderStyle,
  };
};
