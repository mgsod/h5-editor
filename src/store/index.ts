import { createStore, Store, useStore as baseUseStore } from 'vuex';
import moduleEditor, { IState } from './Editor';
import { InjectionKey } from 'vue';
import { MUTATION_TYPE } from '@/store/Editor/mutations/mutation-type';
import { CACHE_KEY, diffPatcher } from '@/store/Editor/util';

export interface state {
  editor: IState;
}

export default createStore<state>({
  strict: true,
  modules: {
    editor: moduleEditor,
  },
  getters: {},
  plugins: [
    (store) => {
      const needCacheMutations = [
        MUTATION_TYPE.ADD_PAGE,
        MUTATION_TYPE.ADD_EVENT,
        MUTATION_TYPE.REMOVE_EVENT,
        MUTATION_TYPE.UPDATE_EVENT,
        MUTATION_TYPE.UPDATE_COMPONENT,
        MUTATION_TYPE.REMOVE_COMPONENT,
        MUTATION_TYPE.REDO,
        MUTATION_TYPE.UNDO,
        MUTATION_TYPE.RESIZE,
        MUTATION_TYPE.DRAG_TREE,
        MUTATION_TYPE.ADD_COMPONENT,
        MUTATION_TYPE.DRAG_COMPONENT,
        MUTATION_TYPE.SELECT_COMPONENT,
        MUTATION_TYPE.EDIT_PAGE,
        MUTATION_TYPE.DELETE_PAGE,
        MUTATION_TYPE.COPY_PAGE,
        MUTATION_TYPE.DELETE_EXTRACT_COMPONENT,
        MUTATION_TYPE.UPDATE_DATASOURCE,
        MUTATION_TYPE.DELETE_DATASOURCE,
      ];
      store.subscribe((mutation, state) => {
        if (needCacheMutations.includes(mutation.type as MUTATION_TYPE)) {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              editorData: state.editor,
              diffPatcher,
            })
          );
        }
      });
    },
  ],
});
export const key: InjectionKey<Store<state>> = Symbol();

export function useStore() {
  return baseUseStore<state>(key);
}
