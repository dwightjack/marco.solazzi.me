<template>
    <div :class="$style.root" />
</template>

<script>
import { Application, Sprite, Container, Graphics, Point } from 'pixi.js';
import picture from 'images/marco.jpg';

const CANVAS_WIDTH = 600;
const IMAGE_SIZE = 400;

export default {

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


        app.loader
            .add('avatar', picture)
            .load(() => {

                const image = new Sprite(app.loader.resources.avatar.texture);
                const picContainer = new Container();
                const mask = new Graphics();

                const position = (CANVAS_WIDTH - IMAGE_SIZE) / 2;
                const scale = IMAGE_SIZE / image.width;


                mask.beginFill(0x000000);
                mask.drawPolygon(this.getOctagonVertex(image.width / 2, image.width / 2, image.width / 2));
                mask.endFill();

                image.mask = mask;

                picContainer.addChild(mask);
                picContainer.addChild(image);

                picContainer.scale.set(scale);
                picContainer.position.set(position);

                app.stage.addChild(picContainer);

                app.render();
            });

        this.$el.appendChild(this.app.view);
    },

    beforeDestroy() {
        const { app } = this;


        app.stop();
        this.$el.removeChild(app.view);
    },

    methods: {

        getOctagonVertex(x, y, radius) {
            const TWO_PI = Math.PI * 2;
            const angle = TWO_PI / 8;
            const vertex = [];

            for (let a = 0; a < TWO_PI; a += angle) {
                const sx = x + (Math.cos(a) * radius);
                const sy = y + (Math.sin(a) * radius);
                vertex.push(new Point(sx, sy));
            }

            console.log(vertex);
            return vertex;
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

