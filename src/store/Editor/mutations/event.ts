import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import { IEvent } from "@/components/Editor/event";
import {
  mutationWithSnapshot,
  updateSelectedComponent,
} from "@/store/Editor/util";
import { IPage, IState } from "@/store/Editor";
import { findItemById } from "@/util";
import { IComponent } from "@/components/Editor/RenderComponent/Component";
import { MutationTree } from "vuex";

const eventMutations: MutationTree<IState> = {
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
};
export default eventMutations;
