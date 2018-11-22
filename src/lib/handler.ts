import axios from 'axios';

import COMMON from './common';

declare var process: {
  env: {
    NODE_ENV: string,
    VUE_APP_API_URL: string,
  };
};

export function get_api_url() {
  return COMMON.api.dev_url;
  // const production_host = process.env.VUE_APP_API_URL || location.hostname.replace('editor', 'api');
  // const version = COMMON.api.version;
  //
  // if (process.env.NODE_ENV === 'production') {
  //   return urljoin('https://', production_host, version);
  // } else {
  //   return urljoin(COMMON.api.dev_url, version);
  // }
}


export const standard_handler = axios.create({
  baseURL: get_api_url(),
});

export function set_api_key(api_key: string) {
  standard_handler.defaults.headers = {
    'API-Key': api_key,
  };
}
