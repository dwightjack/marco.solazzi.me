import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://marco.solazzi.me',
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});
