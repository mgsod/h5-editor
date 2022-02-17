import {
  IComponentItem,
  TComponent,
} from "@/components/Editor/BuiltInComponents/types";
import ComponentFactory from "@/components/Editor/BuiltInComponents/Factory";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { IExtractComponents } from "@/store/Editor";

function componentsCopy(
  component: TComponent,
  parentId = "",
  depth = 0
): TComponent {
  component.id = uuidv4();
  if (parentId) {
    component.parentId = parentId;
    component.lock = true;
  }
  if (component.children) {
    component.children.forEach((item) => {
      componentsCopy(item as TComponent, component.id, ++depth);
    });
  } else {
    if (!depth) return component;
  }
  return component;
}

export default () => {
  const store = useStore();
  const dragstart = (
    e: DragEvent,
    item: IComponentItem,
    isExtractCom = false
  ) => {
    const data = isExtractCom
      ? {
          type: "extract",
          name: item.name,
        }
      : { type: item.type };
    (e.dataTransfer as DataTransfer).setData("dragInfo", JSON.stringify(data));
    store.commit(MUTATION_TYPE.DRAG_COMPONENT);
  };
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
    const dragInfo = JSON.parse(
      (e.dataTransfer as DataTransfer).getData("dragInfo")
    );
    const { type, name } = dragInfo;
    if (targetComponent?.isContainer) {
      let component;
      if (type === "extract") {
        component = (
          store.state.editor.extractComponents.find(
            (item) => item.name === name
          ) as IExtractComponents
        ).payload;
        component = componentsCopy(cloneDeep(component));
      } else {
        component = ComponentFactory.createComponent(type);
      }
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
    dragstart,
    dragenter,
    dragleave,
    drop,
    dragover,
  };
};
