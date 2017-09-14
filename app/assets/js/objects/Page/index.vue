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
        name: VueTypes.string,
        key: VueTypes.string
    }
};
</script>

<style lang="scss" module>
@import "globals";
@import "mixins";

.root {
    padding-top: rem(40px);
    outline: 0;

    &:first-child {
        padding-top: rem(60px);
    }
}

.body {
    padding: 0 vw($page-gutter);
}
</style>

