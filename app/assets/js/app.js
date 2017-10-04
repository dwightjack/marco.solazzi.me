/**
 * Main Application File
 */

//import 'babel-polyfill';
import 'what-input';

import Vue from 'vue';
import Root from '@/containers/Root';
import store from '@/store';

import mq from '@/shared/mq';
import breakpoints from 'styles/_mq.scss';

Vue.use(mq, { breakpoints, ssr: 'desktop' });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    store,
    el: '#app-root',
    render: h => h(Root)
});