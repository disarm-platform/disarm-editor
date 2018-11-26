import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import {set_api_key} from '@/lib/handler';
import {login} from '@/lib/meta_controller';
import {DevBasicUser, Instance, InstanceConfig, Permission} from '@/types';

Vue.use(Vuex);

export interface LoggedInUser {
  username: string;
  api_key: string;
}

export interface RootState {
  logged_in_user: LoggedInUser | null;
  selected_instance: Instance | null;
  live_instance_config: InstanceConfig | null;
  users: DevBasicUser[];
  permissions: Permission[];
}

export const MUTATIONS = {
  SET_USER: 'SET_USER',
  RESET_USER: 'RESET_USER',
  SET_SELECTED_INSTANCE: 'SET_SELECTED_INSTANCE',
  RESET_SELECTED_INSTANCE: 'RESET_SELECTED_INSTANCE',
  SET_SELECTED_CONFIG: 'SET_SELECTED_CONFIG',
  RESET_SELECTED_CONFIG: 'RESET_SELECTED_CONFIG',
  SET_USERS: 'SET_USERS',
  RESET_USERS: 'RESET_USERS',
  SET_PERMISSIONS: 'SET_PERMISSIONS',
  RESET_PERMISSIONS: 'RESET_PERMISSIONS',
};

export const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  RESET_SELECTED_INSTANCE_AND_CONFIG: 'RESET_SELECTED_CONFIG',
};

const persisted_options = {
  paths: ['logged_in_user', 'selected_instance', 'live_instance_config', 'users', 'permissions'],
};

const store = new Vuex.Store({
  plugins: [createPersistedState(persisted_options)],
  state: {
    logged_in_user: null,
    selected_instance: null,
    live_instance_config: null,
    users: [],
    permissions: [],
  } as RootState,
  getters: {},
  mutations: {
    [MUTATIONS.SET_USER](state, logged_in_user: LoggedInUser) { state.logged_in_user = logged_in_user; },
    [MUTATIONS.RESET_USER](state) { state.logged_in_user = null; },
    [MUTATIONS.SET_SELECTED_INSTANCE](state, selected_instance: Instance) {
      return state.selected_instance = selected_instance;
    },
    [MUTATIONS.RESET_SELECTED_INSTANCE](state) { state.selected_instance = null; },
    [MUTATIONS.SET_SELECTED_CONFIG](state, selected_config: InstanceConfig) {
      return state.live_instance_config = selected_config;
    },
    [MUTATIONS.RESET_SELECTED_CONFIG](state) { state.live_instance_config = null; },
    [MUTATIONS.SET_USERS](state, users) { state.users = users; },
    [MUTATIONS.RESET_USERS](state) { state.users = []; },
    [MUTATIONS.SET_PERMISSIONS](state, permissions) { state.permissions = permissions; },
    [MUTATIONS.RESET_PERMISSIONS](state) { state.permissions = []; },
  },
  actions: {
    [ACTIONS.LOGIN](context, {username, password}) {
      return context.commit(MUTATIONS.SET_USER, {username, api_key: 'real_key'});
      // // ?? set_api_key?
      // const logged_in_user = login(username, password);
      // context.commit(MUTATIONS.SET_USER, logged_in_user);
    },
    [ACTIONS.LOGOUT](context) {
      context.commit(MUTATIONS.RESET_USER);
      context.commit(MUTATIONS.RESET_SELECTED_INSTANCE);
      context.commit(MUTATIONS.RESET_SELECTED_CONFIG);
      context.commit(MUTATIONS.RESET_USERS);
    },
    [ACTIONS.RESET_SELECTED_INSTANCE_AND_CONFIG](context) {
      context.commit(MUTATIONS.RESET_SELECTED_INSTANCE);
      context.commit(MUTATIONS.RESET_SELECTED_CONFIG);
    },
  },
  modules: {},
});

// Only on first-load (or page reload): reset API-Key only
// @ts-ignore
set_api_key(store.state.user ? store.state.user.key : '');

export default store;
