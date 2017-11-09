<template>
    <transition
        appear
        name="pagelist-slide"
        appear-class="pagelist-slide-appear"
        appear-active-class="pagelist-slide-appear-active"
        @afterEnter="onAfterEnter"
        @beforeLeave="onBeforeLeave"
    >
        <section @wheel="wheelListener" v-swipe.up="swipeUpHandler" v-show="active" :class="[$style.root, { [$style.isActive]: active }]">
            <SmoothScrollbar
                @scroll="onScroll"
                ref="smoothScroll"
                tagName="div"
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
import anime from 'animejs';

import SmoothScrollbar from '@/components/SmoothScrollbar';
import { GROUP_PAGELIST, NAV_PATH_HOME, GROUP_LOADER } from '@/shared/constants';
import { TYPES as UI_ACTIONS } from '@/store/ui.actions';

const easing = (t) => (t - 1) ** 3 + 1; //eslint-disable-line

export default {

    components: {
        SmoothScrollbar
    },

    data() {
        return {
            canScroll: false
        };
    },

    computed: {

        ...mapState('ui', ['activeGroup', 'forcedScroll', 'pagelistScroll', 'route']),

        active() {
            if (this.$mq.matches('tablet-landscape')) {
                return this.activeGroup === GROUP_PAGELIST;
            }
            return this.activeGroup && this.activeGroup !== GROUP_LOADER;
        }
    },

    created() {
        this.fullYear = new Date().getFullYear();
    },

    watch: {
        forcedScroll(scroll) {
            if (scroll === true && this.route) {
                const { scrollbar } = this.$refs.smoothScroll;
                if (scrollbar) {
                    scrollbar.update();
                }
                this.$nextTick(() => {
                    this.scrollTo(this.route, this.completeScrollRequest);
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
            this.canScroll = true;
        },

        onBeforeLeave() {
            this.canScroll = false;
        },

        scrollTo(id, callback) {

            if (typeof id === 'string' && id.length > 0) {
                const el = document.getElementById(id);

                if (el === undefined) {
                    throw new TypeError(`Unable to find element with id "${id}"`);
                }

                const { scrollbar } = this.$refs.smoothScroll;

                if (scrollbar) {
                    const { offset } = scrollbar;
                    const { top } = el.getBoundingClientRect();
                    const rootTop = this.$el.getBoundingClientRect().top;

                    scrollbar.scrollTo(
                        offset.x,
                        offset.y + (top - rootTop),
                        1000,
                        { easing, callback }
                    );
                } else {
                    const tl = anime.timeline({
                        targets: this.$el,
                        autoplay: false,
                        easing: 'easeOutQuad'
                    });

                    tl.add([{
                        opacity: [1, 0],
                        duration: 300,
                        complete: () => el.scrollIntoView()
                    }, {
                        opacity: [0, 1],
                        duration: 300,
                        delay: 200
                    }]);

                    tl.complete = callback;

                    tl.play();
                }

            }

        },

        wheelListener(e) {


            if (this.canScroll === false || this.activeNav || this.$mq.matchesUntil('tablet-landscape')) {
                return;
            }

            if (e.deltaY < 0 && this.activeGroup === GROUP_PAGELIST && this.pagelistScroll <= 0) {
                e.preventDefault();
                this.navigateToAction({ route: NAV_PATH_HOME });
            }
        },

        swipeUpHandler() {

            if (this.activeNav || this.$mq.matchesUntil('tablet-landscape')) {
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