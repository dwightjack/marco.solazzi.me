import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import rehypeExternalLinks from 'rehype-external-links';

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
