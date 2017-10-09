import Vue from 'vue';
import Vuex from 'vuex';
import data from './data.module';
import ui from './ui.module';

Vue.use(Vuex);

const store = new Vuex.Store({

    strict: process.env.NODE_ENV !== 'production',

    modules: {
        ui,
        data
    }

});

export default store;