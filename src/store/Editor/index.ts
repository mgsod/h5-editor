import { Module } from "vuex";
import mutations, { CACHE_KEY, IEditorCache } from "@/store/Editor/mutations";
import { IComponent } from "@/components/Editor/RenderComponent/Component";
import { state } from "@/store";
import { getCache } from "@/util";

export interface IPage {
  order: number;
  components: IComponent[];
  id: string;
}
export interface IState {
  pages: IPage[];
  pageActive: string;
  selectedComponents: IComponent | null;
  allowUndo: boolean;
  allowRedo: boolean;
  isDrag: boolean;
}

const module: Module<IState, state> = {
  state: getCache<IEditorCache>(CACHE_KEY)?.editorData || {
    pageActive: "",
    pages: [],
    selectedComponents: null,
    allowRedo: false,
    allowUndo: false,
    isDrag: false,
  },
  mutations: {
    ...mutations,
  },
  getters: {
    currentPage: (state) => {
      return state.pages.find((item) => item.id === state.pageActive) || [];
    },
  },
};

export default module;
