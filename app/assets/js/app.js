/**
 * Main Application File
 */

//import 'babel-polyfill';
import 'what-input';

import Vue from 'vue';
import Root from '@/containers/Root';
import store from '@/store';

import mq from '@/shared/mq';
import swipe from '@/directives/swipe';
import breakpoints from 'styles/_breakpoints.scss';

Vue.use(mq, { breakpoints: { none: 0, ...breakpoints }, ssr: 'desktop' });

Vue.directive('swipe', swipe);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    store,
    el: '#app-root',
    render: h => h(Root)
});