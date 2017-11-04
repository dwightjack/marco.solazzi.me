/* eslint-disable no-param-reassign */

export const TYPES = {
    NAV_TOGGLED: 'NAV_TOGGLED',
    ACTIVE_GROUP_UPDATED: 'ACTIVE_GROUP_UPDATED',
    ROUTE_UPDATED: 'ROUTE_UPDATED',
    PAGELISTSCROLL_UPDATED: 'PAGELISTSCROLL_UPDATED',
    PAGELISTSCROLL_REQUESTED: 'PAGELISTSCROLL_REQUESTED',
    PAGELISTSCROLL_COMPLETED: 'PAGELISTSCROLL_COMPLETED',
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
    },

    [TYPES.PAGELISTSCROLL_REQUESTED](state, { route }) {
        state.forcedScroll = !!route;
    },

    [TYPES.PAGELISTSCROLL_COMPLETED](state) {
        state.forcedScroll = false;
    }
};

/* eslint-enable no-param-reassign */