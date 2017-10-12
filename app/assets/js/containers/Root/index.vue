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
        </Wrapper>
    </Swipe>
</template>

<script>
//import debounce from 'lodash/debounce';
import { mapState, mapActions } from 'vuex';
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
    //NAV_PATH_JOBS,
    NAV_PATH_HOME//,
    //GROUP_COVER,
    //GROUP_PAGELIST,
} from '@/shared/constants';
import { TYPES as UI_ACTIONS } from '@/store/ui.actions';

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
        ...mapState('ui', ['activeGroup', 'isLoaded', 'activeNav', 'pagelistScroll', 'route'])
    },

    // mounted() {
    //     this.debouncedListener = debounce(this.setWheelListener, 150);

    //     this.$watch('isLoaded', (isLoaded) => {
    //         if (isLoaded === true) {
    //             this.$nextTick(() => {
    //                 window.addEventListener('wheel', this.debouncedListener);
    //             });
    //         }
    //     });
    // },

    // beforeDestroy() {
    //     if (this.debouncedListener) {
    //         window.removeEventListener('wheel', this.debouncedListener);
    //     }
    // },

    watch: {
        route(route) {
            //side effect!
            if (!this.$isServer) {
                global.history.pushState(null, null, `#!${route}`);
            }
        }
    },

    mounted() {
        if (!this.$isServer) {
            global.addEventListener('popstate', this.onPopstate);
        }
    },

    beforeDestroy() {
        global.removeEventListener('popstate', this.onPopstate);
    },

    methods: {

        ...mapActions('ui', {
            navigateToAction: UI_ACTIONS.NAVIGATED_TO,
            toggleAppLoadAction: UI_ACTIONS.APP_LOADED
        }),

        loadFinish() {
            this.toggleAppLoadAction(true);
            this.navigateToAction({ route: NAV_PATH_HOME });
        },

        onPopstate() {
            const route = global.location.hash.replace(/#!([a-z-_]+?)$/, '$1');
            this.navigateToAction({ route, force: true });
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
        }//,

        // setWheelListener(e) {
        //     //const { router } = this.props;

        //     if (this.activeNav || this.$mq.matchesUntil('tablet')) {
        //         return;
        //     }

        //     if (e.deltaY > 0 && this.activeGroup === GROUP_COVER) {
        //         e.preventDefault();
        //         this.navigateToAction({ route: NAV_PATH_JOBS, force: true, unblock: true });
        //     } else if (e.deltaY < 0 && this.activeGroup === GROUP_PAGELIST && this.pagelistScroll <= 0) {
        //         e.preventDefault();
        //         this.navigateToAction({ route: NAV_PATH_HOME });
        //     }
        // }
    }
};

</script>

<style lang="scss" module>
</style>