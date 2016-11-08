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

    constuctor() {
        this.current = '';
        this.previous = null;
    }

    listen(callback) {
        window.addEventListener('hashchange', (e) => {
            e.preventDefault();
            callback(window.location.hash, this.previous);
        });
    }

    go(hash) {
        if (!(typeof hash === 'string')) {
            return;
        }

        const normalizedHash = hash.trim();
        if (paths.indexOf(hash) === -1) {
            return;
        }
        this.previous = this.current;
        this.current = normalizedHash;
        window.location.hash = normalizedHash;
    }

}