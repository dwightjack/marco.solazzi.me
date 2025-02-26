import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import presetEnv from 'postcss-preset-env';
import postcssGlobalData from '@csstools/postcss-global-data';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: [
    postcssGlobalData({ files: [resolve(__dirname, 'src/styles/tokens.css')] }),
    presetEnv({
      stage: 2,
      features: {
        'custom-properties': false,
        'nesting-rules': true,
        'gamut-mapping': false,
        'oklab-function': false,
      },
    }),
  ],
};
