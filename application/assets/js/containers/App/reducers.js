import { PAGELIST_SCROLL_UPDATE, APP_ACTIVE_GROUP, NAVIGATE_TO, NAV_PATH_HOME } from '../../base/constants';

export const pagelistScroll = (state = 0, {type, payload = 0}) => {

    if (type === PAGELIST_SCROLL_UPDATE) {
        return payload;
    }

    return state;
};

export const activeGroup = (state = 'intro', {type, payload}) => {

    if (type === APP_ACTIVE_GROUP && typeof payload === 'string') {
        return payload;
    }

    return state;
};

export const route = (state = NAV_PATH_HOME, {type, payload}) => {

    if (type === NAVIGATE_TO) {
        return payload;
    }

    return state;
};