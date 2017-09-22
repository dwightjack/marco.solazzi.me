export default {
    install(Vue, options = {}) {

        const { breakpoints } = options;

        if (!breakpoints) {
            throw new Error('You should provide some breakpoints');
        }

        const keys = Object.keys(options.breakpoints)
            .filter((k) => k.indexOf('-') === -1)
            .sort((a, b) => parseInt(breakpoints[a], 10) - parseInt(breakpoints[b], 10));

        const $mq = new Vue({
            data: {
                keys,
                current: ''
            },

            created() {
                this.queries = this.keys.reduce((queries, key) => {
                    const mql = global.matchMedia(`(min-width: ${breakpoints[key]}px)`);

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

                this.computeCurrent();

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
                },

                matches(breakpoint) {
                    const { keys } = this; //eslint-disable-line no-shadow
                    return keys.indexOf(breakpoint) <= keys.indexOf(this.current);
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