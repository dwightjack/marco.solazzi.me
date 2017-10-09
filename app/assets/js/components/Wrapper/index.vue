<template>
    <main role="main" :class="$style.root" @scroll="onScroll">
        <slot />
        <slot name="pagelist" />
    </main>
</template>

<script>
import VueTypes from 'vue-types';
import { mapState } from 'vuex';

export default {

    props: {
        onPageChange: VueTypes.func
    },

    computed: {

        ...mapState({
            currentPage: (state) => state.ui.route
        }),

        pages() {
            const windowHeightOffset = parseInt(window.innerHeight * 0.25, 10);
            const { pagelist } = this.$slots;

            return pagelist[0].$children.map((vm) => ({
                offsetTop: vm.$el.offsetTop - windowHeightOffset,
                route: vm.$el.pageName,
                el: vm.$el
            })).reverse();
        }
    },

    watch: {
        currentPage(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.onPageChange(newVal, true);
            }
        }
    },

    methods: {
        onScroll(e) {
            if (this.$mq.matches('tablet')) {
                const { scrollTop } = e.target;
                this.pages.some(({ offsetTop, route }) => {
                    if (offsetTop < scrollTop) {
                        this.currentPage = route;
                        return true;
                    }
                    return false;
                });
            }
        }
    }
};
</script>

<style lang="scss" module src="./wrapper.scss" />