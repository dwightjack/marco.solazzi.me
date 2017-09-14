/**
 * Main Application File
 */

//import 'babel-polyfill';
import 'what-input';

import Vue from 'vue';
import Root from '@/containers/Root';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app-root',
    render: h => h(Root)
});