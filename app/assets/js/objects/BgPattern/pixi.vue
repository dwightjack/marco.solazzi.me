<template>
    <transition
        appear
        :enter-class="$style.rootEnter"
        :enter-active-class="$style.rootEnterActive"
        :leave-class="$style.rootLeave"
    >
    <div v-show="active" :class="$style.root">

    </div>
    </transition>
</template>

<script>

import { Application, extras, Texture, Sprite, Container } from 'pixi.js';
import anime from 'animejs';
import patternSVGFull from '!raw-loader!../../../images/circuits-full.svg'; //eslint-disable-line
import patternSVG2 from '!raw-loader!../../../images/circuits-2.svg'; //eslint-disable-line
import patternSVG from '!raw-loader!../../../images/circuits.svg'; //eslint-disable-line

export default {
    props: {
        active: Boolean
    },

    mounted() {

        const CANVAS_WIDTH = parseInt(window.innerWidth * 0.6, 10);
        const CANVAS_HEIGHT = window.innerHeight;

        const app = new Application({
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            autoResize: true,
            transparent: true
        });

        const patternFull = Texture.fromImage(`data:image/svg+xml;charset=utf8,${patternSVGFull}`);
        const pattern2 = Texture.fromImage(`data:image/svg+xml;charset=utf8,${patternSVG2}`);
        const pattern = Texture.fromImage(`data:image/svg+xml;charset=utf8,${patternSVG}`);

        const tilingFull = new extras.TilingSprite(patternFull, CANVAS_WIDTH, CANVAS_HEIGHT);
        const tiling = new extras.TilingSprite(pattern, CANVAS_WIDTH, CANVAS_HEIGHT);
        const tiling2 = new extras.TilingSprite(pattern2, CANVAS_WIDTH, CANVAS_HEIGHT);

        tiling.alpha = 0;
        tiling2.alpha = 0;

        const canvas = document.createElement('canvas');
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, CANVAS_HEIGHT, CANVAS_WIDTH, 0);
        gradient.addColorStop(1, 'white');
        gradient.addColorStop(0.6, 'white');
        gradient.addColorStop(0, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        const container = new Container();
        const gradientSprite = new Sprite(Texture.fromCanvas(canvas));


        container.mask = gradientSprite;

        container.addChild(
            tilingFull,
            tiling,
            tiling2,
        );

        app.stage.addChild(container);

        anime({
            targets: tiling,
            easing: 'easeInOutSine',
            loop: true,
            delay: 14000,
            alpha: [{
                value: [0, 0.05],
                duration: 150
            }, {
                value: [0.05, 0],
                duration: 200
            }, {
                value: [0.05, 0],
                duration: 350
            }]
        });

        anime({
            targets: tiling2,
            easing: 'easeInOutSine',
            loop: true,
            direction: 'alternate',
            delay: 2000,
            duration: 5000,
            alpha: [0, 0.05]
        });

        anime({
            targets: tilingFull,
            easing: 'easeInOutSine',
            loop: true,
            direction: 'alternate',
            delay: 2000,
            duration: 5000,
            alpha: [1, 0.5]
        });


        app.render();
        this.$el.appendChild(app.view);

    }

};
</script>

<style lang="scss" module>
@import "globals";
@import "sass-mq/mq";

.root {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 40%;
    z-index: -1;
}

@media print {

    .root {
        position: absolute;
        bottom: auto;
        left: 0;
        opacity: 1 !important;
        height: 29.7cm;

        &::before {
            background-size: auto, auto;
        }

        &::after,
        > span {
            display: none;
        }
    }
}

.root--enter {
    opacity: 0;
}

.root--enter-active {
    transition-delay: 1000ms;
}

.root--leave {
    opacity: 0;
}
</style>
