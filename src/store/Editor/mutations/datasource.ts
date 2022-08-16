import { MUTATION_TYPE } from '@/store/Editor/mutations/mutation-type';
import { MutationTree } from 'vuex';
import { IState } from '@/store/Editor';

const datasourceMutations: MutationTree<IState> = {
  [MUTATION_TYPE.ADD_DATASOURCE]: (state, datasourceItem: any) => {
    state.datasource.push(datasourceItem);
  },
};

export default datasourceMutations;
