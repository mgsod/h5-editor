import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import { IEvent } from "@/components/Editor/event";
import {
  mutationWithSnapshot,
  updateSelectedComponent,
} from "@/store/Editor/util";
import { IPage, IState } from "@/store/Editor";
import { findItemById } from "@/util";
import { IComponent } from "@/components/Editor/BuiltInComponents/Component";
import { MutationTree } from "vuex";
import {
  PartOfComponent,
  TComponent,
} from "@/components/Editor/BuiltInComponents/types";

const eventMutations: MutationTree<IState> = {
  // 添加一个事件
  [MUTATION_TYPE.ADD_EVENT]: (state, event: IEvent) => {
    mutationWithSnapshot(state, () => {
      const currentPage = state.pages.find(
        (item) => item.id === state.pageActive
      ) as IPage;
      const target = findItemById<PartOfComponent>(
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
  // 移除事件
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
      updateSelectedComponent(state);
    });
  },
  // 更新事件
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
      updateSelectedComponent(state);
    });
  },
};
export default eventMutations;
