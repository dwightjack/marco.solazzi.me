import Scrollbar from 'smooth-scrollbar';
import VueTypes from 'vue-types';
import 'style-loader!css-loader!smooth-scrollbar/dist/smooth-scrollbar.css'; //eslint-disable-line import/no-webpack-loader-syntax

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

    methods: {
        attach() {
            const el = this.$el || this.$slots.default[0].elm;
            this.scrollbar = Scrollbar.init(el, this.options);
            this.scrollbar.addListener((status) => this.$emit('scroll', status));
        }
    },

    destroyed() {
        this.scrollbar.destroy();
    }
};