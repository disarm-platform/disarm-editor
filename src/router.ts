import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import Login from '@/pages/Login.vue';
import Select from '@/pages/select/Select.vue';
import Logout from '@/pages/Logout.vue';
import Edit from '@/pages/edit/Edit.vue';
import EditUsers from '@/pages/edit/EditUsers/EditUsers.vue';
import EditPermissions from '@/pages/edit/EditPermissions/EditPermissions.vue';
import EditJSON from '@/pages/edit/EditJSON/EditJSON.vue';
import EditGeodata from '@/pages/edit/EditGeodata/UploadGeodata.vue';
import GeodataSummary from '@/pages/edit/EditGeodata/GeodataSummary.vue';

Vue.use(Router);

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
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
      redirect: '/edit/users',
      beforeEnter: ((to, from, next) => {
        if (!(store.state as any).config_module.live_instance_config) { return next({name: 'select'}); }
        return next();
      }),
      children: [
        {
          path: 'users',
          name: 'users',
          component: EditUsers,
        },
        {
          path: 'permissions',
          name: 'permissions',
          component: EditPermissions,
        },
        {
          path: 'json',
          name: 'json',
          component: EditJSON,
        },
        {
          path: 'geodata',
          name: 'geodata',
          component: GeodataSummary,
        },
      ],
    },
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
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  // check for logged-in user
  if (!store.state.logged_in_user && (to.name !== 'login')) {
    return next({name: 'login'});
  }
  return next();
});

export default router;
