import { ref, reactive, Ref } from "vue";

const contextMens: { id: string; show: Ref<boolean> }[] = [];
document.addEventListener("click", closeHandler);

function closeHandler(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (!target.closest(".contextmenu")) {
    closeContextmenu();
  }
}

function closeContextmenu() {
  contextMens.forEach((item) => {
    item.show.value = false;
  });
}

export default (id = "default") => {
  const showContextmenu = ref(false);
  contextMens.push({
    id,
    show: showContextmenu,
  });
  const position = reactive({
    x: 0,
    y: 0,
  });
  const preventDefault = (e: MouseEvent) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    position.x = clientX;
    position.y = clientY;
    closeContextmenu();
    showContextmenu.value = true;
  };

  return {
    preventDefault,
    showContextmenu,
    position,
    closeContextmenu,
  };
};
