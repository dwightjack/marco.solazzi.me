<template>
    <header>
        <h2 :class="$style.root">
            <b v-if="prefix" :class="$style.prefix">
                {{ prefix }}
            </b><span :class="$style.text">{{ prefix ? `.${title}` : title }}</span>
        </h2>
        <p v-if="subtitle" :class="$style.rootSub">{{ subtitle }}</p>
    </header>
</template>

<script>
import VueTypes from 'vue-types';

export default {
    props: {
        prefix: VueTypes.string.def('me'),
        title: VueTypes.string.isRequired,
        subtitle: VueTypes.string
    }
};
</script>

<style lang="scss" module src="./title.scss" />