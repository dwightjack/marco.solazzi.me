module.exports = {
  plugins: [require.resolve('prettier-plugin-astro')],
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
