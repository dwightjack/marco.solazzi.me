// adapted from https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/

export default class ScrollIntercept {
  prevYPosition = 0;
  direction = 'up';

  sections: Element[] = [];

  observer!: IntersectionObserver;

  onUpdate!: (target: Element) => void;

  onIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (window.scrollY > this.prevYPosition) {
        this.direction = 'down';
      } else {
        this.direction = 'up';
      }

      this.prevYPosition = window.scrollY;

      const target =
        this.direction === 'down' ? this.getTargetSection(entry) : entry.target;
      if (this.shouldUpdate(entry)) {
        this.onUpdate(target);
      }
    });
  };

  constructor(
    selector: string,
    onUpdate: (element: Element) => void = () => {},
  ) {
    this.sections = [...document.querySelectorAll(selector)];
    this.onUpdate = onUpdate;

    if (this.sections.length === 0) {
      console.error(`The selector "${selector}" did not match any element.`);
      return;
    }

    this.observer = new IntersectionObserver(this.onIntersect, {
      rootMargin: '-40%',
    });

    for (const section of this.sections) {
      this.observer.observe(section);
    }
  }

  destroy() {
    for (const section of this.sections) {
      this.observer.unobserve(section);
    }
  }

  getTargetSection(entry: IntersectionObserverEntry) {
    const index = this.sections.findIndex(
      (section) => section === entry.target,
    );

    if (index >= this.sections.length - 1) {
      return entry.target;
    } else {
      return this.sections[index + 1];
    }
  }

  shouldUpdate(entry: IntersectionObserverEntry) {
    if (this.direction === 'down' && !entry.isIntersecting) {
      return true;
    }

    if (this.direction === 'up' && entry.isIntersecting) {
      return true;
    }

    return false;
  }
}
