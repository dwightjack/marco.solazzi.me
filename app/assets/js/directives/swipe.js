class SwipeEvent {

    touchstartY = 0;
    touchendY = 0;
    threshold = 20;

    onTouchStart = (event) => {
        this.touchstartY = event.changedTouches[0].screenY;
    }

    onTouchEnd = (event) => {
        this.touchendY = event.changedTouches[0].screenY;
        this.handleGesture(event);
    }

    constructor(el, { onSwipe, modifiers = {} } = {}) {
        this.el = el;
        this.callback = onSwipe;
        this.modifiers = modifiers;
    }

    handleGesture(event) {
        const { touchendY, touchstartY, threshold } = this;

        if (Math.abs(touchendY - touchstartY) < threshold) {
            return;
        }

        const dir = touchendY < touchstartY ? 'down' : 'up';
        event.swipeDirection = dir; //eslint-disable-line no-param-reassign

        if (!this.modifiers.up && !this.modifiers.down) {
            this.callback(event);
            return;
        }

        if (this.modifiers.up && dir === 'up') {
            this.callback(event);
            return;
        }

        if (this.modifiers.down && dir === 'down') {
            this.callback(event);
        }
    }

}

export default {

    name: 'v-swipe',

    bind(el, { value, modifiers }) {

        if (el.__swipe) {
            return;
        }

        const swipe = new SwipeEvent(el, { onSwipe: value, modifiers });

        el.__swipe = swipe; //eslint-disable-line no-param-reassign

        el.addEventListener('touchstart', swipe.onTouchStart, false);
        el.addEventListener('touchend', swipe.onTouchEnd, false);
    },

    unbind(el) {
        const swipe = el.__swipe;
        if (swipe) {
            el.removeEventListener('touchstart', swipe.onTouchStart, false);
            el.removeEventListener('touchend', swipe.onTouchEnd, false);
            delete el.__swipe; //eslint-disable-line no-param-reassign
        }
    }
};