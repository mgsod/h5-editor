import { Module } from "vuex";
import mutations from "@/store/Editor/mutations";
import Component, {
  IComponent,
} from "@/components/Editor/RenderComponent/Component";
import { state } from "@/store";
import { getCache } from "@/util";
import { CACHE_KEY, IEditorCache } from "@/store/Editor/util";
import { TComponent } from "@/components/Editor/RenderComponent/types";

export interface IPage {
  order: number;
  components: IComponent[];
  id: string;
  name: string;
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
