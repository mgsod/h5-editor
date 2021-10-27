import { TComponent } from "@/components/Editor/RenderComponent/types";
import { IPage, IState } from "./index";
import { MUTATION_TYPE } from "./mutation-type";
import { MutationTree } from "vuex";
import { IContainer } from "@/components/Editor/RenderComponent/Container";
import { findItemAndParentById, findItemById } from "@/util";
import { IComponent } from "@/components/Editor/RenderComponent/Component";
import { IEvent } from "@/components/Editor/event";
import eventBus, { EventType } from "@/hooks/useEventBus";
import {
  addPage,
  mutationWithSnapshot,
  updateSelectedComponent,
  updateRedoUndoState,
  diffPatcher,
} from "@/store/Editor/util";

const mutations: MutationTree<IState> = {
  // 添加一个组件
  [MUTATION_TYPE.ADD_COMPONENT]: (
    state,
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
  // 撤销
  [MUTATION_TYPE.UNDO]: (state) => {
    const result = diffPatcher.undo();
    if (result) {
      state.pages = result;
      updateSelectedComponent(state);
      updateRedoUndoState(state);
    }
  },
  // 重做
  [MUTATION_TYPE.REDO]: (state) => {
    const result = diffPatcher.redo();
    if (result) {
      state.pages = result;
      updateSelectedComponent(state);
      updateRedoUndoState(state);
    }
  },
  // 新增一页
  [MUTATION_TYPE.ADD_PAGE]: (state) => {
    mutationWithSnapshot(state, () => {
      addPage(state);
    });
  },
  [MUTATION_TYPE.SELECT_PAGE]: (state, payload: string) => {
    if (payload === state.pageActive) return;
    state.selectedComponents = null;
    state.pageActive = payload;
  },
  // 初始化
  [MUTATION_TYPE.INIT]: (state: IState) => {
    // 如果已经存在，不需要在初始化
    if (state.pages.length > 0) return;
    state.pages = [];
    addPage(state);
  },
  [MUTATION_TYPE.RESIZE]: (state: IState, payload: TComponent) => {
    const currentPage = state.pages.find(
      (item) => item.id === state.pageActive
    ) as IPage;
    const target = findItemById<IComponent>(currentPage.components, payload.id);
    if (target) {
      Object.assign(target, { ...payload });
      updateSelectedComponent(state);
      eventBus.$emit(EventType.updateBorder);
    }
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
  [MUTATION_TYPE.ADD_EVENT]: (state, event: IEvent) => {
    mutationWithSnapshot(state, () => {
      const currentPage = state.pages.find(
        (item) => item.id === state.pageActive
      ) as IPage;
      const target = findItemById<IComponent>(
        currentPage.components,
        (state.selectedComponents as IComponent).id
      );
      if (target) {
        const events = target.events || [];
        events.push(event);
        target.events = events;
        updateSelectedComponent(state);
      }
    });
  },
  [MUTATION_TYPE.REMOVE_EVENT]: (state, eventIndex: number) => {
    mutationWithSnapshot(state, () => {
      const currentPage = state.pages.find(
        (item) => item.id === state.pageActive
      ) as IPage;
      const target = findItemById<IComponent>(
        currentPage.components,
        (state.selectedComponents as IComponent).id
      );
      if (target) {
        const events = target.events;
        events?.splice(eventIndex, 1);
      }
    });
  },
  [MUTATION_TYPE.UPDATE_EVENT]: (state, { eventIndex, event }) => {
    mutationWithSnapshot(state, () => {
      const currentPage = state.pages.find(
        (item) => item.id === state.pageActive
      ) as IPage;
      const target = findItemById<IComponent>(
        currentPage.components,
        (state.selectedComponents as IComponent).id
      );
      if (target) {
        const events = target.events as IEvent[];
        events[eventIndex] = { ...event };
      }
    });
  },
  [MUTATION_TYPE.DRAG_TREE]: (state, payload: IComponent[]) => {
    mutationWithSnapshot(state, () => {
      const currentPage = state.pages.find(
        (item) => item.id === state.pageActive
      );
      (currentPage as IPage).components = payload;
    });
    eventBus.$emit(EventType.updateBorder);
  },
};
export default mutations;
