/**
 * @import { Plugin } from 'unified'
 */
import { writeFile } from 'node:fs/promises';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { visit } from 'unist-util-visit';

const ICON_FOLDER = resolve(import.meta.dirname, `../public/favicons/`);

/**
 *
 * @param {string} html
 */
export async function extract(node) {
  const { hostname } = new URL(node.properties.href);
  const basename = hostname.replaceAll('.', '_');
  const filename = resolve(ICON_FOLDER, `./${basename}.png`);

  if (!existsSync(filename)) {
    const buffer = await (
      await fetch(`http://www.google.com/s2/favicons?domain=${hostname}`)
    ).arrayBuffer();

    await writeFile(filename, Buffer.from(buffer));
  }
  node.properties['dataIcon'] = basename;
}

/** @type {Plugin<{}>} */
export function rehypeFavicons() {
  /**
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  if (!existsSync(ICON_FOLDER)) {
    mkdirSync(ICON_FOLDER, { recursive: true });
  }
  return async function (tree) {
    const promises = [];
    visit(tree, 'element', function (node) {
      if (
        node.tagName === 'a' &&
        node.properties.href?.startsWith('https://')
      ) {
        promises.push(extract(node));
      }
    });
    await Promise.all(promises);
  };
}
