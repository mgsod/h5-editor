import { MUTATION_TYPE } from '@/store/Editor/mutations/mutation-type';
import { MutationTree } from 'vuex';
import { IState } from '@/store/Editor';

const datasourceMutations: MutationTree<IState> = {
  [MUTATION_TYPE.UPDATE_DATASOURCE]: (state, { target, data }) => {
    state.datasource[target] = data;
  },
  [MUTATION_TYPE.DELETE_DATASOURCE]: (state, target) => {
    delete state.datasource[target];
  },
};

export default datasourceMutations;
