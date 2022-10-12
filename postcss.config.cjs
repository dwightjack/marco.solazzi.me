/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

const presetEnv = require('postcss-preset-env');
const { resolve } = require('path');
module.exports = {
  plugins: [
    presetEnv({
      stage: 2,
      features: {
        'custom-properties': false,
      },
      importFrom: resolve(__dirname, 'src/styles/tokens.css'),
    }),
  ],
};
