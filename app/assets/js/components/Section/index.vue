<template>
    <section :class="$style.root">
        <SectionTitle :class="$style.title" :prefix="prefix" :title="title" :subtitle="subtitle" />
        <div :class="$style.body" ref="body">
            <slot />
        </div>
    </section>
</template>

<script>
import anime from 'animejs';
import VueTypes from 'vue-types';
import { caf, raf } from '@/shared/utils';
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