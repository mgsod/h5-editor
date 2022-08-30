import { Module } from 'vuex';
import mutations from '@/store/Editor/mutations';
import { state } from '@/store';
import getters from '@/store/Editor/getters';
import {
  PartOfComponent,
  TComponent,
} from '@/components/Editor/ComponentTypes';
import { IDataSources } from '@/components/Editor/Action/request';

export interface IPage {
  order: number;
  components: PartOfComponent[];
  id: string;
  name: string;
}

export interface IExtractComponents {
  name: string;
  payload: TComponent;
}

export interface IState {
  pages: IPage[];
  pageActive: string;
  selectedComponents: PartOfComponent | null;
  allowUndo: boolean;
  allowRedo: boolean;
  isDrag: boolean;
  enterContainer: PartOfComponent | null;
  extractComponents: IExtractComponents[];
  datasource: IDataSources;
}

const module: Module<IState, state> = {
  state: {
    pageActive: '',
    pages: [],
    selectedComponents: null,
    allowRedo: false,
    allowUndo: false,
    isDrag: false,
    enterContainer: null,
    extractComponents: [],
    datasource: {},
  },
  mutations: {
    ...mutations,
  },
  getters: {
    ...getters,
  },
};

export default module;
