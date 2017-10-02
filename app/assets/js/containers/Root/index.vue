<template>
    <Swipe :onSwipe="onSwipe">
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
            <BgPattern :active="isIntro === false" />
            </transition>
        </Wrapper>
    </Swipe>
</template>

<script>
import { mapState } from 'vuex';
import Jobs from '@/containers/Jobs';
import Education from '@/containers/Education';
import Skills from '@/containers/Skills';
import Portfolio from '@/containers/Portfolio';
import Contacts from '@/containers/Contacts';
import Cover from '@/containers/Cover';
import Navigation from '@/containers/Navigation';
import Swipe from '@/components/Swipe';
import Wrapper from '@/components/Wrapper';
import PageList from '@/components/PageList';
import BgPattern from '@/objects/BgPattern';
import routes from '@/shared/routes';
import {
    GROUP_INTRO
} from '@/shared/constants';

export default {

    data() {
        return {
            routes
        };
    },

    components: {
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

    computed: {

        ...mapState(['activeGroup']),

        isIntro() {
            return this.activeGroup === GROUP_INTRO;
        }
    },

    methods: {
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
        }
    }
};

</script>

<style lang="scss" module>
</style>