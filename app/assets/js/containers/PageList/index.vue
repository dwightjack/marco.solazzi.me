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
                ref="smoothScroll"
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
import { mapActions, mapState } from 'vuex';
import SmoothScrollbar from '@/components/SmoothScrollbar';
import { GROUP_PAGELIST } from '@/shared/constants';
import { TYPES as UI_ACTIONS } from '@/store/ui.actions';

export default {

    components: {
        SmoothScrollbar
    },

    computed: {

        ...mapState('ui', ['activeGroup', 'scrollTarget']),

        active() {
            return this.activeGroup === GROUP_PAGELIST;
        }
    },

    created() {
        this.fullYear = new Date().getFullYear();
    },

    watch: {
        scrollTarget(id) {
            if (id) {
                const { scrollbar } = this.$refs.smoothScroll;
                scrollbar.update();
                this.$nextTick(() => {
                    scrollbar.scrollIntoView(document.getElementById(id));
                });
            }
        }
    },

    methods: {

        ...mapActions('ui', {
            updatePagelistscrollAction: UI_ACTIONS.PAGELISTSCROLL_UPDATED
        }),

        onScroll({ offset }) {
            const { y = 0 } = offset;
            this.updatePagelistscrollAction(y);
        }
    }
};
</script>


<style lang="scss" module src="./page-list.scss" />