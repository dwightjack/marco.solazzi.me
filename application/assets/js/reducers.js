import {combineReducers} from 'redux';

import {activeNav} from './containers/Nav/reducers';
import {pagelistScroll} from './containers/App/reducers';

export default combineReducers({
    activeNav,
    pagelistScroll
});