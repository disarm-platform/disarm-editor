import { MutationTree } from 'vuex';
import {MetaState} from '@/store/meta/types';

export const MUTATIONS = {
  META_SET_USER: 'meta_set_user',
  META_RESET_USER: 'meta_reset_user',
};

export const mutations: MutationTree<MetaState> = {
  [MUTATIONS.META_SET_USER](state, user) {
    state.user = user;
  },
  [MUTATIONS.META_RESET_USER](state) {
    state.user = null;
  },
};
