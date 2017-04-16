import { PAGELIST_SCROLL_UPDATE } from '../../base/constants';

export const pagelistScroll = (state = 0, {type, payload = 0}) => {  //eslint-disable-line import/prefer-default-export

    if (type === PAGELIST_SCROLL_UPDATE) {
        return payload;
    }

    return state;
};