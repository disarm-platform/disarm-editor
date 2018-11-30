import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import COMMON from '@/lib/common';
import {set_api_key} from '@/lib/handler';
import {login} from '@/lib/meta_controller';
import {DevBasicUser, Instance, InstanceConfig} from '@/types';
import {users_module} from '@/store/users';
import {CONFIG_ACTIONS, config_module} from '@/store/config';

Vue.use(Vuex);

export interface LoggedInUser {
  username: string;
  api_key: string;
}

export interface RootState {
  logged_in_user: LoggedInUser | null;
  selected_instance: Instance | null;
  api_url: string;
}

export const ROOT_MUTATIONS = {
  SET_USER: 'SET_USER',
  RESET_USER: 'RESET_USER',
  SET_API_URL: 'SET_API_URL',
};

export const ROOT_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const persisted_options = {
  paths: [
    'logged_in_user', 'api_url',
    'config_module.selected_instance', 'config_module.live_instance_config',
    'users_module.users', 'users_module.permissions',
  ],
};

const store_options: StoreOptions<RootState> = {
  plugins: [createPersistedState(persisted_options)],
  state: {
    logged_in_user: null,
    api_url: COMMON.api.url,
    selected_instance: null,
    live_instance_config: null,
  } as RootState,
  getters: {},
  mutations: {
    [ROOT_MUTATIONS.SET_USER](state, logged_in_user: LoggedInUser) { state.logged_in_user = logged_in_user; },
    [ROOT_MUTATIONS.RESET_USER](state) { state.logged_in_user = null; },
    [ROOT_MUTATIONS.SET_API_URL](state, api_url) { state.api_url = api_url; },
  },
  actions: {
    [ROOT_ACTIONS.LOGIN](context, {username, password}) {
      return context.commit(ROOT_MUTATIONS.SET_USER, {username, api_key: 'real_key'});
      // // ?? set_api_key?
      // const logged_in_user = login(username, password);
      // context.commit(MUTATIONS.SET_USER, logged_in_user);
    },
    async [ROOT_ACTIONS.LOGOUT](context) {
      context.commit(ROOT_MUTATIONS.RESET_USER);
      await context.dispatch(CONFIG_ACTIONS.RESET_SELECTED_INSTANCE_AND_CONFIG);
    },
  },
  modules: {
    users_module,
    config_module,
  },
};

const store = new Vuex.Store(store_options);

// Only on first-load (or page reload): reset API-Key only
// @ts-ignore
set_api_key(store.state.user ? store.state.user.key : '');

export default store;
