import { MutationTree } from 'vuex';
import {MetaState, MetaUser} from '@/store/meta/types';

export const MUTATIONS = {
  APP_SET_USER: 'app_set_user',
  APP_RESET_USER: 'app_reset_user',
};

export const mutations: MutationTree<MetaState> = {
  [MUTATIONS.APP_SET_USER](state, user: MetaUser) {
    console.log('APP_SET_USER')
    state.user = user;
  },
  [MUTATIONS.APP_RESET_USER](state) {
    console.log('APP_RESET_USER')
    state.user = null;
  },
};
