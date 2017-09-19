<template>
    <div @touchstart="onTouchStart" touchend="this.onTouchEnd">
        <slot />
    </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {

    props: {
        onSwipe: VueTypes.func,
        threshold: VueTypes.integer.def(20)
    },

    created() {
        this.touchstartY = 0;
        this.touchendY = 0;
    },

    methods: {
        onTouchStart(e) {
            this.touchstartY = e.changedTouches[0].screenY;
        },

        onTouchEnd(e) {
            this.touchendY = e.changedTouches[0].screenY;
            this.handleGesture();
        },

        handleGesture() {
            const { touchendY, touchstartY, threshold } = this;

            if (Math.abs(touchendY - touchstartY) < threshold) {
                return;
            }

            if (touchendY < touchstartY) {
                this.onSwipe('down');
            }
            if (touchendY > touchstartY) {
                this.onSwipe('up');
            }
        }
    }
};
</script>
