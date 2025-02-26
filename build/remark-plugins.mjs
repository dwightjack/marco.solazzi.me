import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

/**
 * @import {Plugin} from 'unified'
 */

/** @type {Plugin<{}>} */
export function remarkContainersPlugin() {
  return function (tree) {
    visit(tree, function (node) {
      if (/(text|leaf|container)Directive/.test(node.type) === false) {
        return;
      }
      let { name, type } = node;
      if (type === 'containerDirective' && node.name === 'pullquote') {
        name = 'figure';
        node.attributes = { class: 'pullquote' };
      }
      if (type === 'containerDirective' && /^warn|warning$/.test(node.name)) {
        name = 'aside';
        node.attributes = { class: 'p-prose__warning' };
      }

      const data = node.data || (node.data = {});
      const hast = h(name, node.attributes || {});

      data.hName = hast.tagName;
      data.hProperties = hast.properties;
    });
  };
}
