import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://marco.solazzi.me',
  compressHTML: false,
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});
