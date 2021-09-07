import {
  ComponentType,
  TComponent,
} from "@/components/Editor/RenderComponent/types";
import ComponentFactory from "@/components/Editor/RenderComponent/Factory";
const dragEnterClass = "enterContainer";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutation-type";
const addEnterClass = (target: HTMLElement) => {
  target.classList.add(dragEnterClass);
};
const removeEnterClass = (target: HTMLElement) => {
  target.classList.remove(dragEnterClass);
};
export default () => {
  const store = useStore();
  const dragenter = (e: DragEvent, targetComponent?: TComponent) => {
    e.stopPropagation();
    if (targetComponent?.isContainer) {
      addEnterClass(<HTMLElement>(<HTMLElement>e.target).parentNode);
    }
  };

  const dragleave = (e: MouseEvent, targetComponent?: TComponent) => {
    e.stopPropagation();
    if (targetComponent?.isContainer) {
      removeEnterClass(<HTMLElement>(<HTMLElement>e.target).parentNode);
    }
  };

  const drop = (e: DragEvent, targetComponent?: TComponent) => {
    e.stopPropagation();
    const target = <HTMLElement>e.target;
    removeEnterClass(<HTMLElement>target.parentNode);
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
