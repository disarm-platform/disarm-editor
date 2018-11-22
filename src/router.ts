import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Login from '@/pages/Login.vue';
import store from '@/store';
import {MetaState} from '@/store/meta/types';
import {GETTERS} from '@/store/meta/getters';

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/select',
    },
    // {
    //   path: '/select',
    //   name: 'select',
    //   component: Select,
    // },
    // {
    //   path: '/edit',
    //   name: 'edit',
    //   component: Edit,
    //   children: [
    //     {
    //       path: 'users',
    //       name: 'users',
    //       component: EditUsers,
    //     },
    //     {
    //       path: 'json',
    //       name: 'json',
    //       component: EditJSON,
    //     },
    //     {
    //       path: 'geodata',
    //       name: 'geodata',
    //       component: EditGeodata,
    //     },
    //   ],
    // },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    // {
    //   path: '/logout',
    //   name: 'logout',
    //   component: Logout,
    // },
  ],
});

router.beforeEach((to, from, next) => {
  // check for logged-in user
  if (!store.getters[GETTERS.META_USER] && to.name !== 'login') { next('/login'); }
  next();
});

export default router;
