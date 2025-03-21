import { visit, SKIP } from 'unist-util-visit';
import { h } from 'hastscript';

/**
 * @import {Plugin} from 'unified'
 */

/** @type {Plugin<{}>} */
export function rehypeTableCaptionPlugin() {
  return function (tree) {
    visit(tree, function (node, index, parent) {
      if (node.type !== 'element') {
        return;
      }
      if (parent?.tagName !== 'table' && node.tagName === 'caption') {
        parent.children?.splice(index, 1);

        let nextIndex = index + 1;
        let next = parent?.children?.at(nextIndex);
        while (next && next.tagName !== 'table') {
          nextIndex++;
          next = parent?.children?.at(nextIndex);
        }
        if (next) {
          next?.children?.unshift(node);
        }

        return [SKIP, index];
      }
    });
  };
}

let idx = 0;
/** @type {Plugin<{}>} */
export function rehypeTableScrollerPlugin() {
  return function (tree) {
    visit(tree, function (node, index, parent) {
      if (node.type !== 'element') {
        return;
      }
      if (
        node.tagName === 'table' &&
        !parent.properties?.className?.includes('p-scroller')
      ) {
        // assign an id to the caption
        const id = `table-caption-${index}-${idx++}`;
        Object.assign(node.children.at(0)?.properties, { id });
        const wrapper = h(
          'section',
          {
            className: ['p-scroller', 'p-scroller--inline'],
            'aria-labelledby': id,
          },
          [node],
        );

        parent.children?.splice(index, 1, wrapper);
        return [SKIP, index];
      }
    });
  };
}
