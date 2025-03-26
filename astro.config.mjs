import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import rehypeExternalLinks from 'rehype-external-links';
import remarkDirective from 'remark-directive';
import { remarkContainersPlugin } from './build/remark-plugins.mjs';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://marco.solazzi.me',
  compressHTML: false,
  integrations: [icon(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
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
