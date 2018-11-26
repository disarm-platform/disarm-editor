// profile/index.ts
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';

import {ROOT_MUTATIONS, RootState} from '@/store';
import {DevBasicUser, Permission} from '@/types';

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
  SET_PERMISSIONS: 'SET_PERMISSIONS',
  RESET_PERMISSIONS: 'RESET_PERMISSIONS',
};

const mutations: MutationTree<UsersState> = {
  [USERS_MUTATIONS.SET_USERS](state, users) { state.users = users; },
  [USERS_MUTATIONS.RESET_USERS](state) { state.users = []; },
  [USERS_MUTATIONS.SET_PERMISSIONS](state, permissions) { state.permissions = permissions; },
  [USERS_MUTATIONS.RESET_PERMISSIONS](state) { state.permissions = []; },
};

export const USERS_ACTIONS = {
  REFETCH_USERS: 'RELOAD_USERS',
  REFETCH_PERMISSIONS: 'RELOAD_PERMISSIONS',
};

const actions: ActionTree<UsersState, RootState> = {
  [USERS_ACTIONS.REFETCH_USERS](context) {
    context.commit(USERS_MUTATIONS.RESET_USERS);
    console.log('[TODO] refetch users from remote...');
  },
  [USERS_ACTIONS.REFETCH_PERMISSIONS](context) {
    context.commit(USERS_MUTATIONS.RESET_PERMISSIONS);
    console.log('[TODO] refetch permissions from remote...');
  },
};

const getters: GetterTree<UsersState, RootState> = {};

export const users_module: Module<UsersState, RootState> = {
  namespaced: false,
  state: empty_state,
  getters,
  actions,
  mutations,
};
