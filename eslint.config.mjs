// @ts-check
import eslint from '@eslint/js';
import { configs, config } from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default config(
  eslint.configs.recommended,
  ...configs.recommended,
  prettier,
  ...astro.configs.recommended,
  {
    files: ['build/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    ignores: ['src/env.d.ts'],
  },
);
