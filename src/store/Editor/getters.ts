import { GetterTree } from "vuex";
import { IState } from "@/store/editor/index";

const getters: GetterTree<IState, any> = {
  currentPage: (state) => {
    return state.pages.find((item) => item.id === state.pageActive);
  },
};

export default getters;
