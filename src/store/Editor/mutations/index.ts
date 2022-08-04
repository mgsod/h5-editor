import {
  PartOfComponent,
  TComponent,
} from '@/components/Editor/ComponentTypes';
import { IPage, IState } from '../index';
import { MUTATION_TYPE } from './mutation-type';
import { MutationTree } from 'vuex';
import { findItemById } from '@/util';
import { IComponent } from '@/components/Editor/BuiltInComponents/Component';
import eventBus, { EventType } from '@/hooks/useEventBus';
import {
  addPage,
  mutationWithSnapshot,
  updateSelectedComponent,
  updateRedoUndoState,
  diffPatcher,
} from '@/store/Editor/util';
import componentMutations from './components';
import eventMutations from './event';
import pageMutations from './page';

const mutations: MutationTree<IState> = {
  ...componentMutations,
  ...eventMutations,
  ...pageMutations,
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
    const target = findItemById<PartOfComponent>(
      currentPage.components,
      payload.id
    );
    if (target) {
      Object.assign(target, { ...payload });
      updateSelectedComponent(state);
      eventBus.$emit(EventType.updateBorder);
    }
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
