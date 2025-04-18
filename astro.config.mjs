import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import rehypeExternalLinks from 'rehype-external-links';
import remarkDirective from 'remark-directive';
import { remarkContainersPlugin } from './build/remark-plugins.mjs';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://marco.solazzi.me',
  compressHTML: true,
  integrations: [icon(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light-high-contrast',
        dark: 'github-dark-high-contrast',
      },
    },
    remarkPlugins: [remarkDirective, remarkContainersPlugin],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ['noopener', 'noreferrer'],
        },
      ],
    ],
  },
});
