import anime from 'animejs';
import { Sprite, Container, Rectangle, Texture } from 'pixi.js';

export default class Particles {

    constructor(baseTexture, num, width) {
        this.baseTexture = baseTexture;
        this.container = new Container();
        this.particles = this.createParticles(num, width);

        this.setAnimation();
        this.container.addChild(...this.particles);
    }

    setAnimation() {

        this.animation = anime({
            targets: this.particles,
            alpha: (p) => [p.alpha, 0],
            duration: 200,
            delay: () => anime.random(50, 300),
            easing: 'linear',
            autoplay: false
        });

    }

    hide() {
        const { animation } = this;
        if (animation.reversed) {
            animation.reverse();
        }
        animation.play();
    }

    show() {
        const { animation } = this;
        animation.pause();
        animation.reverse();
        animation.play();
    }

    createParticles(tileNum, width) {
        const particles = [];
        const size = Math.floor(width / tileNum);
        for (let i = 0; i < tileNum; i += 1) {
            for (let j = 0; j < tileNum; j += 1) {
                const particle = Particles.createParticle(this.baseTexture, i * size, j * size, size);
                particles.push(particle);
            }
        }
        return particles;
    }


    static createParticle(texture, posX, posY, size) {
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

        return sprite;
    }

}