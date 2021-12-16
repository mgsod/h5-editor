import {
  ComponentType,
  TComponent,
} from "@/components/Editor/RenderComponent/types";
import ComponentFactory from "@/components/Editor/RenderComponent/Factory";

import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";

export default () => {
  const store = useStore();
  const dragenter = (e: DragEvent, targetComponent?: TComponent) => {
    e.stopPropagation();
    if (targetComponent?.isContainer) {
      store.commit(MUTATION_TYPE.ENTER_CONTAINER, targetComponent);
    }
  };

  const dragleave = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const drop = (e: DragEvent, targetComponent?: TComponent) => {
    e.stopPropagation();
    const type = <ComponentType>(
      (e.dataTransfer as DataTransfer).getData("type")
    );
    const component = ComponentFactory.createComponent(type);
    if (targetComponent?.isContainer) {
      store.commit(`${MUTATION_TYPE.ADD_COMPONENT}`, {
        targetComponent: targetComponent,
        component: component,
      });
      store.commit(MUTATION_TYPE.SELECT_COMPONENT, component);
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
