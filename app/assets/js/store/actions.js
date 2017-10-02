import {
    APP_ACTIVE_NAV_MUTATE,
    APP_ACTIVE_GROUP_MUTATE,
    APP_ROUTE_MUTATE,
    APP_PAGESCROLL_MUTATE,
    APP_LOADED_MUTATE,
    APP_ACTIVE_NAV_ACTION,
    APP_NAVIGATE_ACTION,
    NAV_PATH_HOME,
    GROUP_PAGELIST,
    GROUP_COVER,
    APP_PAGESCROLL_ACTION,
    APP_LOADED_ACTION
} from '@/shared/constants';
import { createAction } from '@/shared/utils';


export default {
    [APP_ACTIVE_NAV_ACTION]: createAction(APP_ACTIVE_NAV_MUTATE),

    [APP_PAGESCROLL_ACTION]: createAction(APP_PAGESCROLL_MUTATE),
    [APP_LOADED_ACTION]: createAction(APP_LOADED_MUTATE),

    [APP_NAVIGATE_ACTION]({ commit }, hash) {

        const activeGroup = hash === NAV_PATH_HOME ? GROUP_COVER : GROUP_PAGELIST;

        commit(APP_ACTIVE_GROUP_MUTATE, activeGroup);
        commit(APP_ROUTE_MUTATE, hash);
    }
};