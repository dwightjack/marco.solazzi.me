function isServer(vnode) {
    return typeof vnode.componentInstance !== 'undefined' && vnode.componentInstance.$isServer;
}

export default {

    name: 'v-resize',

    bind(el, { value }, vnode) {

        if (el.__resize || isServer(vnode)) {
            return;
        }

        let print = false;

        const printMQ = window.matchMedia('print');

        printMQ.addListener(({ matches }) => {
            print = matches;
        });

        const resizeHandler = (...args) => {
            if (print === false) {
                value(...args);
            }
        };

        el.__resize = resizeHandler; //eslint-disable-line no-param-reassign

        window.addEventListener('resize', resizeHandler, false);
        window.addEventListener('orientationchange', resizeHandler, false);
    },

    unbind(el, binding, vnode) {
        if (isServer(vnode)) {
            return;
        }

        const resize = el.__resize;
        if (typeof resize === 'function') {
            window.removeEventListener('resize', resize, false);
            window.removeEventListener('orientationchange', resize, false);
            delete el.__resize; //eslint-disable-line no-param-reassign
        }
    }
};