export function initialize() {
  const scrollers = document.querySelectorAll('.p-table-scroller');

  if (scrollers.length === 0) {
    return;
  }

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        const canScroll =
          getComputedStyle(entry.target, '::before').getPropertyValue(
            'visibility',
          ) === 'visible';

        if (canScroll) {
          entry.target.setAttribute('tabindex', '0');
          return;
        }
        entry.target.removeAttribute('tabindex');
      }
    }
  });

  for (const scroller of scrollers) {
    resizeObserver.observe(scroller);
  }
}
