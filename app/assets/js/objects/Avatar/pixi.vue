<template>
    <figure :class="$style.root" v-resize="onResize">
        <svg viewBox="0 0 890 890" role="group" tabindex="-1" :class="$style.fallback">
            <title>A picture of myself in Japan</title>
            <g clip-path="url(#avatar-mask)">
                <image :class="$style.img" v-bind="{ 'xlink:href': foreground }" x="0" y="0" />
            </g>

            <clipPath id="avatar-mask" :class="$style.clip">
                <path d="M850 425L725.5 725.5 425 850 124.5 725.5 0 425l124.5-300.5L425 0l300.5 124.5z" />
            </clipPath>
        </svg>

        <!--<svg viewBox="0 0 890 890" :class="$style.shadow" aria-hidden="true">
            <path d="M850 425L725.5 725.5 425 850 124.5 725.5 0 425l124.5-300.5L425 0l300.5 124.5z" />
        </svg>-->
    </figure>
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
        active: VueTypes.bool,
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
        },

        active(v) {
            this.$emit(v ? 'start' : 'stop');
        }
    },

    created() {

        if (this.$isServer === false) {

            this.app = new Application({
                autoResize: true,
                autoStart: false,
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

            app._mainContainer = mainContainer;

            app.stage.addChild(mainContainer);
            app.render();

            this.$on('start', () => {
                mask.animate();
                app.start();
            });

            this.$on('stop', () => {
                mask.stop();
                app.stop();
            });

            this.$once('beforeDestroy', () => {
                this.$emit('stop');
                this.$el.removeChild(app.view);
            });

            if (this.active) {
                this.$emit('start');
            }

        });

        app.view.setAttribute('aria-hidden', 'true');
        app.view.className += this.$style.canvas;

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

<style lang="scss" module src="./avatar.scss" />