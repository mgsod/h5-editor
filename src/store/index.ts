import { createStore, Store, useStore as baseUseStore } from "vuex";
import moduleEditor, { IState } from "./Editor";
import { InjectionKey } from "vue";

export interface state {
  editor: IState;
}
export default createStore<state>({
  strict: true,
  modules: {
    editor: moduleEditor,
  },
  getters: {
    a() {
      return 1;
    },
  },
});
export const key: InjectionKey<Store<state>> = Symbol();
export function useStore() {
  return baseUseStore<state>(key);
}
