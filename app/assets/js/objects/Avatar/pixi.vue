<template>
    <div :class="$style.root" v-resize="onResize" />
</template>

<script>
import VueTypes from 'vue-types';
import { Application, Sprite, Container } from 'pixi.js';
import Octagon from './octagon';
import Particles from './particles';

const CANVAS_WIDTH = 600;
const IMAGE_SIZE = 400;

export default {

    data() {
        return { canvasSize: this.getCanvasSize() };
    },


    props: {
        foreground: VueTypes.string.isRequired,
        background: VueTypes.string.isRequired
    },


    computed: {
        imageSize() {
            if (this.$mq.matches('tablet-landscape')) {
                return (IMAGE_SIZE * this.canvasSize) / CANVAS_WIDTH;
            }
            return this.canvasSize;
        },
        containerOffset() {
            return (this.canvasSize - this.imageSize) / 3;
        }
    },

    watch: {
        canvasSize(value) {
            const { app } = this;
            const { _mainContainer } = app;

            app.renderer.resize(value, value);
            _mainContainer.scale.set(this.imageSize / _mainContainer._realSize);
            _mainContainer.position.set(this.containerOffset);
        }
    },

    created() {

        if (this.$isServer === false) {

            this.app = new Application({
                autoResize: true,
                transparent: true,
                width: this.canvasSize,
                height: this.canvasSize
            });
        }

    },

    mounted() {
        const { app } = this;
        const { foreground, background } = this;

        this.loadResources({ foreground, background }).then((loader) => {
            const { foreground: fg, background: bg } = loader.resources;
            const fgSprite = new Sprite(fg.texture);
            const bgSprite = new Sprite(bg.texture);
            const { width } = fgSprite;

            const mask = new Octagon(width);
            const mainContainer = new Container();
            const particles = new Particles(fg.texture.baseTexture, 20, width);

            mainContainer._realSize = width;
            mainContainer.addChild(
                bgSprite,
                particles.container,
                mask.shape
            );

            mainContainer.interactive = true;
            mainContainer.mask = mask.shape;
            mainContainer.scale.set(this.imageSize / mainContainer._realSize);
            mainContainer.position.set(this.containerOffset);


            mainContainer.on('mouseover', () => particles.hide());
            mainContainer.on('mouseout', () => particles.show());

            app.ticker.add(() => {
                mask.draw();
            });
            mask.animate();

            app._mainContainer = mainContainer;

            app.stage.addChild(mainContainer);
            app.render();

            this.$once('beforeDestroy', () => {
                mask.stop();
                app.stop();
                this.$el.removeChild(app.view);
            });

        });

        this.$el.appendChild(app.view);
    },

    methods: {

        onResize() {
            this.canvasSize = this.getCanvasSize();
        },

        getCanvasSize() {
            if (this.$isServer) {
                return CANVAS_WIDTH;
            }

            if (this.$mq.matches('tablet-landscape')) {
                return parseInt((CANVAS_WIDTH * window.innerWidth) / this.$mq.breakpoints.fullhd, 10);
            }

            return parseInt(window.innerWidth / 2, 10);


        },


        loadResources(obj) {
            const { app } = this;

            return new Promise((resolve) => {
                Object.keys(obj).forEach((k) => { app.loader.add(k, obj[k]); });

                app.loader.load(resolve);
            });
        }
    }

};
</script>

<style lang="scss" module>
@import "globals";
@import "sass-mq/mq";

$translate: percentage(((600 - 400) / 2) / -600);

.root {
    position: relative;
    z-index: -1;


    @include mq('tablet-landscape') {
        transform: translate($translate, $translate);
    }
}

</style>

