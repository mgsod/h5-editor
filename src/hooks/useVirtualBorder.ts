import { useStore } from "@/store";
import { computed, nextTick, ref, watch } from "vue";
import { IComponent } from "@/components/Editor/RenderComponent/Component";
import { findItemById } from "@/util";

export default () => {
  const store = useStore();
  const borderStyle = ref({});
  const borderTransition = ref(false);
  let currentDom: HTMLElement | null = null;
  // 计算border样式
  const computedBorderStyle = () => {
    const selected = store.state.editor.selectedComponents;
    if (selected && currentDom) {
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
  // 选中组件
  const selectComponentId = computed(() => {
    return store.state.editor.selectedComponents?.id || "";
  });

  // 选中组件尺寸变化
  const selectComponentSize = computed(() => {
    if (selectComponentId.value) {
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
    () => {
      nextTick(() => {
        borderStyle.value = computedBorderStyle();
      });
    },
    { deep: true }
  );

  window.addEventListener("resize", () => {
    borderTransition.value = false;
    borderStyle.value = computedBorderStyle();
  });
  // 选中组件变化
  watch(selectComponentId, (current, old) => {
    if (old) {
      borderTransition.value = true;
    }
    if (current) {
      nextTick(() => {
        currentDom = document.getElementById(current) as HTMLElement;
        borderStyle.value = computedBorderStyle();
        const parents = findAllParentContainer(
          findItemById(
            store.getters.currentPage.components,
            current
          ) as IComponent
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
      });
    }
  });

  return {
    borderStyle,
    borderTransition,
  };
};
