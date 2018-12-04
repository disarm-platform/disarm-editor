import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

import { ROOT_ACTIONS, ROOT_MUTATIONS, RootState } from '@/store';
import {DevBasicUser, EditableInstanceConfig, Instance, InstanceConfig, Permission} from '@/types';
import { standard_handler } from '@/lib/handler';
import { AxiosRequestConfig, AxiosResponse } from '../../../node_modules/axios';
import {USERS_ACTIONS, USERS_MUTATIONS} from '../users';
import {sample_config, sample_permissions, sample_users} from '@/pages/seedData';

export interface ConfigState {
  selected_instance: Instance | null;
  live_instance_config: EditableInstanceConfig | null;
}

export const empty_state: ConfigState = {
  selected_instance: null,
  live_instance_config: null,
};

export const CONFIG_MUTATIONS = {
  SET_SELECTED_INSTANCE: 'SET_SELECTED_INSTANCE',
  RESET_SELECTED_INSTANCE: 'RESET_SELECTED_INSTANCE',
  SET_SELECTED_CONFIG: 'SET_SELECTED_CONFIG',
  UPDATE_CONFIG_WITH_UNSAVED: 'UPDATE_CONFIG_WITH_UNSAVED',
  RESET_SELECTED_CONFIG: 'RESET_SELECTED_CONFIG',
};

const mutations: MutationTree<ConfigState> = {
  [CONFIG_MUTATIONS.SET_SELECTED_INSTANCE](state, selected_instance: Instance) {
    return state.selected_instance = selected_instance;
  },
  [CONFIG_MUTATIONS.RESET_SELECTED_INSTANCE](state) { state.selected_instance = null; },
  [CONFIG_MUTATIONS.SET_SELECTED_CONFIG](state, instance_config: InstanceConfig) {
    if (instance_config) { (instance_config as EditableInstanceConfig).unsaved_changes = false; }
    state.live_instance_config = instance_config as EditableInstanceConfig;
  },
  [CONFIG_MUTATIONS.UPDATE_CONFIG_WITH_UNSAVED](state, instance_config: EditableInstanceConfig) {
    if (instance_config) { instance_config.unsaved_changes = true; }
    state.live_instance_config = instance_config;
  },
  [CONFIG_MUTATIONS.RESET_SELECTED_CONFIG](state) { state.live_instance_config = null; },
};

export const CONFIG_ACTIONS = {
  CREATE_INSTANCE: 'CREATE_INSTANCE',
  FETCH_INSTANCES: 'FETCH_INSTANCES',
  SELECT_INSTANCE: 'SELECT_INSTANCE',
  FETCH_LATEST_INSTANCE_CONFIG: 'FETCH_LATEST_INSTANCE_CONFIG',
  UPDATE_INSTANCE_CONFIG: 'UPDATE_INSTANCE_CONFIG',
  RESET_SELECTED_INSTANCE_AND_CONFIG: 'RESET_SELECTED_CONFIG',
};

const actions: ActionTree<ConfigState, RootState> = {
  async [CONFIG_ACTIONS.CREATE_INSTANCE](context, instance: Instance) {
    const options = {
      url: '/instance',
      method: 'post',
      data: instance,
    };

    try {
      const result: AxiosResponse = await standard_handler(options as any);
      await context.dispatch(CONFIG_ACTIONS.FETCH_INSTANCES);
    } catch (e) {
      throw e;
    }
  },
  async [CONFIG_ACTIONS.FETCH_INSTANCES](context) {
    const options = {
      url: '/instance',
      method: 'get',
    };

    try {
      const result: AxiosResponse = await standard_handler(options as any);
      return result.data;
    } catch (e) {
      throw e;
    }
  },
  async [CONFIG_ACTIONS.SELECT_INSTANCE](context, instance) {
    context.commit(CONFIG_MUTATIONS.SET_SELECTED_INSTANCE, instance);
    context.commit(CONFIG_MUTATIONS.SET_SELECTED_CONFIG, sample_config);
    context.commit(USERS_MUTATIONS.SET_USERS, sample_users);
    context.commit(USERS_MUTATIONS.SET_PERMISSIONS, sample_permissions);
    return;

    await context.dispatch(CONFIG_ACTIONS.FETCH_LATEST_INSTANCE_CONFIG, {instance_id: instance._id});
    await context.dispatch(USERS_ACTIONS.FETCH_USERS, {instance_id: instance._id});
    await context.dispatch(USERS_ACTIONS.FETCH_PERMISSIONS, {instance_id: instance._id});
  },
  async [CONFIG_ACTIONS.FETCH_LATEST_INSTANCE_CONFIG](context, {instance_id}) {
    const options = {
      method: 'get',
      url: '/config/latest',
      params: {
        instance_id,
      },
    } as any;
    try {
      const result: AxiosResponse = await standard_handler(options);
      context.commit(CONFIG_MUTATIONS.SET_SELECTED_CONFIG, result.data);
    } catch (e) {
      throw e;
    }
  },
  async [CONFIG_ACTIONS.UPDATE_INSTANCE_CONFIG](context, {instance_id, instance_config}) {
    const options = {
      method: 'put',
      url: '/config/update',
      data: instance_config,
      params: {
        instance_id,
      },
    } as any;
    try {
      const result: AxiosResponse = await standard_handler(options);
    } catch (e) {
      throw e;
    }
  },
  async [CONFIG_ACTIONS.RESET_SELECTED_INSTANCE_AND_CONFIG](context) {
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
