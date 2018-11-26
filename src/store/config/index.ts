// profile/index.ts
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';

import {ROOT_ACTIONS, ROOT_MUTATIONS, RootState} from '@/store';
import {DevBasicUser, Instance, InstanceConfig, Permission} from '@/types';

export interface ConfigState {
  selected_instance: Instance | null;
  live_instance_config: InstanceConfig | null;
}

export const empty_state: ConfigState = {
  selected_instance: null,
  live_instance_config: null,
};

export const CONFIG_MUTATIONS = {
  SET_SELECTED_INSTANCE: 'SET_SELECTED_INSTANCE',
  RESET_SELECTED_INSTANCE: 'RESET_SELECTED_INSTANCE',
  SET_SELECTED_CONFIG: 'SET_SELECTED_CONFIG',
  RESET_SELECTED_CONFIG: 'RESET_SELECTED_CONFIG',
};

const mutations: MutationTree<ConfigState> = {
  [CONFIG_MUTATIONS.SET_SELECTED_INSTANCE](state, selected_instance: Instance) {
    return state.selected_instance = selected_instance;
  },
  [CONFIG_MUTATIONS.RESET_SELECTED_INSTANCE](state) { state.selected_instance = null; },
  [CONFIG_MUTATIONS.SET_SELECTED_CONFIG](state, instance_config: InstanceConfig) {
    state.live_instance_config = instance_config;
  },
  [CONFIG_MUTATIONS.RESET_SELECTED_CONFIG](state) {state.live_instance_config = null; },
};

export const CONFIG_ACTIONS = {
  RESET_SELECTED_INSTANCE_AND_CONFIG: 'RESET_SELECTED_CONFIG',
};

const actions: ActionTree<ConfigState, RootState> = {
  [CONFIG_ACTIONS.RESET_SELECTED_INSTANCE_AND_CONFIG](context) {
    context.commit(CONFIG_MUTATIONS.RESET_SELECTED_INSTANCE);
    context.commit(CONFIG_MUTATIONS.RESET_SELECTED_CONFIG);
  },
};

export const CONFIG_GETTERS = {

};

const getters: GetterTree<ConfigState, RootState> = {};

export const config_module: Module<ConfigState, RootState> = {
  namespaced: false,
  state: empty_state,
  getters,
  actions,
  mutations,
};
