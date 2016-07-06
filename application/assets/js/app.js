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

import './base/plugins';

import App from './components/app';

ReactDOM.render(
    <App />,
    document.getElementById('app-root')
);