// profile/index.ts
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';

import {ROOT_MUTATIONS, RootState} from '@/store';
import {DevBasicUser, DoumaUser, Permission} from '@/types';
import {sample_permissions, sample_users} from '@/pages/seedData';

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
  FETCH_PERMISSIONS: 'FETCH_PERMISSIONS',
  REFETCH_USERS: 'REFETCH_USERS',
  REFETCH_PERMISSIONS: 'REFETCH_PERMISSIONS',
};

const actions: ActionTree<UsersState, RootState> = {
  async [USERS_ACTIONS.FETCH_USERS](context) {
    const fetched = sample_users;
    context.commit(USERS_MUTATIONS.SET_USERS, fetched);
  },
  async [USERS_ACTIONS.REFETCH_USERS](context) {
    context.commit(USERS_MUTATIONS.RESET_USERS);
    console.log('[TODO] refetch users from remote...');
    await context.dispatch(USERS_ACTIONS.FETCH_USERS);
  },
  async [USERS_ACTIONS.FETCH_PERMISSIONS](context) {
    const fetched = sample_permissions;
    context.commit(USERS_MUTATIONS.SET_PERMISSIONS, fetched);
  },
  async [USERS_ACTIONS.REFETCH_PERMISSIONS](context) {
    context.commit(USERS_MUTATIONS.RESET_PERMISSIONS);
    await context.dispatch(USERS_ACTIONS.FETCH_PERMISSIONS);
    console.log('[TODO] refetch permissions from remote...');
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
