const noop = () => {};

function serverMatchMedia(breakpoints, key, defaultKey) {

    const matches = key === defaultKey;

    return {
        media: `(min-width: ${breakpoints[key]}px)`,
        get matches() {
            return matches;
        },
        addListener: noop,
        removeListener: noop
    };
}

const toCamelCase = (str) => str.replace(/[-]{1,}(.)/g, (_, l) => l.toUpperCase());

const clientMatchMedia = (breakpoints, key) => global.matchMedia(`(min-width: ${breakpoints[key]}px)`);

const matcher = (ctx, fn) => (breakpoint) => {
    const { keys } = ctx; //eslint-disable-line no-shadow
    if (ctx.currentIdx === null) {
        return false;
    }
    return fn(keys.indexOf(toCamelCase(breakpoint)), ctx.currentIdx);
};

export default {
    install(Vue, options = {}) {

        const { breakpoints, ssr = '' } = options;

        if (!breakpoints) {
            throw new Error('You should provide some breakpoints');
        }

        const keys = Object.keys(options.breakpoints)
            .filter((k) => k.indexOf('-') === -1)
            .sort((a, b) => parseInt(breakpoints[a], 10) - parseInt(breakpoints[b], 10));

        const $mq = new Vue({

            computed: {
                currentIdx() {
                    const idx = this.keys.indexOf(this.current);
                    return idx !== -1 ? idx : null;
                }
            },


            data: {
                keys,
                current: ''
            },

            created() {

                const matchMedia = this.$isServer ? serverMatchMedia : clientMatchMedia;

                this.queries = this.keys.reduce((queries, key) => {
                    const mql = matchMedia(breakpoints, key, ssr);

                    mql.addListener(this.computeCurrent);

                    Object.defineProperty(this, key, {
                        enumerable: true,
                        get() {
                            return mql.matches;
                        }
                    });

                    queries[key] = mql; //eslint-disable-line no-param-reassign

                    return queries;

                }, {});

                if (this.$isServer) {
                    this.current = ssr;
                } else {
                    this.computeCurrent();

                }

                this.matches = matcher(this, (a, b) => a <= b);
                this.matchesExact = matcher(this, (a, b) => a === b);
                this.matchesUntil = matcher(this, (a, b) => a > b);

            },

            methods: {
                computeCurrent() {
                    const { keys } = this; //eslint-disable-line no-shadow

                    for (let i = keys.length - 1; i >= 0; i -= 1) {

                        if (this[keys[i]] === true) {
                            this.current = keys[i];
                            return;
                        }
                    }
                    this.current = '';
                }
            }
        });

        Object.defineProperty(Vue.prototype, '$mq', {
            enumerable: false,
            writable: false,
            value: $mq
        });

    }
};