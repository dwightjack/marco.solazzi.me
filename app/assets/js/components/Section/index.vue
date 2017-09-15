<template>
    <section :class="$style.root">
        <SectionTitle :class="$style.title" :prefix="prefix" :title="title" :subtitle="subtitle" />
        <div :class="$style.body" :style="{ transform: `translateY(${scrollAmount}px)` }">
            <slot />
        </div>
    </section>
</template>

<script>
import VueTypes from 'vue-types';
import SectionTitle from '@/objects/Title';

export default {

    data() {
        return {
            rootOffsetTop: 0,
            pagelistScroll: 0
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
        scrollAmount() {
            const amount = (this.rootOffsetTop + parseInt(window.innerHeight * 0.2, 10)) - (this.pagelistScroll + (window.innerHeight / 2));
            return Math.floor(amount * 0.1);
        }
    },

    mounted() {
        this.rootOffsetTop = this.$el.offsetTop;
    }
};
</script>

<style lang="scss" module src="./section.scss" />