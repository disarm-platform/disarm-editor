// profile/index.ts
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';


import {RootState} from '@/store';
import {DevBasicUser, DoumaUser, Permission} from '@/types';
import {standard_handler } from '@/lib/handler';

export interface UsersState {
  users: DevBasicUser[];
  permissions: Permission[];
}

export const empty_state: UsersState = {
  users: [],
  permissions: [],
};

export const USERS_MUTATIONS = {
  SET_USERS: 'SET_USERS',
  RESET_USERS: 'RESET_USERS',
  ADD_USER: 'ADD_USER',
  SET_PERMISSIONS: 'SET_PERMISSIONS',
  RESET_PERMISSIONS: 'RESET_PERMISSIONS',
};

const mutations: MutationTree<UsersState> = {
  [USERS_MUTATIONS.SET_USERS](state, users) { state.users = users; },
  [USERS_MUTATIONS.RESET_USERS](state) { state.users = []; },
  [USERS_MUTATIONS.ADD_USER](state, user) { state.users.push(user); },
  [USERS_MUTATIONS.SET_PERMISSIONS](state, permissions) { state.permissions = permissions; },
  [USERS_MUTATIONS.RESET_PERMISSIONS](state) { state.permissions = []; },
};

export const USERS_ACTIONS = {
  FETCH_USERS: 'FETCH_USERS',
  UPDATE_USER: 'UPDATE_USER',
  FETCH_PERMISSIONS: 'FETCH_PERMISSIONS',
  UPDATE_PERMISSIONS: 'UPDATE_PERMISSIONS',
};

const actions: ActionTree<UsersState, RootState> = {
  async [USERS_ACTIONS.FETCH_USERS](context, {instance_id}) {
    const options = {
      method: 'get',
      url: '/all_users',
      params: {
        instance_id,
      },
    };
    try {
      const result = await standard_handler(options as any);
      context.commit(USERS_MUTATIONS.SET_USERS, result.data);
      return result;
    } catch (e) {
      console.log(e);
    }
  },
  async [USERS_ACTIONS.UPDATE_USER](context, user) {
    const options = {
      method: 'put',
      url: '/user',
      data: user,
    };
    try {
      const result = await standard_handler(options as any);
      await context.dispatch(USERS_ACTIONS.FETCH_USERS);
    } catch (e) {
      console.log(e);
    }
  },
  async [USERS_ACTIONS.FETCH_PERMISSIONS](context, {instance_id}) {
    const options = {
      method: 'get',
      url: '/permission',
      params: {
        instance_id,
      },
    };
    try {
      const result = await standard_handler(options as any);
      return  context.commit(USERS_MUTATIONS.SET_PERMISSIONS, result.data);
    } catch (e) {
      console.log(e);
    }
  },
  async [USERS_ACTIONS.UPDATE_PERMISSIONS](context, {permissions, instance_id}) {
    const options = {
      method: 'put',
      url: '/permissions',
      data: permissions,
      params: {
        instance_id,
      },
    };
    try {
      const result = await standard_handler(options as any);
      await context.dispatch(USERS_ACTIONS.FETCH_PERMISSIONS);
    } catch (e) {
      console.log(e);
    }
  },
};

const getters: GetterTree<UsersState, RootState> = {

};

export const users_module: Module<UsersState, RootState> = {
  namespaced: false,
  state: empty_state,
  getters,
  actions,
  mutations,
};
