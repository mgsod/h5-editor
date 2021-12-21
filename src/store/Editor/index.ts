import { Module } from "vuex";
import mutations from "@/store/Editor/mutations";
import { IComponent } from "@/components/Editor/RenderComponent/Component";
import { state } from "@/store";
import { getCache } from "@/util";
import { CACHE_KEY, IEditorCache } from "@/store/Editor/util";
import getters from "@/store/Editor/getters";

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
  enterContainer: IComponent | null;
}

const module: Module<IState, state> = {
  state: getCache<IEditorCache>(CACHE_KEY)?.editorData || {
    pageActive: "",
    pages: [],
    selectedComponents: null,
    allowRedo: false,
    allowUndo: false,
    isDrag: false,
    enterContainer: null,
  },
  mutations: {
    ...mutations,
  },
  getters: {
    ...getters,
  },
};

export default module;
