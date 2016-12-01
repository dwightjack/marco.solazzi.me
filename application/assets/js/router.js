import {
    NAV_PATH_HOME,
    NAV_PATH_JOBS,
    NAV_PATH_EDUCATION,
    NAV_PATH_SKILLS,
    NAV_PATH_PORTFOLIO
} from './base/constants';

const paths = [
    NAV_PATH_HOME,
    NAV_PATH_JOBS,
    NAV_PATH_EDUCATION,
    NAV_PATH_SKILLS,
    NAV_PATH_PORTFOLIO
];

export default class Router {

    constructor(options = {}) {
        this.current = '';
        this.previous = null;

        this._listeners = [];
        this.options = Object.assign({init: true, hash: ''}, options);

        if (this.options.init === true) {
            this.init(this.options.hash);
        }

    }

    init(hash = '') {
        this.setCurrent(hash);
        window.addEventListener('hashchange', (e) => {
            e.preventDefault();
            if (this.setCurrent(window.location.hash)) {
                this._listeners.forEach((callback) => {
                    callback(this.current, this.previous);
                });
            }
        });
    }

    listen(callback) {
        const idx = this._listeners.findIndex((cb) => cb === callback);
        if (idx === -1) {
            this._listeners.push(callback);
        }
    }

    removeListener(callback) {
        const idx = this._listeners.findIndex((cb) => cb === callback);
        if (idx !== -1) {
            this._listeners.splice(idx, 1);
        }
    }

    setCurrent(hash) {
        const normalizedHash = this.checkHash(hash);

        if (normalizedHash === false || normalizedHash === this.current) {
            return false;
        }

        this.previous = this.current;
        this.current = normalizedHash;
        return true;
    }

    checkHash(hash) { //eslint-disable-line class-methods-use-this
        if (!(typeof hash === 'string')) {
            return false;
        }

        const normalizedHash = hash.trim();
        if (paths.indexOf(hash) === -1) {
            return false;
        }

        return normalizedHash;
    }

    go(hash, conf = {silent: false, force: false}) {

        const normalizedHash = this.checkHash(hash);

        if (normalizedHash === false) {
            return;
        }

        if (conf.silent === false) {
            window.location.hash = normalizedHash;
        } else {
            this.setCurrent(normalizedHash);
            history.replaceState(null, null, normalizedHash);
        }
        //force listeners
        if (conf.force === true) {
            this._listeners.forEach((callback) => {
                callback(this.current, this.previous);
            });
        }
    }

}