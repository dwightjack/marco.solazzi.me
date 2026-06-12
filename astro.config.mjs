import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import remarkDirective from 'remark-directive';
import { remarkContainersPlugin } from './build/remark-plugins.mjs';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
  site: 'https://marco.solazzi.me',
  compressHTML: true,
  integrations: [icon(), sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkDirective, remarkContainersPlugin],
    }),
    shikiConfig: {
      themes: {
        light: 'github-light-high-contrast',
        dark: 'github-dark-high-contrast',
      },
    },
  },
});
