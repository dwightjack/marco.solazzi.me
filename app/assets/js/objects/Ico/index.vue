<template>
    <svg :class="`o-ico o-ico--${name}`">
        <use v-bind="{'xlink:href':`#o-ico--${name}`}" />
    </svg>
</template>

<script>
import VueTypes from 'vue-types';

export default {
    props: {
        name: VueTypes.string.isRequired
    }
};
</script>

<style lang="scss" module src="./ico.scss" />