import {TOGGLE_NAV} from '../../base/constants';

const initialState = false;

export const activeNav = (state = initialState, action) => {

    if (action.type === TOGGLE_NAV) {
        return !state;
    }

    return state;
};