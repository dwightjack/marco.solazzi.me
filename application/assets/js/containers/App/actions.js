import { createAction} from 'redux-actions';

import {
    APP_ACTIVE_GROUP,
    NAVIGATE_TO,
    NAV_PATH_HOME
} from '../../base/constants';


export const appActiveGroupAction = createAction(APP_ACTIVE_GROUP);

export const navigateToAction = (hash) => { //eslint-disable-line arrow-body-style
    return (dispatch) => {
        const activeGroup = hash === NAV_PATH_HOME ? 'cover' : 'pagelist';
        dispatch(appActiveGroupAction(activeGroup));
        dispatch({type: NAVIGATE_TO, payload: hash});
    };
};