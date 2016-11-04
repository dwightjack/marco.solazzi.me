import { createAction} from 'redux-actions';

import { TOGGLE_NAV, NAVIGATE_TO } from '../../base/constants';

export const toggleNavAction = createAction(TOGGLE_NAV);

export const navigateToAction = createAction(NAVIGATE_TO);