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
    PAGELISTSCROLL_REQUESTED: 'PAGELISTSCROLL_REQUESTED_ACTION'
};


export const actions = {
    [TYPES.NAV_TOGGLED]: createAction(MUTATIONS_TYPES.NAV_TOGGLED),

    [TYPES.PAGELISTSCROLL_UPDATED]: createAction(MUTATIONS_TYPES.PAGELISTSCROLL_UPDATED),
    [TYPES.APP_LOADED]: createAction(MUTATIONS_TYPES.APP_LOADED),

    [TYPES.NAVIGATED_TO]({ commit, dispatch }, { hash, force = false }) {

        const activeGroup = hash === NAV_PATH_HOME ? GROUP_COVER : GROUP_PAGELIST;

        commit(MUTATIONS_TYPES.ACTIVE_GROUP_UPDATED, activeGroup);
        commit(MUTATIONS_TYPES.ROUTE_UPDATED, hash);

        if (force === true) {
            dispatch(TYPES.PAGELISTSCROLL_REQUESTED, { hash, activeGroup });
        }
    },

    [TYPES.PAGELISTSCROLL_REQUESTED]({ commit }, { hash }) {

        return new Promise((resolve) => {
            commit(MUTATIONS_TYPES.PAGELISTSCROLL_REQUESTED, { hash });
            setTimeout(() => {
                commit(MUTATIONS_TYPES.PAGELISTSCROLL_COMPLETED);
                resolve(true);
            }, 0);
        });
    }
};