// @ts-check
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

/**
 * @import { Plugin } from 'unified'
 */
/**
 *
 * @param {*} node
 * @param {keyof HTMLElementTagNameMap} name
 * @param {Record<string, string>} attributes
 */
function transformNode(node, name, attributes = {}) {
  const data = node.data || (node.data = {});

  node.attributes = Object.assign(node.attributes ?? {}, attributes);

  const hast = h(name, node.attributes || {});

  data.hName = hast.tagName;
  data.hProperties = hast.properties;
}

let idx = 0;

/** @type {Plugin<{}>} */
export function remarkContainersPlugin() {
  return function (tree) {
    visit(tree, { type: 'containerDirective' }, function (node) {
      if (node.name === 'pullquote') {
        return transformNode(node, 'figure', { class: 'pullquote' });
      }
      if (/^warn|warning$/.test(node.name)) {
        return transformNode(node, 'aside', { class: 'p-prose__warning' });
      }
      if (node.name === 'table') {
        const id = `table-caption-${idx++}`;
        const caption = node.children.at(0);
        const table = node.children.find((n) => n.type === 'table');
        if (caption && table) {
          transformNode(caption, 'figcaption', { id });
          transformNode(table, 'table', { 'aria-labelledby': id });
        }
        return transformNode(node, 'figure', { class: 'p-table-scroller' });
      }
      transformNode(node, node.name);
    });
  };
}
