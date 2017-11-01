<template>
    <transition
        appear
        :css="false"
        @enter="onEnter"
        @afterEnter="onAfterEnter"
        @beforeLeave="onBeforeLeave"
        @leave="onLeave"
    >
        <section v-swipe.down="swipeDownHandler" v-show="active" :class="[$style.root, { [$style.isAppLoaded]: isAppLoaded }]" :id="pageName">

            <div :class="$style.pic" ref="pic">
                <Avatar :src="picture" :class="$style.avatar" />
            </div>
            <div :class="$style.body" ref="body">

                <h2 :class="$style.headline" ref="title">こんにちは！</h2>
                <article :class="$style.text" ref="table">
                    <p>My name is <strong>Marco Solazzi</strong></p>
                    <p>I am a 37yo <strong>Frontend Web Developer</strong>, technical <strong>writer</strong> and <strong>speaker</strong> from Verona (Italy). I speak Italian (of course), English, French and some Japanese.</p>
                    <p>Since 2014 I am co-founder and host of the <strong><a href="http://www.fevr.it" target="_blank" rel="noopener noreferrer">FEVR Frontenders Meetup</a></strong> .</p>
                </article>
                <footer :class="$style.footer" ref="footer">
                    <SocialList :items="socials" :class="$style.socialList" />
                </footer>
            </div>
            <a :href="`#${NAV_PATH_JOBS}`" @click.prevent="gotoPagelist" :class="$style.scrollhint" ref="scrollhint">
                <div>Get to know me</div>
                <Ico :class="$style.scrollhintIco" name="chevron-down" />
            </a>
        </section>
        </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import debounce from 'lodash/debounce';
import anime from 'animejs';
import { NAV_PATH_HOME, NAV_PATH_JOBS, GROUP_COVER } from '@/shared/constants';
import picture from 'images/marco.jpg';
import Avatar from '@/objects/Avatar';
import Ico from '@/objects/Ico';
import SocialList from '@/objects/SocialList';
import { TYPES as UI_ACTIONS } from '@/store/ui.actions';

export default {

    components: {
        Avatar,
        Ico,
        SocialList
    },

    data() {
        return {
            pageName: NAV_PATH_HOME,
            NAV_PATH_JOBS,
            picture,
            firstEnter: true
        };
    },

    computed: {

        ...mapState({
            socials: (state) => state.data.socials,
            activeGroup: (state) => state.ui.activeGroup,
            activeNav: (state) => state.ui.activeNav,
            isAppLoaded: (state) => state.ui.isLoaded
        }),

        active() {
            return this.activeGroup === GROUP_COVER;
        }
    },

    created() {
        this.debouncedWheelListener = debounce(this.wheelListener, 150);
    },

    mounted() {
        this.firstEnter = !this.isAppLoaded;
    },

    beforeDestroy() {
        window.removeEventListener('wheel', this.debouncedWheelListener);
    },

    methods: {

        ...mapActions('ui', {
            navigateToAction: UI_ACTIONS.NAVIGATED_TO,
            scrollCompleted: UI_ACTIONS.PAGELISTSCROLL_COMPLETED
        }),

        gotoPagelist() {
            this.navigateToAction({ route: NAV_PATH_JOBS, force: true });
            this.$nextTick(() => {
                this.scrollCompleted();
            });
        },

        swipeDownHandler() {

            if (this.activeNav || this.$mq.matchesUntil('tablet')) {
                return;
            }

            this.gotoPagelist();

        },

        wheelListener(e) {

            if (this.activeNav || this.$mq.matchesUntil('tablet')) {
                return;
            }

            if (e.deltaY > 0) {
                e.preventDefault();
                this.gotoPagelist();
            }
        },

        onEnter(el, done) {

            const { pic, body, scrollhint } = this.$refs;


            if (this.firstEnter === true) {

                this.$nextTick(() => {
                    this.firstEnter = false;
                });

                const timeline = anime.timeline({
                    autoplay: false,
                    easing: 'easeOutSine'
                });

                timeline.add({
                    targets: [pic, body],
                    opacity: [0, 1],
                    translateX: (elm) => [(elm === pic ? '15%' : '7%'), 0],
                    duration: 400,
                    delay: 350,
                    complete: done
                }).add({
                    targets: scrollhint,
                    opacity: 0.8,
                    translateX: ['-50%', '-50%'],
                    translateY: ['-10%', 0],
                    duration: 500,
                    delay: 3250 // 4000 - 350 - 400
                }).play();

            } else {

                if (this.timeline) {
                    this.timeline.pause();
                    this.timeline.seek(0);
                }

                anime({
                    targets: el,
                    opacity: {
                        value: 1,
                        duration: 0
                    },
                    translateY: [-100, 0],
                    duration: 800,
                    easing: 'easeInOutCirc',
                    complete: done
                });

            }
        },

        onAfterEnter() {
            window.addEventListener('wheel', this.debouncedWheelListener);
        },

        onBeforeLeave() {
            window.removeEventListener('wheel', this.debouncedWheelListener);
        },

        onLeave(el, done) {

            const {
                pic, scrollhint, title, table, footer
            } = this.$refs;

            const timeline = anime.timeline({
                complete: done,
                autoplay: false,
                easing: 'easeInOutCubic'
            });

            this.timeline = timeline;


            if (this.firstEnter === false) {

                timeline.add([{
                    targets: [pic, scrollhint],
                    opacity: [1, 0],
                    duration: 300
                }, {
                    targets: title,
                    translateY: '-300%',
                    opacity: 0,
                    duration: 500,
                    offset: '+=350'
                }, {
                    targets: table,
                    translateY: '-200%',
                    opacity: 0,
                    duration: 500,
                    offset: '-=300'
                }, {
                    targets: footer,
                    translateY: '-200%',
                    opacity: 0,
                    duration: 500,
                    offset: '-=300'
                }, {
                    targets: el,
                    translateY: '-100%',
                    duration: 700
                }, {
                    targets: el,
                    opacity: 0,
                    duration: 200
                }]).play();
            }
        }
    }
};
</script>

<style lang="scss" module src="./cover.scss" />