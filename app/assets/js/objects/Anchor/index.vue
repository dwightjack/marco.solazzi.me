<template>
    <a
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        :class="[$style.root, { [$style[`root--${style}`]]: style }]"
    >
        <Ico v-if="ico" :name="ico" :class="$style.ico" />
        <span v-if="label" :class="$style.label">{{ label }}</span>
    </a>
</template>

<script>
import VueTypes from 'vue-types';

import Ico from '@/objects/Ico';

export default {
    props: {
        style: VueTypes.string,
        link: VueTypes.string,
        ico: VueTypes.string,
        label: VueTypes.string
    },
    components: {
        Ico
    }
};
</script>


<style lang="scss" module src="./anchor.scss" />

