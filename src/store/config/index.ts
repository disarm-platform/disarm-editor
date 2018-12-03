// profile/index.ts
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

import { ROOT_ACTIONS, ROOT_MUTATIONS, RootState } from '@/store';
import { DevBasicUser, Instance, InstanceConfig, Permission } from '@/types';
import { standard_handler } from '@/lib/handler'
import { AxiosRequestConfig, AxiosResponse } from '../../../node_modules/axios';

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
  [CONFIG_MUTATIONS.RESET_SELECTED_CONFIG](state) { state.live_instance_config = null; },
};

export const CONFIG_ACTIONS = {
  RESET_SELECTED_INSTANCE_AND_CONFIG: 'RESET_SELECTED_CONFIG',
  FETCH_INSTANCES: 'FETCH_INSTANCES',
  FETCH_INSTANCE_CONFIGS: 'FETCH_INSTANCE_CONFIGS',
  FETCH_INSTANCE_CONFIG:'FETCH_INSTANCE_CONFIG',
  CREATE_INSTANCE: 'CREATE_INSTANCE',
};

const actions: ActionTree<ConfigState, RootState> = {
  [CONFIG_ACTIONS.RESET_SELECTED_INSTANCE_AND_CONFIG](context) {
    context.commit(CONFIG_MUTATIONS.RESET_SELECTED_INSTANCE);
    context.commit(CONFIG_MUTATIONS.RESET_SELECTED_CONFIG);
  },
  async [CONFIG_ACTIONS.CREATE_INSTANCE](context, instance: Instance) {
    const options = {
      url: '/instance',
      method: 'post',
      data: instance
    }

    try {
      const result: AxiosResponse = await standard_handler(options as any)
      //context.commit(CONFIG_MUTATIONS.SET_SELECTED_INSTANCE, result.data)
    } catch (e) {
      throw e
    }
  },
  async [CONFIG_ACTIONS.FETCH_INSTANCE_CONFIGS](context, instance_id: string) {
    try{
      const result: AxiosResponse = await standard_handler({
        url:`/instance/${instance_id}/published_instanceconfigs`,
        method:'get'
      } as any)
      return result.data;
    }catch(e){
      throw e;
    }
 

  },
  async [CONFIG_ACTIONS.FETCH_INSTANCES](context) {
    const options = {
      url: '/instance',
      method: 'get'
    }

    try {
      const result: AxiosResponse = await standard_handler(options as any)
      return result.data;
    } catch (e) {
      throw e
    }
  },
  async [CONFIG_ACTIONS.CREATE_INSTANCE](context,payload){
    const options = {
      url: '/instance',
      method: 'post',
      data:payload
    }

    try{
      const result: AxiosResponse = await standard_handler(options as any);
      return result.data
    }catch(e){
      throw e
    }
  },
  async [CONFIG_ACTIONS.FETCH_INSTANCE_CONFIG](context,payload){
    try{
      const result = await standard_handler({
        url:`config/${payload}`,
        method:'get'
      } as any)
      return result.data;
    }catch(e){
      throw e
    }
  }
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
