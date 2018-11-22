import Vue from 'vue';
import Vuex from 'vuex';

import {set_api_key} from '@/lib/handler';
import {login} from '@/lib/meta_controller';

Vue.use(Vuex);

export interface LoggedInUser {
  username: string;
  api_key: string;
}

export interface RootState {
  logged_in_user: LoggedInUser | null;
  selected_instance: any; // Instance | null;
  live_instance_config: any; // InstanceConfig | null;
  users_with_permissions: any; // UsersWithPermissions[];
}

export const MUTATIONS = {
  SET_USER: 'set_user',
  RESET_USER: 'reset_user',
};

export const ACTIONS = {
  META_LOGIN: 'meta_login',
  META_LOGOUT: 'meta_logout',
};

const store = new Vuex.Store({
  state: {
    logged_in_user: null,
    selected_instance: null,
    live_instance_config: null,
    users_with_permissions: [],
  } as RootState,
  getters: {},
  mutations: {
    [MUTATIONS.SET_USER](state, logged_in_user) { state.logged_in_user = logged_in_user; },
    [MUTATIONS.RESET_USER](state) { state.logged_in_user = null; },
  },
  actions: {
    [ACTIONS.META_LOGIN](context, {username, password}) {
      return context.commit(MUTATIONS.SET_USER, {username, api_key: 'real_key'});
      // // ?? set_api_key?
      // const logged_in_user = login(username, password);
      // context.commit(MUTATIONS.SET_USER, logged_in_user);
    },
    [ACTIONS.META_LOGOUT](context) {
      context.commit(MUTATIONS.RESET_USER);
    },
  },
  modules: {},
});

// Only on first-load (or page reload): reset API-Key only
// @ts-ignore
set_api_key(store.state.user ? store.state.user.key : '');

export default store;
