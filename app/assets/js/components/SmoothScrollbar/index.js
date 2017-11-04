import Scrollbar from 'smooth-scrollbar';
import VueTypes from 'vue-types';

export default {

    props: {
        options: VueTypes.object,
        tagName: String,
        active: VueTypes.bool
    },

    render(h) {
        if (this.tagName) return h(this.tagName, this.$slots.default);
        return this.$slots.default[0];
    },

    watch: {
        active(active) {
            this.$nextTick(active ? this.attach : this.destroy);
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
            if (!this.scrollbar) {
                const el = this.$el || this.$slots.default[0].elm;
                this.scrollbar = Scrollbar.init(el, this.options);
                this.scrollbar.addListener((status) => this.$emit('scroll', status));
            } else {
                this.scrollbar.update();
            }
        },

        destroy() {
            if (this.scrollbar) {
                this.scrollbar.destroy();
                this.scrollbar = null;
            }
        }
    }
};