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

    constructor() {
        this.current = '';
        this.previous = null;
        this.setCurrent(window.location.hash);
    }

    listen(callback) {
        window.addEventListener('hashchange', (e) => {
            e.preventDefault();
            if (this.setCurrent(window.location.hash)) {
                callback(this.current, this.previous);
            }
        });
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

    go(hash) {

        const normalizedHash = this.checkHash(hash);

        if (normalizedHash === false) {
            return;
        }

        window.location.hash = normalizedHash;
    }

}