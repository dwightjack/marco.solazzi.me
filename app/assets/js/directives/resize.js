function isServer(vnode) {
    return typeof vnode.componentInstance !== 'undefined' && vnode.componentInstance.$isServer;
}

export default {

    name: 'v-resize',

    bind(el, { value }, vnode) {

        if (el.__resize || isServer(vnode)) {
            return;
        }

        el.__resize = value; //eslint-disable-line no-param-reassign

        window.addEventListener('resize', value, false);
        window.addEventListener('orientationchange', value, false);
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