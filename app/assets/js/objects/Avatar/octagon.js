import anime from 'animejs';
import { Graphics, Point } from 'pixi.js';

export default class Octagon {

    animations = [];

    shape = new Graphics();

    constructor(size) {
        this.points = Octagon.getPoints(size / 2, size / 2, size / 2.1);
    }

    draw() {
        const { shape } = this;
        shape.clear();
        shape.beginFill(0x000000);
        shape.drawPolygon(this.points);
        shape.endFill();
    }

    animate() {

        const animations = this.points.map((point) => (

            anime({
                targets: point,
                x: this.getPositionRange(point, 'x'),
                y: this.getPositionRange(point, 'y'),
                duration: anime.random(3000, 3500),
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true,
                autoplay: false
            })

        ));

        animations.forEach((animation) => {
            setTimeout(() => animation.play(), anime.random(150, 2000));
        });

        this.animations = animations;

    }

    stop() {
        this.animations.forEach((a) => a.pause());
        this.animations.length = 0;
    }

    getPositionRange(p, dir) {
        const n = p[dir];
        //vertex position
        const half = this.shape.width / 2;
        const thresholdUp = half + (half / 2);
        const thresholdDown = half - (half / 2);

        if (p.x > thresholdUp || p.x < thresholdDown) {
            //it's lateral
            if (dir === 'x') {
                return p.x < half ? Octagon.createRange(n, 20, 40) : Octagon.createRange(n, 20, 30);
            }
            return Octagon.createRange(n, 5, 20);
        }

        if (dir === 'y') {
            return p.y < half ? Octagon.createRange(n, 20, 40) : Octagon.createRange(n, 10, 30);
        }
        return Octagon.createRange(n, 10, 30);
    }

    static createRange(n, min, max) {
        return [(n - anime.random(1, min)), n + anime.random(1, max)];
    }

    static getPoints(x, y, radius) {
        const TWO_PI = Math.PI * 2;
        const angle = TWO_PI / 8;
        const points = [];

        for (let a = 0; a < TWO_PI; a += angle) {
            const sx = x + (Math.cos(a) * radius);
            const sy = y + (Math.sin(a) * radius);
            points.push(new Point(sx, sy));
        }

        return points;
    }

}