<template>
    <div :class="$style.root" />
</template>

<script>
import { Application, Sprite, Container, Graphics, Point, Rectangle, Texture } from 'pixi.js';
import anime from 'animejs';
import picture from 'images/marco.jpg';
import animal from 'images/marco-full.jpg';

const CANVAS_WIDTH = 600;
const IMAGE_SIZE = 400;

const createParticle = (texture, posX, posY, size) => {
    const sprite = new Sprite(new Texture(texture));

    sprite.texture.frame = new Rectangle(
        posX,
        posY,
        size,
        size,
    );
    sprite.anchor.set(0.5);
    sprite.position.set(posX + (size / 2), posY + (size / 2));

    sprite._originalPosition = { x: posX, y: posY };

    //sprite.interactive = true;

    /*const particleAnimation = anime({
        targets: sprite,
        alpha: 0,
        duration: 500,
        //delay: () => anime.random(50, 300),
        easing: 'easeOutCubic',
        autoplay: false
    });

    sprite.on('mouseover', () => {
        if (particleAnimation.reversed) {
            particleAnimation.reverse();
        }
        particleAnimation.play();
    });

    sprite.on('mouseout', () => {

        if (sprite._timeout) {
            clearTimeout(sprite._timeout);
        }

        sprite._timeout = setTimeout(() => {
            particleAnimation.pause();
            particleAnimation.reverse();
            particleAnimation.play();
        }, 500);
    });*/


    return sprite;
};

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
            .add('animal', animal)
            .load(() => {

                const { texture } = app.loader.resources.avatar;
                const { texture: animalTexture } = app.loader.resources.animal;
                const image = new Sprite(texture);
                const picContainer = new Container();
                const mask = new Graphics();

                const position = (CANVAS_WIDTH - IMAGE_SIZE) / 2;
                const scale = IMAGE_SIZE / image.width;

                picContainer.interactive = true;


                mask.beginFill(0x000000);
                const vertex = this.getOctagonVertex(image.width / 2, image.width / 2, image.width / 2.1);
                mask.drawPolygon(vertex);
                mask.endFill();

                picContainer.mask = mask;

                picContainer.addChild(mask);

                //picture particles...
                const particlesContainer = new Container();
                const particles = [];
                const tileNum = 10;
                const size = Math.floor(image.width / tileNum);
                for (let i = 0; i < tileNum; i += 1) {
                    for (let j = 0; j < tileNum; j += 1) {
                        const particle = createParticle(texture.baseTexture, i * size, j * size, size);
                        particles.push(particle);
                    }
                }

                particlesContainer.addChild(...particles);


                picContainer.addChild(new Sprite(animalTexture));
                picContainer.addChild(particlesContainer);


                const particleAnimation = anime({
                    targets: particles,
                    alpha: (p) => [p.alpha, 0],
                    duration: 200,
                    delay: () => anime.random(50, 300),
                    easing: 'linear',
                    autoplay: false
                });

                picContainer.on('mouseover', () => {
                    if (particleAnimation.reversed) {
                        particleAnimation.reverse();
                    }
                    particleAnimation.play();
                });

                picContainer.on('mouseout', () => {
                    particleAnimation.pause();
                    particleAnimation.reverse();
                    particleAnimation.play();
                });



                picContainer.scale.set(scale);
                picContainer.position.set(position);

                app.stage.addChild(picContainer);

                app.render();

                const rand = anime.random;
                const createRange = (n, min, max) => [(n - rand(1, min)), n + rand(1, max)];

                const randomVertex = (p, dir) => {
                    const n = p[dir];
                    //vertex position
                    const half = mask.width / 2;
                    const thresholdUp = half + (half / 2);
                    const thresholdDown = half - (half / 2);

                    if (p.x > thresholdUp || p.x < thresholdDown) {
                        //it's lateral
                        if (dir === 'x') {
                            return p.x < half ? createRange(n, 20, 40) : createRange(n, 20, 30);
                        }
                        return createRange(n, 5, 20);
                    }

                    if (dir === 'y') {
                        return p.y < half ? createRange(n, 20, 40) : createRange(n, 10, 30);
                    }
                    return createRange(n, 10, 30);
                };

                const animations = vertex.map((p) => {

                    return anime({
                        targets: p,
                        x: randomVertex(p, 'x'),
                        y: randomVertex(p, 'y'),
                        duration: rand(3000, 3500),
                        easing: 'easeInOutSine',
                        direction: 'alternate',
                        loop: true,
                        autoplay: false
                    });
                });

                app.ticker.add(() => {
                    mask.clear();
                    mask.beginFill(0x000000);
                    mask.drawPolygon(vertex);
                    mask.endFill();
                });

                animations.forEach((animation) => {
                    setTimeout(() => animation.play(), rand(150, 2000));
                });

                this.animations = animations;



            });

        this.$el.appendChild(this.app.view);
    },

    beforeDestroy() {
        const { app } = this;

        app.stop();

        if (this.animations) {
            this.animations.forEach((a) => a.pause());
            this.animations.length = 0;
        }

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

