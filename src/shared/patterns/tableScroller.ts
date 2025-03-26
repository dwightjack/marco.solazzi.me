export function initialize() {
  const scrollers = document.querySelectorAll('.p-table-scroller');
  const supportsScrollTimeline = CSS.supports('animation-timeline', '--test');

  if (scrollers.length === 0) {
    return;
  }

  function fallbackScroll(container: HTMLElement) {
    const table = container.querySelector('table');
    if (!table) {
      return;
    }

    function onScroll() {
      container.style.setProperty(
        '--reveal-start',
        container.scrollLeft > 0 ? '1' : '0',
      );
      container.style.setProperty(
        '--reveal-end',
        container.scrollLeft < scrollMax ? '1' : '0',
      );
    }

    const scrollMax = table.offsetWidth - container.offsetWidth;
    const shouldScroll = table.offsetWidth > container.offsetWidth;
    container.style.setProperty('--can-scroll', shouldScroll ? ' ' : 'initial');
    onScroll();
    container.removeEventListener('scroll', onScroll);
    if (shouldScroll) {
      container.addEventListener('scroll', onScroll);
    }
  }

  const resizeObserver = new ResizeObserver((entries) => {
    if (supportsScrollTimeline === false) {
      entries.forEach(({ target }) => fallbackScroll(target as HTMLElement));
    }
    for (const entry of entries) {
      const canScroll =
        getComputedStyle(entry.target, '::before').getPropertyValue(
          'visibility',
        ) === 'visible';
      console.log(canScroll);

      if (canScroll) {
        entry.target.setAttribute('tabindex', '0');
        return;
      }
      entry.target.removeAttribute('tabindex');
    }
  });

  for (const scroller of scrollers) {
    resizeObserver.observe(scroller);
  }
}
