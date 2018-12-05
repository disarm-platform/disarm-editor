import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { AxiosResponse } from 'axios';
import {get} from 'lodash';

import { RootState } from '@/store';
import {Instance, InstanceConfig} from '@/types';
import { standard_handler } from '@/lib/handler';
import {USERS_ACTIONS} from '@/store/users';

export interface ConfigState {
  selected_instance: Instance | null;
  live_instance_config: InstanceConfig | null;
  instance_list: Instance[];
  unsaved_config_changes: boolean;
  unsaved_permission_changes: boolean;
}

export const empty_state: ConfigState = {
  selected_instance: null,
  live_instance_config: null,
  instance_list: [],
  unsaved_config_changes: false,
  unsaved_permission_changes: false,
};

export const CONFIG_MUTATIONS = {
  SET_INSTANCE_LIST: 'SET_INSTANCE_LIST',
  SET_SELECTED_INSTANCE: 'SET_SELECTED_INSTANCE',
  RESET_SELECTED_INSTANCE: 'RESET_SELECTED_INSTANCE',
  SET_SELECTED_CONFIG: 'SET_SELECTED_CONFIG',
  UPDATE_CONFIG_WITH_UNSAVED: 'UPDATE_CONFIG_WITH_UNSAVED',
  RESET_SELECTED_CONFIG: 'RESET_SELECTED_CONFIG',
};

const mutations: MutationTree<ConfigState> = {
  [CONFIG_MUTATIONS.SET_INSTANCE_LIST](state, instance_list: Instance[]) {
    state.instance_list = instance_list;
  },
  [CONFIG_MUTATIONS.SET_SELECTED_INSTANCE](state, selected_instance: Instance) {
    state.selected_instance = selected_instance;
  },
  [CONFIG_MUTATIONS.RESET_SELECTED_INSTANCE](state) {
    state.selected_instance = null;
  },
  [CONFIG_MUTATIONS.SET_SELECTED_CONFIG](state, instance_config: InstanceConfig) {
    state.live_instance_config = instance_config;
    state.unsaved_config_changes = false;
  },
  [CONFIG_MUTATIONS.UPDATE_CONFIG_WITH_UNSAVED](state, instance_config: InstanceConfig) {
    state.live_instance_config = instance_config;
    state.unsaved_config_changes = true;
  },
  [CONFIG_MUTATIONS.RESET_SELECTED_CONFIG](state) {
    state.live_instance_config = null;
    state.unsaved_config_changes = false;
  },
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
      context.commit(CONFIG_MUTATIONS.SET_INSTANCE_LIST, result.data);
    } catch (e) {
      throw e;
    }
  },
  async [CONFIG_ACTIONS.SELECT_INSTANCE](context, instance) {
    context.commit(CONFIG_MUTATIONS.SET_SELECTED_INSTANCE, instance);
    await context.dispatch(CONFIG_ACTIONS.FETCH_LATEST_INSTANCE_CONFIG);
    await context.dispatch(USERS_ACTIONS.FETCH_USERS);
    await context.dispatch(USERS_ACTIONS.FETCH_PERMISSIONS);
  },
  async [CONFIG_ACTIONS.FETCH_LATEST_INSTANCE_CONFIG](context) {
    const options = {
      method: 'get',
      url: '/config/latest',
    } as any;
    try {
      const result: AxiosResponse = await standard_handler(options);
      if (!result.data) {
        // TODO: Do elsewhere in a support library?
        context.commit(CONFIG_MUTATIONS.SET_SELECTED_CONFIG, {
          instance_id: get(context, 'state.selected_instance._id', null),
        });
      } else {
        context.commit(CONFIG_MUTATIONS.SET_SELECTED_CONFIG, result.data);
      }
    } catch (e) {
      throw e;
    }
  },
  async [CONFIG_ACTIONS.UPDATE_INSTANCE_CONFIG](context, {instance_config}) {
    const options = {
      method: 'put',
      url: '/config/update',
      data: instance_config,
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
