/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

const presetEnv = require('postcss-preset-env');
module.exports = {
  plugins: [
    presetEnv({
      stage: 2,
      features: {
        'custom-properties': false,
      },
    }),
  ],
};
