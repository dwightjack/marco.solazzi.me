<template>
    <Swipe :onSwipe="onSwipe">
        <Loader :active="!isLoaded" @loader-end="loadFinish" :assetLoaded="true" />
        <Navigation :paths="routes" />
        <Wrapper>
            <Cover />
            <PageList slot="pagelist">
                <Jobs />
                <Education />
                <Skills />
                <Portfolio />
                <Contacts />
            </PageList>
            <BgPattern :active="isLoaded" />
            </transition>
        </Wrapper>
    </Swipe>
</template>

<script>
import debounce from 'lodash/debounce';
import { mapState, mapGetters, mapActions } from 'vuex';
import Jobs from '@/containers/Jobs';
import Education from '@/containers/Education';
import Skills from '@/containers/Skills';
import Portfolio from '@/containers/Portfolio';
import Contacts from '@/containers/Contacts';
import Cover from '@/containers/Cover';
import Navigation from '@/containers/Navigation';
import PageList from '@/containers/PageList';
import Swipe from '@/components/Swipe';
import Loader from '@/components/Loader';
import Wrapper from '@/components/Wrapper';
import BgPattern from '@/objects/BgPattern';
import routes from '@/shared/routes';
import {
    NAV_PATH_JOBS,
    NAV_PATH_HOME,
    GROUP_COVER,
    GROUP_PAGELIST,
    APP_NAVIGATE_ACTION,
    APP_LOADED_ACTION
} from '@/shared/constants';

export default {

    components: {
        Loader,
        Cover,
        Jobs,
        Skills,
        Education,
        Portfolio,
        Contacts,
        Swipe,
        Navigation,
        Wrapper,
        PageList,
        BgPattern
    },

    data() {
        return {
            routes
        };
    },

    computed: {

        ...mapState(['activeGroup', 'isLoaded'])
    },

    mounted() {
        this.debouncedListener = debounce(this.setWheelListener, 150);

        this.$watch('isLoaded', (isLoaded) => {
            if (isLoaded === true) {
                this.$nextTick(() => {
                    window.addEventListener('wheel', this.debouncedListener);
                });
            }
        });
    },

    beforeDestroy() {
        if (this.debouncedListener) {
            window.removeEventListener('wheel', this.debouncedListener);
        }
    },

    methods: {

        ...mapActions({
            routeTo: APP_NAVIGATE_ACTION,
            toggleLoaded: APP_LOADED_ACTION
        }),

        loadFinish() {
            this.toggleLoaded(true);
            this.routeTo(NAV_PATH_HOME);
        },

        onSwipe(direction) {
            console.log(direction); //eslint-disable-line no-console
            // const { activeNav, activeGroup, pagelistScroll, breakpoint, router } = this.props;


            // if (!Modernizr.touchevents || activeGroup === 'intro') {
            //     return;
            // }

            // if (activeNav || breakpoint === 'mobile' || breakpoint === 'tablet') {
            //     return;
            // }

            // if (direction === 'down' && activeGroup === 'cover') {
            //     router.go(NAV_PATH_JOBS);
            // } else if (direction === 'up' && activeGroup === 'pagelist' && pagelistScroll <= 0) {
            //     router.go(NAV_PATH_HOME);
            // }
        },

        setWheelListener(e) {
            //const { router } = this.props;

            const { activeNav, activeGroup, pagelistScroll } = this.$store.state;
            if (activeNav || this.$mq.matchesUntil('tablet')) {
                return;
            }

            if (e.deltaY > 0 && activeGroup === GROUP_COVER) {
                e.preventDefault();
                this.routeTo(NAV_PATH_JOBS);
            } else if (e.deltaY < 0 && activeGroup === GROUP_PAGELIST && pagelistScroll <= 0) {
                e.preventDefault();
                this.routeTo(NAV_PATH_HOME);
            }
        }
    }
};

</script>

<style lang="scss" module>
</style>