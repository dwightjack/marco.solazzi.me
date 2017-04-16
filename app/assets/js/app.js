/**
 * Main Application File
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'what-input';

import Router from './router';
import mq from './base/mq';
import configureStore from './store';

import Root from './containers/Root';

const router = new Router({init: false});

mq.init();

const store = configureStore({
    breakpoint: mq.current
});

mq.connect(store);

// @see https://github.com/gaearon/react-hot-boilerplate/pull/61#issuecomment-254467020



// @see https://github.com/gaearon/react-hot-boilerplate/pull/61#issuecomment-254467020
const render = (Component, s, r) => {
    ReactDOM.render(
        <AppContainer>
            <Component store={s} router={r} />
        </AppContainer>,
        document.getElementById('app-root')
    );
};

render(Root, store, router);

if (__PRODUCTION__ === false) {

    if (module.hot) {

        module.hot.accept('./containers/Root', () => render(Root, store, router));
    }
}