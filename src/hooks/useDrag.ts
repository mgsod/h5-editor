import ComponentFactory, { ComponentType } from "@/components/Factory";
const dragEnterClass = "enterContainer";
import { useStore } from "vuex";
import { MUTATION_TYPE } from "@/store/mutations/mutation-type";
import { IComponent } from "@/components/Component";

const addEnterClass = (target: HTMLElement) => {
  target.classList.add(dragEnterClass);
};
const removeEnterClass = (target: HTMLElement) => {
  target.classList.remove(dragEnterClass);
};
export default () => {
  const store = useStore();
  const dragenter = (e: DragEvent) => {
    addEnterClass(<HTMLElement>e.target);
    e.stopPropagation();
  };

  const dragleave = (e: MouseEvent) => {
    removeEnterClass(<HTMLElement>e.target);
    e.stopPropagation();
  };

  const drop = (e: DragEvent, targetComponent: IComponent | undefined) => {
    e.stopPropagation();
    const target = <HTMLElement>e.target;
    removeEnterClass(target);
    const component = ComponentFactory.createComponent(
      ComponentType.Container,
      {
        id: new Date().getTime().toString(),
        width: Number(localStorage.getItem("width") || 200),
        height: Number(localStorage.getItem("height") || 200),
      }
    );
    console.log("new component", component);
    store.commit(MUTATION_TYPE.ADD_COMPONENT, {
      pageId: "1",
      targetComponent: targetComponent,
      component: component,
    });
  };

  const dragover = (e: DragEvent) => {
    e.preventDefault();
  };
  return {
    dragenter,
    dragleave,
    drop,
    dragover,
  };
};
