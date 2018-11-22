import Vue from 'vue';
import Vuex from 'vuex';
import {meta} from '@/store/meta';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    meta,
  },
});
