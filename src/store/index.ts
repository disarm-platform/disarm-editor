import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import {set_api_key} from '@/lib/handler';
import {login} from '@/lib/meta_controller';
import {DevBasicUser, Instance, InstanceConfig} from '@/types';
import {users_module} from '@/store/users';

Vue.use(Vuex);

export interface LoggedInUser {
  username: string;
  api_key: string;
}

export interface RootState {
  logged_in_user: LoggedInUser | null;
  selected_instance: Instance | null;
  live_instance_config: InstanceConfig | null;
}

export const ROOT_MUTATIONS = {
  SET_USER: 'SET_USER',
  RESET_USER: 'RESET_USER',
  SET_SELECTED_INSTANCE: 'SET_SELECTED_INSTANCE',
  RESET_SELECTED_INSTANCE: 'RESET_SELECTED_INSTANCE',
  SET_SELECTED_CONFIG: 'SET_SELECTED_CONFIG',
  RESET_SELECTED_CONFIG: 'RESET_SELECTED_CONFIG',
};

export const ROOT_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  RESET_SELECTED_INSTANCE_AND_CONFIG: 'RESET_SELECTED_CONFIG',
};

const persisted_options = {
  paths: ['logged_in_user', 'selected_instance', 'live_instance_config', 'users_module.users', 'users_module.permissions'],
};

const store_options: StoreOptions<RootState> = {
  plugins: [createPersistedState(persisted_options)],
  state: {
    logged_in_user: null,
    selected_instance: null,
    live_instance_config: null,
  } as RootState,
  getters: {},
  mutations: {
    [ROOT_MUTATIONS.SET_USER](state, logged_in_user: LoggedInUser) { state.logged_in_user = logged_in_user; },
    [ROOT_MUTATIONS.RESET_USER](state) { state.logged_in_user = null; },
    [ROOT_MUTATIONS.SET_SELECTED_INSTANCE](state, selected_instance: Instance) {
      return state.selected_instance = selected_instance;
    },
    [ROOT_MUTATIONS.RESET_SELECTED_INSTANCE](state) { state.selected_instance = null; },
    [ROOT_MUTATIONS.SET_SELECTED_CONFIG](state, selected_config: InstanceConfig) {
      return state.live_instance_config = selected_config;
    },
    [ROOT_MUTATIONS.RESET_SELECTED_CONFIG](state) { state.live_instance_config = null; },
  },
  actions: {
    [ROOT_ACTIONS.LOGIN](context, {username, password}) {
      return context.commit(ROOT_MUTATIONS.SET_USER, {username, api_key: 'real_key'});
      // // ?? set_api_key?
      // const logged_in_user = login(username, password);
      // context.commit(MUTATIONS.SET_USER, logged_in_user);
    },
    [ROOT_ACTIONS.LOGOUT](context) {
      context.commit(ROOT_MUTATIONS.RESET_USER);
      context.commit(ROOT_MUTATIONS.RESET_SELECTED_INSTANCE);
      context.commit(ROOT_MUTATIONS.RESET_SELECTED_CONFIG);
    },
    [ROOT_ACTIONS.RESET_SELECTED_INSTANCE_AND_CONFIG](context) {
      context.commit(ROOT_MUTATIONS.RESET_SELECTED_INSTANCE);
      context.commit(ROOT_MUTATIONS.RESET_SELECTED_CONFIG);
    },
  },
  modules: {
    users_module,
  },
};

const store = new Vuex.Store(store_options);

// Only on first-load (or page reload): reset API-Key only
// @ts-ignore
set_api_key(store.state.user ? store.state.user.key : '');

export default store;
