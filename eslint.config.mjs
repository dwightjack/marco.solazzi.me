// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-plugin-prettier/recommended';

export default defineConfig(
  eslint.configs.recommended,
  ts.configs.recommended,
  prettier,
  astro.configs.recommended,
  {
    ignores: ['src/env.d.ts'],
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
);
