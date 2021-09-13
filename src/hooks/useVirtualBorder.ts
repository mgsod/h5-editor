import { useStore } from "@/store";
import { computed, nextTick, ref, watch } from "vue";
import { IComponent } from "@/components/Editor/RenderComponent/Component";

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
    nextTick(() => {
      currentDom = document.getElementById(current) as HTMLElement;
      borderStyle.value = computedBorderStyle();
      (document.getElementById("canvas") as HTMLElement).onscroll = () => {
        borderStyle.value = computedBorderStyle();
      };
    });
  });

  return {
    borderStyle,
    borderTransition,
  };
};
