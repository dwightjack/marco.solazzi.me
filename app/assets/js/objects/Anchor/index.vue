<template>
    <a
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        :class="[$styles.root, { [$styles[`root--${style}`]]: style }]"
        >
        <Ico v-if="ico" :name="ico" :class="$styles.ico" />
        <span v-if="label" :class="$styles.label">{{ label }}</span>
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

