<template>
    <section :class="$style">
        <Title :class="$style.title" :prefix="prefix" :title="title" :subtitle="subtitle" />
        <div :class="$style.body" ref="body">
            <slot />
        </div>
    </section>
</template>

<script>
import anime from 'animejs';
import VueTypes from 'vue-types';
import { caf, raf } from '@/shared/utils';

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
        prefix: VueTypes.string
    },

    computed: {
        scrollAmount() {
            return (this.rootOffsetTop + parseInt(window.innerHeight * 0.2, 10)) - (this.pagelistScroll + (window.innerHeight / 2));
        }
    },

    watch: {
        pagelistScroll() {
            if (this.rafId) {
                caf(this.rafId);
                this.rafId = null;
            }

            this.rafId = raf(this.setTitlePosition);
        }
    },

    created() {
        this.rafId = null;
    },

    mounted() {
        this.rootOffsetTop = this.$el.offsetTop;
        this.setTitlePosition();
    },

    methods: {
        setTitlePosition() {

            anime({
                targets: this.$refs.body,
                y: Math.floor(this.scrollAmount * 0.1),
                duration: 0
            });
        }
    }
};
</script>

<style lang="scss" module src="./section.scss" />