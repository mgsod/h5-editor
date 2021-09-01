import { Module } from "vuex";
import mutations from "@/store/Editor/mutations";
import Component from "@/components/Editor/RenderComponent/Component";
import { state } from "@/store";

export interface IPage {
  order: number;
  components: Component[];
  id: string;
}
export interface IState {
  pages: IPage[];
  pageActive: string;
  selectedComponents: Component | null;
  allowUndo: boolean;
  allowRedo: boolean;
}

const module: Module<IState, state> = {
  state: {
    pageActive: "",
    pages: [],
    selectedComponents: null,
    allowRedo: false,
    allowUndo: false,
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
