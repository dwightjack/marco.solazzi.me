<template>
    <div :class="[$style.root, { [$style.rootHigh]: value > 80}]">
        <span :class="$style.label">{{ label }}</span>
        <b :class="[$style.bar, barValueClass]">
            <span :class="$style.value">{{ value }}%</span>
        </b>
    </div>
</template>

<script>

import VueTypes from 'vue-types';

export default {

    props: {
        label: VueTypes.string.isRequired,
        value: VueTypes.number.isRequired
    },

    computed: {
        barValueClass() {
            return this.$style[`bar--${this.value}`];
        }
    }
};
</script>

<style lang="scss" module src="./meter-bar.scss" />