import { ref } from "vue";

export default () => {
  const startX = ref(0);
  const startY = ref(0);
  const offsetX = ref(0);
  const offsetY = ref(0);
  const resize = ref(false);
  const mouseDown = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    startX.value = clientX;
    startY.value = clientY;
    resize.value = true;

    document.body.addEventListener("mousemove", mouseMove);
    document.body.addEventListener("mouseup", mouseUp);
  };
  const mouseMove = (event: MouseEvent) => {
    if (!resize.value) return;
    const { clientX, clientY } = event;
    offsetX.value = clientX - startX.value;
    offsetY.value = clientY - startY.value;
  };
  const mouseUp = () => {
    resize.value = false;
    document.body.removeEventListener("mousemove", mouseMove);
    document.body.removeEventListener("mouseup", mouseUp);
  };

  return {
    mouseDown,
    mouseMove,
    mouseUp,
    offsetY,
    offsetX,
  };
};
