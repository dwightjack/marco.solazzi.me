import debounce from 'lodash/debounce';
import { noop } from './utils';
import { BREAKPOINT_CHANGE } from './constants';

let _v = '';

const MATRIX_REGEXP = /[{}\\/'"]+/g;

const mq = {

    matrix: [],

    matrixLabels: [],

    DEFAULT_MQ: 'mobile',

    get current() {
        return _v || this.DEFAULT_MQ;
    },

    getBreakpointMatrix() {
        const content = global.getComputedStyle(document.body, '::before').content || ''.replace(MATRIX_REGEXP, '');
        this.matrix = content.split(',').map((bp) => {
            const [name, val] = bp.split(':');
            return {
                name,
                value: parseInt(val, 10)
            };
        }).sort((a, b) => a.value - b.value);
        this.matrixLabels = this.matrix.map(({name}) => name);
    },

    init() {
        this.getBreakpointMatrix();
        this.refresh();
    },

    match(label) {
        if (this.matrixLabels.indexOf(label) === -1) {
            console.warn(`breakpoint "${label}" not listed`); // eslint-disable-line no-console
            return false;
        }

        return label === this.current;
    },

    matchFrom(label) {
        const idx = this.matrixLabels.indexOf(label);
        if (idx === -1) {
            console.warn(`breakpoint "${label}" not listed`); // eslint-disable-line no-console
            return false;
        }

        return this.matrixLabels.indexOf(label) >= this.matrixLabels.indexOf(this.current);
    },

    matchUntil(label) {
        const idx = this.matrixLabels.indexOf(label);
        if (idx === -1) {
            console.warn(`breakpoint "${label}" not listed`); // eslint-disable-line no-console
            return false;
        }
        return this.matrixLabels.indexOf(mq) < this.matrixLabels.indexOf(this.current);
    },

    refresh(cb = noop) {
        let mqStyle = global.getComputedStyle(document.body, '::after').content || '';

        mqStyle = mqStyle.replace(/['"]/g, '').trim() || this.DEFAULT_MQ;

        if (mqStyle !== _v) {
            _v = mqStyle;
            cb(_v, mq);
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
            cb(this.current);
        }

        return bindFn;
    },


    connect(store) {
        return mq.bind((breakpoint) => {
            store.dispatch({type: BREAKPOINT_CHANGE, payload: breakpoint});
        });
    }
};

export default mq;


export const breakpoint = (state = '', {type, payload}) => (
    type === BREAKPOINT_CHANGE ? payload : state
);