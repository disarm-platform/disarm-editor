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

interface IncomingOptions {
  url: string;
  method: string;
  data: any;
  params: string;
}

export const standard_handler = async (incoming_options: IncomingOptions) => {
  const default_options = {
    headers: {
      'API-Key': get(store, 'state.logged_in_user.api_key', ''),
    },
    baseURL: get(store, 'state.api_url', COMMON.api.url),
    params: {
      instance_id: get(store, 'state.config_module.selected_instance._id', null),
    },
  };
  const merged = {
    ...default_options,
    ...incoming_options,
  };

  return axios(merged);
};
