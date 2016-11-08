import {combineReducers} from 'redux';

import {activeNav} from './containers/Nav/reducers';
import {activeGroup, route} from './containers/App/reducers';
import { pagelistScroll } from './containers/PageList/reducers';

export default combineReducers({
    activeNav,
    pagelistScroll,
    activeGroup,
    route
});