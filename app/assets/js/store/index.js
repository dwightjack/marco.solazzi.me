import Vue from 'vue';
import Vuex from 'vuex';

import jobs from '@/database/jobs.json';

Vue.use(Vuex);

const store = new Vuex.Store({

    strict: process.env.NODE_ENV !== 'production',

    state: {
        jobs
    }
});

export default store;