import {ActionTree} from 'vuex';

import {MetaState} from '@/store/meta/types';
import {RootState} from '@/store/types';
import {MUTATIONS} from '@/store/meta/mutations';
import {login} from '@/lib/meta_controller';

export const ACTIONS = {
  META_LOGIN: 'META_LOGIN',
  META_LOGOUT: 'META_LOGOUT',
};

export const actions: ActionTree<MetaState, RootState> = {
  [ACTIONS.META_LOGIN](context, {username, password}) {

    return context.commit(MUTATIONS.APP_SET_USER, {username, api_key: 'real_key'});
    // ?? set_api_key?
    const logged_in_user = login(username, password);
    context.commit(MUTATIONS.APP_SET_USER, logged_in_user);
  },
  [ACTIONS.META_LOGOUT](context) {
    context.commit(MUTATIONS.APP_RESET_USER);
  },
};
