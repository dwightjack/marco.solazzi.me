<template>
    <section :class="$style.root">
        <SectionTitle :class="$style.title" :prefix="prefix" :title="title" :subtitle="subtitle" />
        <div :class="$style.body" ref="body" :style="{ transform: `translate3d(0, ${scrollAmount}px, 0)` }">
            <!--   -->
            <slot />
        </div>
    </section>
</template>

<script>
import VueTypes from 'vue-types';
import { mapState } from 'vuex';
import SectionTitle from '@/objects/Title';

export default {

    data() {
        return {
            rootOffsetTop: 0
        };
    },

    props: {
        title: VueTypes.string,
        subtitle: VueTypes.string,
        prefix: String
    },

    components: {
        SectionTitle
    },

    computed: {
        ...mapState('ui', ['pagelistScroll']),

        scrollAmount() {
            const amount = (this.rootOffsetTop + parseInt(window.innerHeight * 0.2, 10)) - (this.pagelistScroll + (window.innerHeight / 2));
            return Math.floor(amount * 0.1);
        }
    },

    mounted() {
        setTimeout(() => {
            this.rootOffsetTop = this.$el.offsetTop;
        }, 100);

    }
};
</script>

<style lang="scss" module src="./section.scss" />