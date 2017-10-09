/* eslint-disable no-param-reassign */

export const TYPES = {
    NAV_TOGGLED: 'NAV_TOGGLED',
    ACTIVE_GROUP_UPDATED: 'ACTIVE_GROUP_UPDATED',
    ROUTE_UPDATED: 'ROUTE_UPDATED',
    PAGELISTSCROLL_UPDATED: 'PAGELISTSCROLL_UPDATED',
    APP_LOADED: 'APP_LOADED'
};

export const mutations = {
    [TYPES.NAV_TOGGLED](state, toggle) {
        state.activeNav = (typeof toggle === 'undefined') ? !state.activeNav : (!!toggle);
    },

    [TYPES.ACTIVE_GROUP_UPDATED](state, activeGroup) {
        state.activeGroup = activeGroup;
    },

    [TYPES.APP_LOADED](state, isLoaded) {
        state.isLoaded = isLoaded;
    },

    [TYPES.ROUTE_UPDATED](state, route) {
        state.route = route;
    },

    [TYPES.PAGELISTSCROLL_UPDATED](state, pagelistScroll) {
        state.pagelistScroll = pagelistScroll;
    }
};

/* eslint-enable no-param-reassign */