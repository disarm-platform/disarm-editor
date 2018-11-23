import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import {set_api_key} from '@/lib/handler';
import {login} from '@/lib/meta_controller';
import {Instance, InstanceConfig} from '@/types';

Vue.use(Vuex);

export interface LoggedInUser {
  username: string;
  api_key: string;
}

export interface RootState {
  logged_in_user: LoggedInUser | null;
  selected_instance: Instance | null;
  live_instance_config: any; // InstanceConfig | null;
  users_with_permissions: any; // UsersWithPermissions[];
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
};

export const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  RESET_SELECTED_CONFIG: 'RESET_SELECTED_CONFIG',
};

const persisted_optons = {
  paths: ['logged_in_user'],
};

const store = new Vuex.Store({
  plugins: [createPersistedState(persisted_optons)],
  state: {
    logged_in_user: null,
    selected_instance: null,
    live_instance_config: null,
    users_with_permissions: [],
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
    [MUTATIONS.SET_USERS](state, users) { state.users_with_permissions = users; },
    [MUTATIONS.RESET_USERS](state) { state.users_with_permissions = []; },
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
    [ACTIONS.RESET_SELECTED_CONFIG](context) {
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
