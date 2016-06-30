/**
 * Main Application File
 *
 * Use for bootstrapping large application
 * or just fill it with JS on small projects
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/counter/counter';

ReactDOM.render(<Counter />, document.getElementById('app-root'));