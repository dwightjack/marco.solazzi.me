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

if (__PRODUCTION__ === false) {
    if (module.hot) {
        // accept actions and mutations as hot modules
        module.hot.accept(['./data.module', './ui.module'], () => {
            const newData = require('./data.module').default; // eslint-disable-line no-shadow, global-require
            const newUi = require('./ui.module').default; // eslint-disable-line no-shadow, global-require
            store.hotUpdate({
                modules: {
                    ui: newUi,
                    data: newData
                }
            });
        });
    }
}


export default store;