import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

import { RootState } from '@/store';
import { standard_handler } from '@/lib/handler';
import { AxiosResponse } from 'axios';

export interface GeodataState {
  geodata_summaries: any[];
}

export const empty_state: GeodataState = {
  geodata_summaries: [],
};

export const GEODATA_MUTATIONS = {
  SET_GEODATA_SUMMARIES: 'SET_GEODATA_SUMMARIES',
};

const mutations: MutationTree<GeodataState> = {
  [GEODATA_MUTATIONS.SET_GEODATA_SUMMARIES](state, summaries) {
    state.geodata_summaries = summaries;
  },
};

export const GEODATA_ACTIONS = {
  FETCH_GEODATA_SUMMARIES: 'FETCH_GEODATA_SUMMARIES',
};

const actions: ActionTree<GeodataState, RootState> = {
  async [GEODATA_ACTIONS.FETCH_GEODATA_SUMMARIES](context) {
    const options = {
      method: 'get',
      url: '/geodata_summary',
    } as any;
    try {
      const result: AxiosResponse = await standard_handler(options);
      context.commit('');
    } catch (e) {
      throw e;
    }
  },
};

export const GEODATA_GETTERS = {
};


const getters: GetterTree<GeodataState, RootState> = {};

export const geodata_module: Module<GeodataState, RootState> = {
  namespaced: false,
  state: empty_state,
  getters,
  actions,
  mutations,
};
