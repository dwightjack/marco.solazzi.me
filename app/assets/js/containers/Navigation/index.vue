<template>
    <nav
        :class="[$style.root, { [$style.isActive]: activeNav, [$style.isVisible]: isLoaded }]"
        role="navigation"
        @keyup.esc="closeNav"
    >
        <Burger :class="$style.burger" :onClick="toggleNavAction" :active="activeNav" controls="nav-menu" />
        <transition name="navigation" :duration="{ enter: totalTimingIn, leave: navAnimOut }">
            <ul v-show="activeNav" :class="$style.menu" id="nav-menu">
                <li
                    v-for="(path, index) in paths"
                    :key="path.path"
                    :class="[$style.item, { [$style.isCurrent]: (route === path.path)}]"
                    :style="navItemDelay(index)"
                >
                    <a :href="`#${path.path}`" @click.prevent="goTo(path.path)" :class="$style.route" :tabindex="tabIndex">{{ path.label }}</a>
                </li>
            </ul>
        </transition>
        <footer v-if="navSocials" :class="$style.footer">
            <Anchor
                v-for="ns in navSocials"
                :key="ns.type"
                :link="ns.url"
                :ico="ns.type"
                :tabindex="tabIndex"
                :aria-label="`${ns.type} profile: ${ns.label}`"
            />
        </footer>
    </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import VueTypes from 'vue-types';
import { toInteger } from '@/shared/utils';
import Burger from '@/objects/Burger';
import Anchor from '@/objects/Anchor';

import { TYPES as UI_ACTIONS } from '@/store/ui.actions';

export default {

    components: {
        Burger,
        Anchor
    },

    props: {
        paths: VueTypes.arrayOf(VueTypes.shape({
            path: VueTypes.string.isRequired,
            label: VueTypes.string.isRequired
        })).def([]),
        socials: VueTypes.arrayOf(VueTypes.string).def(['linkedin', 'twitter', 'github'])
    },

    computed: {

        ...mapState('ui', ['route', 'activeNav', 'isLoaded']),

        ...mapState({
            rawSocials: (state) => state.data.socials
        }),

        tabIndex() {
            return this.activeNav ? 0 : -1;
        },

        navSocials() {
            const filters = this.socials;
            return this.rawSocials.filter(({ type }) => filters.indexOf(type) !== -1);
        },

        navItemsDelayIn() {
            return toInteger(this.$style.navItemsDelayIn);
        },
        navPatternDelayIn() {
            return toInteger(this.$style.navPatternDelayIn);
        },
        navTimingIn() {
            return toInteger(this.$style.navTimingIn);
        },
        navItemStagger() {
            return toInteger(this.$style.navItemStagger);
        },
        totalTimingIn() {
            return Math.max(
                this.navTimingIn + this.navPatternDelayIn,
                this.navItemsDelayIn + (this.paths.length * this.navItemStagger)
            );
        },
        navAnimOut() {
            return toInteger(this.$style.navAnimOut);
        }
    },

    methods: {

        ...mapActions('ui', {
            toggleNavAction: UI_ACTIONS.NAV_TOGGLED,
            navigateToAction: UI_ACTIONS.NAVIGATED_TO
        }),

        closeNav() {
            this.toggleNavAction(false);
        },

        navItemDelay(index) {
            if (!this.activeNav) {
                return null;
            }

            return { transitionDelay: `${this.navItemsDelayIn + (index * this.navItemStagger)}ms` };
        },

        goTo(route) {

            this.closeNav();

            setTimeout(() => {
                this.navigateToAction({ route, force: true });

                // setTimeout(() => {
                //     this.$store.dispatch(`ui/${UI_ACTIONS.PAGELISTSCROLL_COMPLETED}`);
                // }, 1000);

            }, this.navAnimOut + 300);


        }
    }
};
</script>


<style lang="scss" module src="./nav.scss" />