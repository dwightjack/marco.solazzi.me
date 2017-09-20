<template>
    <button :class="[$style.root, { [$style.isActive]: active }]" @click.prevent="onClick" :aria-expanded="active">
        <span :class="$style.label">Menu</span>
    </button>
</template>

<script>
import VueTypes from 'vue-types';

export default {

    props: {
        active: VueTypes.bool.def(false),
        onClick: VueTypes.func
    }

};
</script>

<style lang="scss" module src="./burger.scss" />