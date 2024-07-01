// @ts-check
import eslint from '@eslint/js';
import { configs, config } from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-plugin-prettier/recommended';

export default config(
  eslint.configs.recommended,
  ...configs.recommended,
  prettier,
  ...astro.configs.recommended,
  {
    ignores: ['src/env.d.ts'],
  },
);
