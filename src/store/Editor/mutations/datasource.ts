import { MUTATION_TYPE } from '@/store/Editor/mutations/mutation-type';
import { MutationTree } from 'vuex';
import { IState } from '@/store/Editor';

const datasourceMutations: MutationTree<IState> = {
  [MUTATION_TYPE.ADD_DATASOURCE]: (state, { target, data }) => {
    state.datasource[target] = data;
  },
};

export default datasourceMutations;
