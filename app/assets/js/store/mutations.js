import {
    APP_ACTIVE_NAV_MUTATE,
    APP_ACTIVE_GROUP_MUTATE,
    APP_ROUTE_MUTATE
} from '@/shared/constants';

/* eslint-disable no-param-reassign */

export default {
    [APP_ACTIVE_NAV_MUTATE](state, toggle) {
        state.activeNav = (typeof toggle === 'undefined') ? !state.activeNav : (!!toggle);
    },

    [APP_ACTIVE_GROUP_MUTATE](state, activeGroup) {
        state.activeGroup = activeGroup;
    },

    [APP_ROUTE_MUTATE](state, route) {
        state.route = route;
    }
};

/* eslint-enable no-param-reassign */