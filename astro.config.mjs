import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import remarkDirective from 'remark-directive';
import {
  remarkContainersPlugin,
  rehypeExternalLinks,
} from './build/markdown-plugins.mjs';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
  site: 'https://marco.solazzi.me',
  compressHTML: true,
  integrations: [icon(), sitemap()],
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeExternalLinks],
      remarkPlugins: [remarkDirective, remarkContainersPlugin],
    }),
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
