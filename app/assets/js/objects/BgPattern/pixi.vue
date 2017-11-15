<template>
    <transition
        appear
        :enter-class="$style.rootEnter"
        :enter-active-class="$style.rootEnterActive"
        :leave-class="$style.rootLeave"
    >
    <div v-show="active" :class="$style.root" v-resize="onResize">

    </div>
    </transition>
</template>

<script>

import { Application, extras, Texture, Sprite } from 'pixi.js';
import anime from 'animejs';
import patternSVGFull from '!raw-loader!../../../images/circuits-full.svg'; //eslint-disable-line
import patternSVGPartial2 from '!raw-loader!../../../images/circuits-2.svg'; //eslint-disable-line
import patternSVGPartial from '!raw-loader!../../../images/circuits.svg'; //eslint-disable-line


const toTexture = (svg) => Texture.fromImage(`data:image/svg+xml;charset=utf8,${svg}`);

export default {
    props: {
        active: Boolean
    },


    data() {
        return this.getCanvasSize();
    },

    mounted() {

        const { canvasWidth, canvasHeight } = this;

        const app = new Application({
            width: canvasWidth,
            height: canvasHeight,
            autoResize: true,
            transparent: true
        });

        const tilingFull = this.toTile(patternSVGFull);
        const tiling = this.toTile(patternSVGPartial);
        const tiling2 = this.toTile(patternSVGPartial2);

        tiling.alpha = 0;
        tiling2.alpha = 0;

        this.tiles = [
            tilingFull,
            tiling,
            tiling2
        ];


        const gradientSprite = new Sprite(Texture.fromCanvas(this.createGradient()));

        app.stage.mask = gradientSprite;

        app.stage.addChild(...this.tiles);

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

        this.$once('beforeDestroy', () => {
            app.stop();
            this.$el.removeChild(app.view);
        });

        this.app = app;

    },

    methods: {
        onResize() {
            const { canvasWidth, canvasHeight } = this.getCanvasSize();

            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;

            this.$nextTick(() => {
                this.app.renderer.resize(canvasWidth, canvasHeight);
                this.app.stage.mask = new Sprite(Texture.fromCanvas(this.createGradient()));
                this.tiles.forEach((tile) => {
                    tile.width = canvasWidth; //eslint-disable-line no-param-reassign
                    tile.height = canvasHeight; //eslint-disable-line no-param-reassign
                });
            });

        },

        getCanvasSize() {
            if (this.$isServer) {
                return { canvasWidth: 0, canvasHeight: 0 };
            }

            return {
                canvasWidth: parseInt(window.innerWidth * 0.6, 10),
                canvasHeight: parseInt(window.innerHeight, 10)
            };
        },

        createGradient() {
            const { canvasWidth, canvasHeight } = this;
            const canvas = document.createElement('canvas');
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            const ctx = canvas.getContext('2d');
            const gradient = ctx.createLinearGradient(0, canvasHeight, canvasWidth, 0);

            gradient.addColorStop(1, 'white');
            gradient.addColorStop(0.6, 'white');
            gradient.addColorStop(0, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            return canvas;
        },

        toTile(svg) {
            return new extras.TilingSprite(toTexture(svg), this.canvasWidth, this.canvasHeight);
        }
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

    > canvas {
        float: right;
    }
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
