import { parseHTML } from 'linkedom';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

/**
 *
 * @param {string} html
 */
export async function test(html) {
  const linksList = {};
  const { document } = parseHTML(html);
  const links = document.querySelectorAll('a[href^=https://]');
  for (const link of links) {
    const { hostname } = new URL(link.href);

    const buffer = await (
      await fetch(`http://www.google.com/s2/favicons?domain=${hostname}`)
    ).arrayBuffer();

    const filename = `${hostname.replaceAll('.', '_')}.png`;
    linksList[hostname] = filename;

    await writeFile(
      resolve(import.meta.dirname, filename),
      Buffer.from(buffer),
    );
  }

  await writeFile(
    resolve(import.meta.dirname, 'icons.json'),
    JSON.stringify(linksList, null, 2),
  );
}

test(`
<a href="https://react.com">react</a>
  `);
