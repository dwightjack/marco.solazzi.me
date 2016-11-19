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

import './base/plugins';

import Router from './router';
import mq from './base/mq';
import configureStore from './store';

import App from './containers/App';
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


ReactDOM.render(
    <Provider store={store}>
        <App router={router} />
    </Provider>,
    document.getElementById('app-root')
);