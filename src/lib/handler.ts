import axios from 'axios';
import {get} from 'lodash';

import store from '@/store';

declare var process: {
  env: {
    NODE_ENV: string,
    VUE_APP_API_URL: string,
  };
};

export function get_api_url() {
  return get(store, 'state.api_url', null);
}


export const standard_handler = axios.create({
  baseURL: get_api_url(),
});

export function set_api_key(api_key: string) {
  standard_handler.defaults.headers = {
    'API-Key': api_key,
  };
}
