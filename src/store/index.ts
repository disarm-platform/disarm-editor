import Vue from 'vue';
import Vuex from 'vuex';

import {set_api_key} from '@/lib/handler';
import {MetaState} from '@/store/meta/types';
import {meta} from '@/store/meta';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    meta,
  },
});

// Reset API-Key only for page reload
// @ts-ignore
set_api_key(store.state.user ? store.state.user.key : '');

export default store;
