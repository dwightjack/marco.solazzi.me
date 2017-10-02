<template>
    <transition
        appear
        :enter-class="$style.rootEnter"
        :enter-active-class="$style.rootEnterActive"
        :leave-class="$style.rootLeave"
    >
    <div v-if="active" :class="$style.root">
        <span />
    </div>
    </transition>
</template>
<script>
export default {
    props: {
        active: Boolean
    }
};
</script>

<style lang="scss" module src="./pattern.scss" />
