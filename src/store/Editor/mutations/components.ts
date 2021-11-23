import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import { TComponent } from "@/components/Editor/RenderComponent/types";
import {
  mutationWithSnapshot,
  updateSelectedComponent,
} from "@/store/Editor/util";
import { IPage, IState } from "@/store/Editor";
import { findItemAndParentById, findItemById } from "@/util";
import { IComponent } from "@/components/Editor/RenderComponent/Component";
import eventBus, { EventType } from "@/hooks/useEventBus";
import { IContainer } from "@/components/Editor/RenderComponent/Container";
import { MutationTree } from "vuex";

const componentMutations: MutationTree<IState> = {
  [MUTATION_TYPE.ADD_COMPONENT]: (
    state: IState,
    {
      targetComponent,
      component,
    }: {
      targetComponent: IContainer | undefined;
      component: TComponent;
    }
  ) => {
    mutationWithSnapshot(state, () => {
      const page = <IPage>(
        state.pages.find((item: IPage) => item.id === state.pageActive)
      );
      if (targetComponent) {
        component.parentId = targetComponent.id;
        targetComponent.children.push(component);
      } else {
        page.components.push(component);
      }
    });
    state.isDrag = false;
  },
  // 拖拽一个组件
  [MUTATION_TYPE.DRAG_COMPONENT]: (state, payload = true) => {
    state.isDrag = payload;
  },
  // 更新组件信息
  [MUTATION_TYPE.UPDATE_COMPONENT]: (state, payload: TComponent) => {
    mutationWithSnapshot(state, () => {
      const currentPage = state.pages.find(
        (item) => item.id === state.pageActive
      ) as IPage;
      const target = findItemById<IComponent>(
        currentPage.components,
        payload.id
      );
      if (target) {
        Object.assign(target, { ...payload });
        updateSelectedComponent(state);
      }
    });
  },
  [MUTATION_TYPE.SELECT_COMPONENT]: (state: IState, payload?: TComponent) => {
    if (payload) {
      if (payload.id === state.selectedComponents?.id) return;
    } else {
      payload = <TComponent>state.selectedComponents;
    }
    if (!payload) return;
    state.selectedComponents = { ...payload };
    eventBus.$emit(EventType.updateBorder, payload.id);
  },
  [MUTATION_TYPE.REMOVE_COMPONENT]: (state) => {
    if (state.selectedComponents) {
      mutationWithSnapshot(state, () => {
        const currentPage = state.pages.find(
          (item) => item.id === state.pageActive
        ) as IPage;
        const target = findItemAndParentById<IComponent>(
          currentPage.components,
          (state.selectedComponents as IComponent).id
        );
        if (target) {
          target.parent.splice(target.index, 1);
        }
        updateSelectedComponent(state);
      });
    }
  },
};
export default componentMutations;
