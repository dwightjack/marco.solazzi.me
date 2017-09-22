<template>
    <section :class="[$style.root, { [$style.isActive]: active }]">
        <SmoothScrollbar
            @scroll="test"
            tag="div"
            :options="{ alwaysShowTracks: true }"
            :active="$mq.matches('tabletLandscape')"
        >
            <slot />
            <footer role="contentinfo" :class="$style.footer">
                &copy; {{ new Date().getFullYear() }} Marco Solazzi - <a href="https://github.com/dwightjack/marco.solazzi.me/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">license</a> <a href="https://github.com/dwightjack/marco.solazzi.me" target="_blank" rel="noopener noreferrer">source</a>
            </footer>
        </SmoothScrollbar>
    </section>
</template>

<script>
import VueTypes from 'vue-types';
import SmoothScrollbar from '@/components/SmoothScrollbar';

export default {
    props: {
        active: VueTypes.bool
    },
    components: {
        SmoothScrollbar
    },
    methods: {
        test(status) {
            console.log(status);
        }
    }
};
</script>


<style lang="scss" module src="./page-list.scss" />