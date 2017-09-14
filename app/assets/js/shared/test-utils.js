import Vue from 'vue';
import idObj from 'identity-obj-proxy'; //eslint-disable-line import/no-extraneous-dependencies

export const mount = (Component) => { //eslint-disable-line import/prefer-default-export
    const Constructor = Vue.extend(Component);
    Constructor.prototype.$style = idObj;
    return new Constructor().$mount();
};