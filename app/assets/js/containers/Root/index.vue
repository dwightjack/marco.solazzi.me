<template>
    <div>
        <Loader :active="!isLoaded" @loader-end="loadFinish" :assetLoaded="true" />
        <Navigation :paths="routes" />
        <Wrapper>
            <Cover />
            <PageList>
                <Jobs />
                <Education />
                <Skills />
                <Portfolio />
                <Contacts />
            </PageList>
            <BgPattern :active="isLoaded" />
        </Wrapper>
    </div>
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
//import Swipe from '@/components/Swipe';
import Loader from '@/components/Loader';
import Wrapper from '@/components/Wrapper';
import BgPattern from '@/objects/BgPattern/pixi';

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
        //Swipe,
        Navigation,
        Wrapper,
        PageList,
        BgPattern
    },

    data() {
        return {
            routes,
            location: (this.$isServer ? { hash: '' } : global.location)
        };
    },

    computed: {
        ...mapState('ui', ['activeGroup', 'isLoaded', 'activeNav', 'pagelistScroll', 'route']),

        validRoutes() {
            return this.routes.map(({ path }) => path);
        }
    },

    watch: {
        route(route) {
            //side effect!
            if (!this.$isServer) {
                if (this.getCurrentPath() !== route) {
                    global.history.pushState(null, null, `#!${route}`);
                }
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

        getCurrentPath() {
            return this.location.hash.replace(/#!([a-z-_]+?)$/, '$1');
        },

        loadFinish() {
            this.toggleAppLoadAction(true);
            const currentPath = this.getCurrentPath();
            let route = NAV_PATH_HOME;

            if (!this.$isServer && this.validRoutes.indexOf(currentPath) !== -1) {
                route = currentPath;
            }

            this.navigateToAction({ route, force: true });
        },

        onPopstate() {
            const route = this.getCurrentPath();
            this.navigateToAction({ route, force: true });
        }
    }
};

</script>

<style lang="scss" module>
</style>