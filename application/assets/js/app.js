/**
 * Main Application File
 *
 * Use for bootstrapping large application
 * or just fill it with JS on small projects
 *
 */

import 'scss/_base.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/counter/counter';

import './base/plugins';

ReactDOM.render(<Counter />, document.getElementById('app-root'));