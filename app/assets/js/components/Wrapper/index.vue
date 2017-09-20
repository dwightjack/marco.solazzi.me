<template>
    <main role="main" :class="$style.root" @scroll="onScroll">
        <slot />
    </main>
</template>

<script>
import VueTypes from 'vue-types';

export default {

    data() {
        return {
            currentPage: this.$store.state.route
        };
    },

    props: {
        onPageChange: VueTypes.func
    },

    computed: {

        pages() {
            const windowHeightOffset = parseInt(window.innerHeight * 0.25, 10);

            return this.$children.map((vm) => ({
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
            const { breakpoint } = this.props;
            if (breakpoint === 'tablet' || breakpoint === 'mobile') {
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