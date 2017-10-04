<template>
    <transition
        appear
        name="pagelist-slide"
        appear-class="pagelist-slide-appear"
        appear-active-class="pagelist-slide-appear-active"
    >
        <section v-show="active" :class="[$style.root, { [$style.isActive]: active }]">
            <SmoothScrollbar
                @scroll="onScroll"
                tag="div"
                :options="{ alwaysShowTracks: true }"
                :active="$mq.matches('tabletLandscape')"
            >
                <slot />
                <footer role="contentinfo" :class="$style.footer">
                    &copy; {{ fullYear }} Marco Solazzi - <a href="https://github.com/dwightjack/marco.solazzi.me/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">license</a> <a href="https://github.com/dwightjack/marco.solazzi.me" target="_blank" rel="noopener noreferrer">source</a>
                </footer>
            </SmoothScrollbar>
        </section>
    </transition>
</template>

<script>
import SmoothScrollbar from '@/components/SmoothScrollbar';
import { APP_PAGESCROLL_ACTION, GROUP_PAGELIST } from '@/shared/constants';

export default {

    components: {
        SmoothScrollbar
    },

    computed: {
        active() {
            return this.$store.state.activeGroup === GROUP_PAGELIST;
        }
    },

    created() {
        this.fullYear = new Date().getFullYear();
    },

    methods: {
        onScroll({ offset }) {
            const { y = 0 } = offset;
            this.$store.dispatch(APP_PAGESCROLL_ACTION, y);
        }
    }
};
</script>


<style lang="scss" module src="./page-list.scss" />