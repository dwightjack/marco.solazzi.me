<template>
    <Swipe :onSwipe="onSwipe">
        <Navigation :paths="routes" />
        <Wrapper>
            <PageList slot="pagelist">
                <Jobs />
                <Education />
                <Skills />
                <Portfolio />
                <Contacts />
            </PageList>
        </Wrapper>
    </Swipe>
</template>

<script>

import Jobs from '@/containers/Jobs';
import Education from '@/containers/Education';
import Skills from '@/containers/Skills';
import Portfolio from '@/containers/Portfolio';
import Contacts from '@/containers/Contacts';
import Navigation from '@/containers/Navigation';
import Swipe from '@/components/Swipe';
import Wrapper from '@/components/Wrapper';
import PageList from '@/components/PageList';
import routes from '@/shared/routes';

export default {

    data() {
        return {
            routes
        };
    },

    components: {
        Jobs,
        Skills,
        Education,
        Portfolio,
        Contacts,
        Swipe,
        Navigation,
        Wrapper,
        PageList
    },

    methods: {
        onSwipe(direction) {
            console.log(direction);
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