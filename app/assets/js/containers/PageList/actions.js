import { createAction} from 'redux-actions';

import {
    PAGELIST_SCROLL_UPDATE
} from '../../base/constants';

export const pagelistScrollUpdateAction = createAction(PAGELIST_SCROLL_UPDATE); //eslint-disable-line import/prefer-default-export