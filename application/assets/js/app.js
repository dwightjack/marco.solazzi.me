/**
 * Main Application File
 *
 * Use for bootstrapping large application
 * or just fill it with JS on small projects
 *
 */

import 'scss/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './base/plugins';

import configureStore from './store';

import App from './containers/App';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app-root')
);