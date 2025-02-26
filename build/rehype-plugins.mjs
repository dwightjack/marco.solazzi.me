import { visit, SKIP } from 'unist-util-visit';

/**
 * @import {Plugin} from 'unified'
 */

export function rehypeTableCaptionPlugin() {
  return function (tree) {
    visit(tree, 'element', function (node, index, parent) {
      if (parent?.type === 'root' && node.tagName === 'caption') {
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
