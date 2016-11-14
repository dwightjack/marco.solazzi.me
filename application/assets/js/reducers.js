import { combineReducers } from 'redux';

import { activeNav, activeGroup, route } from './containers/Nav/reducers';
import { pagelistScroll } from './containers/PageList/reducers';

export default combineReducers({
    activeNav,
    pagelistScroll,
    activeGroup,
    route
});