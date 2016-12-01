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
import { AppContainer } from 'react-hot-loader';
import 'what-input';

import './base/plugins';

import Router from './router';
import mq from './base/mq';
import configureStore from './store';

import Root from './containers/Root';

import '../scss/app.scss';

const router = new Router({init: false});

mq.init();

const store = configureStore({
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

        module.hot.accept('./containers/Root', () => {

            const RootContainer = require('./containers/Root').default; //eslint-disable-line global-require

            ReactDOM.render(
                <AppContainer>
                    <RootContainer store={store} router={router} />
                </AppContainer>,
                document.getElementById('app-root')
            );
        });
    }
}
