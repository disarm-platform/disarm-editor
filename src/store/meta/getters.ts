import { GetterTree } from 'vuex';
import {MetaState, MetaUser} from '@/store/meta/types';
import {RootState} from '@/store/types';

export const GETTERS = {
  META_USER: 'META_USER',
};

export const getters: GetterTree<MetaState, RootState> = {
  [GETTERS.META_USER](state) {
    return state.user;
  },
};
