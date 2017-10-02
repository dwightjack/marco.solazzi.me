<template>
    <figure :class="[$style.root, $style[`is-${loadStatus}`]]">
        <svg viewBox="0 0 890 890" role="group">
            <title>A picture of myself in Japan</title>
            <g :clip-path="`url(#${clipId})`">
                <image v-if="loadStatus === 'loaded'" :class="$style.img" v-bind="{ 'xlink:href': src }" x="0" y="0" :width="width" :height="height" />
            </g>
            <clipPath :id="clipId" :class="$style.clip">
                <path d="M850 425L725.5 725.5 425 850 124.5 725.5 0 425l124.5-300.5L425 0l300.5 124.5z" />
            </clipPath>
        </svg>
        <svg viewBox="0 0 890 890" :class="$style.shadow" aria-hidden="true">
            <path d="M850 425L725.5 725.5 425 850 124.5 725.5 0 425l124.5-300.5L425 0l300.5 124.5z" />
        </svg>
    </figure>
</template>

<script>
import VueTypes from 'vue-types';

let clipId = 0;
export default {

    props: {
        src: VueTypes.string.isRequired
    },

    data() {

        clipId += 1;

        return {
            clipId: `profile-clip-path${clipId}`,
            loadStatus: 'pending',
            width: 0,
            height: 0
        };
    },


    mounted() {

        const img = new Image();

        img.onload = () => {
            const { width, height } = img;
            this.width = width;
            this.height = height;
            this.loadStatus = 'loaded';
        };

        img.onerror = () => {
            this.loadStatus = 'error';
        };

        img.src = this.src;

    }
};
</script>

<style lang="scss" module src="./avatar.scss" />