import { ref, reactive, Ref } from "vue";

const contextMens: Ref<boolean>[] = [];
export default () => {
  const showContextmenu = ref(false);
  contextMens.push(showContextmenu);
  const position = reactive({
    x: 0,
    y: 0,
  });
  const preventDefault = (e: MouseEvent) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    position.x = clientX;
    position.y = clientY;
    showContextmenu.value = true;
  };
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".contextmenu")) {
      closeContextmenu();
    }
  });
  const closeContextmenu = () => {
    contextMens.forEach((item) => {
      item.value = false;
    });
  };
  return {
    preventDefault,
    showContextmenu,
    position,
    closeContextmenu,
  };
};
