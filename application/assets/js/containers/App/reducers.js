import {PAGELIST_SCROLL_UPDATE} from '../../base/constants';

const initialState = 0;

export const pagelistScroll = (state = initialState, {type, payload = 0}) => {

    if (type === PAGELIST_SCROLL_UPDATE) {
        return payload;
    }

    return state;
};