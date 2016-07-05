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

const App = () => (
    <h1>.jobs.current</h1>
);

ReactDOM.render(<App />, document.getElementById('app-root'));