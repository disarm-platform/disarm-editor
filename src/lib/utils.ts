import { Store } from 'vuex';
import { RootState, ROOT_MUTATIONS } from '@/store';
import COMMON from '@/lib/common';

const find_get_parameter = (parameterName: string): string | null => {
  let result = null;
  let tmp = [];

  location.search
    .substr(1)
    .split('&')
    .forEach((item) => {
      tmp = item.split('=');
      if (tmp[0] === parameterName) { result = decodeURIComponent(tmp[1]); }
    });
  return result;
};

export const store_api_url_if_found_as_query_param = (store: Store<RootState>): boolean => {
  const query_param = COMMON.api.query_parameter;
  const found = find_get_parameter(query_param);

  if (found) {
    store.commit(ROOT_MUTATIONS.SET_API_URL, found);
    return true;
  } else {
    return false;
  }
};
