import {
    NAV_PATH_HOME,
    GROUP_PAGELIST,
    GROUP_COVER
} from '@/shared/constants';
import { createAction } from '@/shared/utils';
import { TYPES as MUTATIONS_TYPES } from './ui.mutations';

export const TYPES = {
    NAVIGATED_TO: 'NAVIGATED_TO_ACTION',
    NAV_TOGGLED: 'NAV_TOGGLED_ACTION',
    PAGELISTSCROLL_UPDATED: 'PAGELISTSCROLL_UPDATED_ACTION',
    APP_LOADED: 'APP_LOADED_ACTION',
    PAGELISTSCROLL_REQUESTED: 'PAGELISTSCROLL_REQUESTED_ACTION',
    PAGELISTSCROLL_COMPLETED: 'PAGELISTSCROLL_COMPLETED_ACTION',
    ROUTE_UPDATED: 'ROUTE_UPDATED_ACTION'
};


export const actions = {
    [TYPES.NAV_TOGGLED]({ commit }, { toggle, delay = 0 } = {}) {
        return new Promise((resolve) => {
            commit(MUTATIONS_TYPES.NAV_TOGGLED, toggle);
            setTimeout(() => resolve(toggle), delay);
        });
    },
    [TYPES.PAGELISTSCROLL_UPDATED]: createAction(MUTATIONS_TYPES.PAGELISTSCROLL_UPDATED),
    [TYPES.APP_LOADED]: createAction(MUTATIONS_TYPES.APP_LOADED),

    [TYPES.ROUTE_UPDATED]({ commit, state }, route) {
        const activeGroup = route === NAV_PATH_HOME ? GROUP_COVER : GROUP_PAGELIST;


        if (state.forcedScroll === false) {
            commit(MUTATIONS_TYPES.ACTIVE_GROUP_UPDATED, activeGroup);
            commit(MUTATIONS_TYPES.ROUTE_UPDATED, route);
        }

        return activeGroup;
    },

    [TYPES.NAVIGATED_TO]({ dispatch }, { route, force = false, unblock = false }) {

        dispatch(TYPES.ROUTE_UPDATED, route);

        if (force === true) {
            dispatch(TYPES.PAGELISTSCROLL_REQUESTED, { route });
            if (unblock) {
                setTimeout(() => {
                    dispatch(TYPES.PAGELISTSCROLL_COMPLETED);
                }, 0);
            }
        }
    },

    [TYPES.PAGELISTSCROLL_REQUESTED]: createAction(MUTATIONS_TYPES.PAGELISTSCROLL_REQUESTED),

    [TYPES.PAGELISTSCROLL_COMPLETED]: createAction(MUTATIONS_TYPES.PAGELISTSCROLL_COMPLETED)
};