import { Module } from "vuex";
import mutations from "@/store/Editor/mutations";
import { IComponent } from "@/components/Editor/RenderComponent/Component";
import { state } from "@/store";
import { getCache } from "@/util";
import { CACHE_KEY, IEditorCache } from "@/store/Editor/util";
import getters from "@/store/Editor/getters";
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
  enterContainer: IComponent | null;
  extractComponents: { name: string; payload: TComponent }[];
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
    extractComponents: [],
  },
  mutations: {
    ...mutations,
  },
  getters: {
    ...getters,
  },
};

export default module;
