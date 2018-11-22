import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import store from '@/store';
import {GETTERS} from '@/store/meta/getters';

import Login from '@/pages/Login.vue';
import Select from '@/pages/Select.vue';

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/select',
    },
    {
      path: '/select',
      name: 'select',
      component: Select,
    },
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
  const user = store.getters[GETTERS.META_USER]
  console.log('naved', to.name, to, user ? user.username: 'no user')
  if (!user && to.name !== 'login') { next({name: 'login'}); }
  next();
});

export default router;
