import { ComponentType } from "@/components/RenderComponent/types";
import ComponentFactory from "@/components/RenderComponent/Factory";
const dragEnterClass = "enterContainer";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/mudules/editor/mutation-type";
import { IComponent } from "@/components/RenderComponent/Component";

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
    const component = ComponentFactory.createComponent(ComponentType.Container);
    store.commit(`${MUTATION_TYPE.ADD_COMPONENT}`, {
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
