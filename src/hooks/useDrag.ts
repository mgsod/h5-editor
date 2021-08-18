import { ComponentType, TComponent } from "@/components/RenderComponent/types";
import ComponentFactory from "@/components/RenderComponent/Factory";
const dragEnterClass = "enterContainer";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/mudules/editor/mutation-type";
const addEnterClass = (target: HTMLElement) => {
  target.classList.add(dragEnterClass);
};
const removeEnterClass = (target: HTMLElement) => {
  target.classList.remove(dragEnterClass);
};
export default () => {
  const store = useStore();
  const dragenter = (e: DragEvent, targetComponent?: TComponent) => {
    if (targetComponent?.isContainer) {
      addEnterClass(<HTMLElement>e.target);
      e.stopPropagation();
    }
  };

  const dragleave = (e: MouseEvent, targetComponent?: TComponent) => {
    if (targetComponent?.isContainer) {
      removeEnterClass(<HTMLElement>e.target);
      e.stopPropagation();
    }
  };

  const drop = (e: DragEvent, targetComponent?: TComponent) => {
    e.stopPropagation();
    const target = <HTMLElement>e.target;
    removeEnterClass(target);
    const type = <ComponentType>e.dataTransfer!.getData("type");
    const component = ComponentFactory.createComponent(type);
    if (targetComponent?.isContainer) {
      store.commit(`${MUTATION_TYPE.ADD_COMPONENT}`, {
        targetComponent: targetComponent,
        component: component,
      });
    }
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
