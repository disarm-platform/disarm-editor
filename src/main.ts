import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
Vue.use(ElementUI, {locale});

import App from './App.vue';
import router from '@/router';
import store from '@/store';
import { store_api_url_if_found_as_query_param } from './lib/utils';

Vue.config.productionTip = false;

// Check if api-url is passed as a query param
store_api_url_if_found_as_query_param(store);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
