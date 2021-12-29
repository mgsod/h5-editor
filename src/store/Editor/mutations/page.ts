import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import { addPage, mutationWithSnapshot } from "@/store/Editor/util";
import { MutationTree } from "vuex";
import { IPage, IState } from "@/store/Editor";

const pageMutations: MutationTree<IState> = {
  [MUTATION_TYPE.LOAD]: (state, payload) => {
    state.pages = payload;
  },
  [MUTATION_TYPE.LOAD_BY_CACHE]: (state: IState, payload: IState) => {
    state.pageActive = payload.pageActive;
    state.pages = payload.pages;
    state.selectedComponents = payload.selectedComponents;
    state.allowRedo = payload.allowRedo;
    state.allowUndo = payload.allowUndo;
    state.isDrag = payload.isDrag;
    state.enterContainer = payload.enterContainer;
    state.extractComponents = payload.extractComponents;
  },
  // 新增一页
  [MUTATION_TYPE.ADD_PAGE]: (state) => {
    mutationWithSnapshot(state, () => {
      addPage(state);
    });
  },
  // 选择一页
  [MUTATION_TYPE.SELECT_PAGE]: (state, payload: string) => {
    if (payload === state.pageActive) return;
    state.selectedComponents = null;
    state.pageActive = payload;
  },
  [MUTATION_TYPE.EDIT_PAGE]: (state, payload: IPage) => {
    const editIndex = state.pages.findIndex((item) => item.id === payload.id);
    state.pages[editIndex].name = payload.name;
  },
};
export default pageMutations;
