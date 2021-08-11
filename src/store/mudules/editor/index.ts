import { Module } from "vuex";
import mutations from "@/store/mudules/editor/mutations";
import Component, { IComponent } from "@/components/RenderComponent/Component";
import { state } from "@/store";
import { TComponent } from "@/components/RenderComponent/types";

export interface IPage {
  order: number;
  components: IComponent[];
  id: string;
}
export interface IState {
  pages: IPage[];
  pageActive: string;
  selectedComponents: Partial<TComponent>;
}

const module: Module<IState, state> = {
  state: {
    pageActive: "",
    pages: [],
    selectedComponents: {},
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
