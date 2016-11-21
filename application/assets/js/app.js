/**
 * Main Application File
 *
 * Use for bootstrapping large application
 * or just fill it with JS on small projects
 *
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import './base/plugins';

import Router from './router';
import mq from './base/mq';
import configureStore from './store';

import Root from './containers/Root';
import { NAV_PATH_HOME } from './base/constants';

import '../scss/app.scss';

const router = new Router();

mq.init();

const store = configureStore({
    route: router.current,
    activeGroup: (router.current === '' ? 'intro' : (router.current === NAV_PATH_HOME ? 'cover' : 'pagelist')), //eslint-disable-line no-nested-ternary
    breakpoint: mq.current
});

mq.connect(store);

// @see https://github.com/gaearon/react-hot-boilerplate/pull/61#issuecomment-254467020

ReactDOM.render(
    <AppContainer>
        <Root store={store} router={router} />
    </AppContainer>,
    document.getElementById('app-root')
);

if (__PRODUCTION__ === false) {
    if (module.hot) {

    module.hot.accept('./containers/App', () => {
        const RootContainer = require('./containers/Root').default;
        ReactDOM.render(
            <AppContainer>
                <RootContainer store={store} router={router} />
            </AppContainer>,
            document.getElementById('app-root')
        );
    });
    }
}
