<template>
  <section :class="$style.root" :id="id" :name="name" tabIndex="-1">
        <div :class="$style.body">
            <slot />
        </div>
    </section>
</template>

<script>
import VueTypes from 'vue-types';

export default {
    props: {
        id: VueTypes.string,
        name: VueTypes.string
    }
};
</script>

<style lang="scss" module src="./page.scss" />