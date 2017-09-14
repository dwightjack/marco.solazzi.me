<template>
    <header>
        <h2 :class="$style.root">
            <strong v-if="prefix" :class="$style.prefix">{{ prefix }}</strong>
            <span :class="$style.text">{{ prefix ? `.${title}` : title }}</span>
        </h2>
        <h3 v-if="subtitle" :class="$style.rootSub">{{ subtitle }}</h3>
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