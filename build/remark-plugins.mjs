// @ts-expect-error Node has more properties than the type
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
    visit(tree, { type: 'leafDirective' }, function (node, index, parent) {
      if (node.name !== 'codepen') return;
      const {
        user,
        id,
        height = '300',
        tab = 'html,result',
      } = node.attributes || {};
      const title = node.children?.[0]?.value ?? id;
      const penUrl = `https://codepen.io/${user}/pen/${id}`;
      const userUrl = `https://codepen.io/${user}`;
      const pHtml = `<p class="codepen" data-height="${height}" data-pen-title="${title}" data-default-tab="${tab}" data-slug-hash="${id}" data-user="${user}" style="height: ${height}px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span>See the Pen <a href="${penUrl}">${title}</a> by <a href="${userUrl}">@${user}</a> on <a href="https://codepen.io">CodePen</a>.</span></p>`;
      const scriptHtml = `<script async src="https://public.codepenassets.com/embed/index.js"></script>`;
      parent.children.splice(
        index,
        1,
        { type: 'html', value: pHtml },
        { type: 'html', value: scriptHtml },
      );
    });

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
