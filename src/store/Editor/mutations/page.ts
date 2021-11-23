import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import { addPage, mutationWithSnapshot } from "@/store/Editor/util";
import { MutationTree } from "vuex";
import { IState } from "@/store/Editor";

const pageMutations: MutationTree<IState> = {
  // 新增一页
  [MUTATION_TYPE.ADD_PAGE]: (state) => {
    mutationWithSnapshot(state, () => {
      addPage(state);
    });
  },
  [MUTATION_TYPE.SELECT_PAGE]: (state, payload: string) => {
    if (payload === state.pageActive) return;
    state.selectedComponents = null;
    state.pageActive = payload;
  },
};
export default pageMutations;
