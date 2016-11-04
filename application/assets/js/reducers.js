import {combineReducers} from 'redux';

import {activeNav} from './containers/Nav/reducers';
import {pagelistScroll, activeGroup, currentPath} from './containers/App/reducers';

export default combineReducers({
    activeNav,
    pagelistScroll,
    activeGroup,
    currentPath
});