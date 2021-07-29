import { Module } from "vuex";
import mutations from "@/store/mudules/editor/mutations";
import Component from "@/components/RenderComponent/Component";
import { state } from "@/store";

export interface IPage {
  order: number;
  components: Component[];
  id: string;
}
export interface IState {
  pages: IPage[];
  pageActive: string;
}

const module: Module<IState, state> = {
  state: {
    pageActive: "",
    pages: [],
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
