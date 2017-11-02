<template>
    <transition
        appear
        name="pagelist-slide"
        appear-class="pagelist-slide-appear"
        appear-active-class="pagelist-slide-appear-active"
        @afterEnter="onAfterEnter"
        @beforeLeave="onBeforeLeave"
    >
        <section v-swipe.up="swipeUpHandler" v-show="active" :class="[$style.root, { [$style.isActive]: active }]">
            <SmoothScrollbar
                @scroll="onScroll"
                ref="smoothScroll"
                :options="{ alwaysShowTracks: true }"
                :active="$mq.matches('tabletLandscape')"
            >
                <div>
                    <slot />
                    <footer role="contentinfo" :class="$style.footer">
                        &copy; {{ fullYear }} Marco Solazzi - <a href="https://github.com/dwightjack/marco.solazzi.me/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">license</a> <a href="https://github.com/dwightjack/marco.solazzi.me" target="_blank" rel="noopener noreferrer">source</a>
                    </footer>
                </div>
            </SmoothScrollbar>
        </section>
    </transition>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import debounce from 'lodash/debounce';

import SmoothScrollbar from '@/components/SmoothScrollbar';
import { GROUP_PAGELIST, NAV_PATH_HOME, GROUP_LOADER } from '@/shared/constants';
import { TYPES as UI_ACTIONS } from '@/store/ui.actions';

const easing = (t) => (t - 1) ** 3 + 1; //eslint-disable-line

export default {

    components: {
        SmoothScrollbar
    },

    computed: {

        ...mapState('ui', ['activeGroup', 'scrollTarget', 'pagelistScroll']),

        active() {
            if (this.$mq.matchesUntil('tablet') === true) {
                return this.activeGroup && this.activeGroup !== GROUP_LOADER;
            }
            return this.activeGroup === GROUP_PAGELIST;
        }
    },

    created() {
        this.debouncedWheelListener = debounce(this.wheelListener, 50);
        this.fullYear = new Date().getFullYear();
    },

    beforeDestroy() {
        window.removeEventListener('wheel', this.debouncedWheelListener);
    },

    watch: {
        scrollTarget(id) {
            if (id) {
                const { scrollbar } = this.$refs.smoothScroll;
                scrollbar.update();
                this.$nextTick(() => {
                    //scrollbar.scrollIntoView(document.getElementById(id));
                    this.scrollTo(id)
                        .then(this.completeScrollRequest)
                        .catch(this.completeScrollRequest);
                });
            }
        }
    },

    methods: {

        ...mapActions('ui', {
            updatePagelistscrollAction: UI_ACTIONS.PAGELISTSCROLL_UPDATED,
            navigateToAction: UI_ACTIONS.NAVIGATED_TO,
            completeScrollRequest: UI_ACTIONS.PAGELISTSCROLL_COMPLETED
        }),

        onAfterEnter() {
            window.addEventListener('wheel', this.debouncedWheelListener);

        },

        onBeforeLeave() {
            window.removeEventListener('wheel', this.debouncedWheelListener);
        },

        scrollTo(id) {

            if (typeof id === 'string' && id.length > 0) {
                const el = document.getElementById(id);

                if (el === undefined) {
                    return Promise.reject(new TypeError(`Unable to find element with id "${id}"`));
                }

                const { scrollbar } = this.$refs.smoothScroll;
                const { offset } = scrollbar;
                const { top } = el.getBoundingClientRect();
                const rootTop = this.$el.getBoundingClientRect().top;

                return new Promise((callback) => {
                    scrollbar.scrollTo(
                        offset.x,
                        offset.y + (top - rootTop),
                        1000,
                        { easing, callback }
                    );
                });

            }

            return Promise.reject(new TypeError(`Invalid element id: ${id}`));


        },

        wheelListener(e) {


            if (this.activeNav || this.$mq.matchesUntil('tablet')) {
                return;
            }

            if (e.deltaY < 0 && this.activeGroup === GROUP_PAGELIST && this.pagelistScroll <= 0) {
                e.preventDefault();
                this.navigateToAction({ route: NAV_PATH_HOME });
            }
        },

        swipeUpHandler() {

            if (this.activeNav || this.$mq.matchesUntil('tablet')) {
                return;
            }

            if (this.activeGroup === GROUP_PAGELIST && this.pagelistScroll <= 0) {
                this.navigateToAction({ route: NAV_PATH_HOME });
            }
        },

        onScroll({ offset }) {
            const { y = 0 } = offset;
            this.updatePagelistscrollAction(y);
        }
    }
};
</script>


<style lang="scss" module src="./page-list.scss" />