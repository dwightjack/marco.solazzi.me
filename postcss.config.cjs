/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

const presetEnv = require('postcss-preset-env');
const { resolve } = require('path');
const postcssGlobalData = require('@csstools/postcss-global-data');
module.exports = {
  plugins: [
    postcssGlobalData({ files: [resolve(__dirname, 'src/styles/tokens.css')] }),
    presetEnv({
      stage: 2,
      features: {
        'custom-properties': false,
        'nesting-rules': true,
      },
    }),
  ],
};
