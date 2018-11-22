import {ActionTree} from 'vuex';

import {MetaState, MetaUser} from '@/store/meta/types';
import {RootState} from '@/store/types';
import {MUTATIONS} from '@/store/meta/mutations';

export const ACTIONS = {
  META_DO_LOGIN: 'meta_do_login',
};

export const actions: ActionTree<MetaState, RootState> = {
  [ACTIONS.META_DO_LOGIN](context, user: MetaUser) {
    // try remote login
    
    // ?? set_api_key?
    context.commit(MUTATIONS.META_SET_USER, user);
  },
};
