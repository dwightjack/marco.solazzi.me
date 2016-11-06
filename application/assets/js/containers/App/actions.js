import { createAction} from 'redux-actions';

import {
    PAGELIST_SCROLL_UPDATE,
    APP_ACTIVE_GROUP,
    NAVIGATE_TO,
    NAV_PATH_HOME,
    NAV_PATH_JOBS,
    NAV_PATH_EDUCATION,
    NAV_PATH_SKILLS,
    NAV_PATH_PORTFOLIO
} from '../../base/constants';

const paths = [
    NAV_PATH_HOME,
    NAV_PATH_JOBS,
    NAV_PATH_EDUCATION,
    NAV_PATH_SKILLS,
    NAV_PATH_PORTFOLIO
];

export const pagelistScrollUpdateAction = createAction(PAGELIST_SCROLL_UPDATE);

export const appActiveGroupAction = createAction(APP_ACTIVE_GROUP);

export const navigateToAction = (hash) => { //eslint-disable-line arrow-body-style
    return (dispatch) => {
        if (paths.indexOf(hash) !== -1) {
            const activeGroup = hash === NAV_PATH_HOME ? 'cover' : 'pagelist';
            dispatch(appActiveGroupAction(activeGroup));
            dispatch({type: NAVIGATE_TO, payload: hash});
        }
    };
};