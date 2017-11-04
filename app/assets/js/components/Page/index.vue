<template>
  <section :class="$style.root" :id="id" tabIndex="-1">
        <div :class="$style.body" ref="body">
            <span ref="top" :class="$style.intersectTop" data-pos="top" />
            <slot />
            <span ref="bottom" :class="$style.intersectBottom" data-pos="bottom" />
        </div>
    </section>
</template>

<script>
import VueTypes from 'vue-types';
import observerMixin from '@/shared/observer.mixin';

export default {
    mixins: [observerMixin],
    props: {
        id: VueTypes.string.isRequired
    }
};
</script>


<style lang="scss" module src="./page.scss" />