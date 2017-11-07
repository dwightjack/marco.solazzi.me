<template>
    <div :class="$style.root" />
</template>

<script>
import VueTypes from 'vue-types';
import { Application, Sprite, Container } from 'pixi.js';
import Octagon from './octagon';
import Particles from './particles';

const CANVAS_WIDTH = 600;
const IMAGE_SIZE = 400;

export default {


    props: {
        foreground: VueTypes.string.isRequired,
        background: VueTypes.string.isRequired
    },

    created() {

        this.app = new Application({
            width: CANVAS_WIDTH,
            height: CANVAS_WIDTH,
            autoResize: true,
            transparent: true
        });

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

            mainContainer.addChild(
                bgSprite,
                particles.container,
                mask.shape
            );

            mainContainer.interactive = true;
            mainContainer.mask = mask.shape;
            mainContainer.scale.set(IMAGE_SIZE / width);
            mainContainer.position.set((CANVAS_WIDTH - IMAGE_SIZE) / 2);

            mainContainer.on('mouseover', () => particles.hide());
            mainContainer.on('mouseout', () => particles.show());

            app.ticker.add(() => {
                mask.draw();
            });
            mask.animate();

            app.stage.addChild(mainContainer);
            app.render();

            this.$once('beforeDestroy', () => {
                mask.stop();
                this.$el.removeChild(app.view);
            });


        });

        this.$el.appendChild(app.view);
    },

    methods: {


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

$translate: percentage(((600 - 400) / 2) / -600);

.root {
    position: relative;
    z-index: -1;
    transform: translate($translate, $translate);
}

</style>

