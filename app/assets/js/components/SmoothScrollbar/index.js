import Scrollbar from 'smooth-scrollbar';
import VueTypes from 'vue-types';

export default {

    props: {
        options: VueTypes.object,
        tag: String,
        active: VueTypes.bool
    },

    render(h) {
        if (this.tag) { return h(this.tag, this.$slots.default); }
        return this.$slots.default[0];
    },

    watch: {
        active(v) {
            if (v) {
                this.$nextTick(this.attach);
            } else {
                this.scrollbar && this.scrollbar.destroy(); //eslint-disable-line no-unused-expressions
            }
        }
    },

    mounted() {
        if (this.active) {
            this.$nextTick(this.attach);
        }
    },

    beforeDestroy() {
        this.destroy();
    },

    methods: {
        attach() {
            const el = this.$el || this.$slots.default[0].elm;
            this.destroy();
            this.scrollbar = Scrollbar.init(el, this.options);
            this.scrollbar.addListener((status) => this.$emit('scroll', status));

        },

        destroy() {
            if (this.scrollbar) {
                const el = this.$el || this.$slots.default[0].elm;
                this.scrollbar.destroy();
                this.scrollbar = null;
                el.removeAttribute('data-scrollbar');
            }
        }
    }
};