import { Module } from "vuex";
import mutations from "@/store/Editor/mutations";
import { IComponent } from "@/components/Editor/RenderComponent/Component";
import { state } from "@/store";
import getters from "@/store/Editor/getters";
import { TComponent } from "@/components/Editor/RenderComponent/types";
import eventBus, { EventType } from "@/hooks/useEventBus";

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
  state: {
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
    load: (state: IState, payload) => {
      state.pages = payload;
    },
    loadByCache: (state: IState, payload: IState) => {
      state.pageActive = payload.pageActive;
      state.pages = payload.pages;
      state.selectedComponents = payload.selectedComponents;
      state.allowRedo = payload.allowRedo;
      state.allowUndo = payload.allowUndo;
      state.isDrag = payload.isDrag;
      state.enterContainer = payload.enterContainer;
      state.extractComponents = payload.extractComponents;
      eventBus.$emit(EventType.updateBorder);
    },
  },
  getters: {
    ...getters,
  },
};

export default module;
