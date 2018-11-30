import axios from 'axios';
import {get} from 'lodash';

import COMMON from '@/lib/common';
import store from '@/store';

declare var process: {
  env: {
    NODE_ENV: string,
    VUE_APP_API_URL: string,
  };
};

function get_api_url():string {
  const version = get(store, 'state.api_version',COMMON.api.version);
  const url = get(store, 'state.api_url', COMMON.api.url)
  return url+version
}

export const standard_handler = async (incoming_options:{url:string,method:string,data:any, params:string}) => {
  const default_options = {
    headers: {
      "API-Key": get(store, 'state.logged_in_user.api_key', ''),
    },
    baseURL: get(store, 'state.api_url', COMMON.api.url)
  }
  const merged = {
    ...default_options,
    ...incoming_options,
  }

  return axios(merged)
}
