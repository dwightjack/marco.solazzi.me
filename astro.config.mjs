import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import rehypeExternalLinks from 'rehype-external-links';
import remarkDirective from 'remark-directive';
import { remarkContainersPlugin } from './build/remark-plugins.mjs';
import {
  rehypeTableCaptionPlugin,
  rehypeTableScrollerPlugin,
} from './build/rehype-plugins.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://marco.solazzi.me',
  compressHTML: false,
  integrations: [icon()],
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
      rehypeTableCaptionPlugin,
      rehypeTableScrollerPlugin,
    ],
  },
});
