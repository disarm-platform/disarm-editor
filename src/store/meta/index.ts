import { Module } from 'vuex';
import {state} from '@/store/meta/state';
import {MetaState} from '@/store/meta/types';
import {RootState} from '@/store/types';
import {actions} from '@/store/meta/actions';
import {mutations} from '@/store/meta/mutations';
import {getters} from '@/store/meta/getters';

export const meta: Module<MetaState, RootState> = {
  namespaced: false,
  state,
  getters,
  actions,
  mutations,
};
