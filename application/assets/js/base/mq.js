import debounce from 'lodash/debounce';
import { noop } from './utils';

let _v = 'mobile';

const mq = {

    getValue() {
        return _v;
    },

    refresh(cb = noop) {
        let mqStyle = global.getComputedStyle(document.body, '::after').content || '';

        mqStyle = mqStyle.replace(/['"]/g, '').trim() || 'mobile';

        if (mqStyle !== _v) {
            _v = mqStyle;
            cb(_v);
        }
    },

    bind(cb, immediate = false) {
        const bindFn = debounce(function _bindFn() { mq.refresh(cb); }, 100); //eslint-disable-line prefer-arrow-callback

        bindFn.cancel = () => {
            window.removeEventListener('resize', bindFn);
            window.removeEventListener('load', bindFn);
            window.removeEventListener('orientationchange', bindFn);
        };

        window.addEventListener('resize', bindFn);
        window.addEventListener('load', bindFn);
        window.addEventListener('orientationchange', bindFn);

        if (immediate === true) {
            this.refresh();
            cb(this.getValue());
        }

        return bindFn;
    }
};

export default mq;