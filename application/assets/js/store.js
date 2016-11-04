import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducer from './reducers';

export default function configureStore(initialState = {}) {
    const store = createStore(
        reducer,
        initialState,
        applyMiddleware(
            thunkMiddleware
        )
        );

    if (PRODUCTION === false) {

        if (module.hot) {
            module.hot.accept('./reducers', () =>
                store.replaceReducer(require('./reducers')) //eslint-disable-line global-require
            );
        }

    }

    return store;
}