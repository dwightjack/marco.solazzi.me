import { createStore } from 'redux';

import DevTools from './containers/DevTools';
import reducer from './reducers';

export default function configureStore(initialState = {}) {
    const store = createStore(reducer, initialState, DevTools.instrument());

    if (module.hot) {
        module.hot.accept('./reducers', () =>
            store.replaceReducer(require('./reducers')) //eslint-disable-line global-require
        );
    }

    return store;
}