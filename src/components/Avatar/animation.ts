import { Application, Sprite, Container, Loader } from 'pixi.js';
import Octagon from './octagon';
import { debounce } from '../../shared/utils';

import anime from 'animejs';

export function mount(root: HTMLElement, width: number, height: number) {
  const app = new Application({
    resizeTo: root,
    autoStart: false,
    backgroundAlpha: 0,
    width: width,
    height: height,
  });

  const container = new Container();

  Loader.shared
    .add('avatar', root.dataset.fg as string)
    .load((_, resources) => {
      const fgSprite = new Sprite(resources['avatar'].texture);
      const { width, height } = fgSprite;
      const mask = new Octagon(width);
      container.addChild(fgSprite, mask.shape);

      container.width = width;
      container.width = height;
      container.alpha = 0;
      container.mask = mask.shape;

      container.scale.set(app.view.width / width);

      app.ticker.add(() => {
        mask.draw();
      });

      window.addEventListener(
        'resize',
        debounce(() => {
          container.scale.set(app.view.width / width);
        }),
      );

      app.stage.addChild(container);
      app.view.setAttribute('aria-hidden', 'true');
      app.view.classList.add('c-avatar__canvas');
      root.appendChild(app.view);
      app.render();
      mask.animate();
      app.start();
      anime({ targets: container, delay: 1000, alpha: 1, duration: 1500 });
    });
}
