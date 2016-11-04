import {TOGGLE_NAV} from '../../base/constants';

const initialState = false;

export const activeNav = (state = initialState, {type, payload}) => {

    if (type === TOGGLE_NAV) {
        return (typeof payload === 'undefined') ? !state : payload;
    }

    return state;
};