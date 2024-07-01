/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro'],
  printWidth: 80,
  trailingComma: 'all',
  arrowParens: 'always',
  semi: true,
  singleQuote: true,
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
