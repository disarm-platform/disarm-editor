import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import store from '@/store';

import Login from '@/pages/Login.vue';
import Select from '@/pages/select/Select.vue';
import Logout from '@/pages/Logout.vue';

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
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // check for logged-in user
  if (!store.state.logged_in_user && (to.name !== 'login')) {return next({name: 'login'}); }
  return next();
});

export default router;
