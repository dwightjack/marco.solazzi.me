const { loadConfig } = require('umeboshi-dev-utils');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = loadConfig('paths.js');

let baseConfig;

try {
    baseConfig = require('umeboshi-config-vue/webpack/webpack.base');
} catch (e) {
    baseConfig = require('umeboshi-config/webpack/webpack.base');
}

baseConfig.plugins.push(
    new CopyWebpackPlugin([{
        from: paths.toAbsPath('src.assets/favicons/'),
        to: paths.toAbsPath('dist.root')
    }])
);

const vueLoader = baseConfig.module.rules.find(({ loader }) => loader === 'vue-loader');

if (vueLoader) {
    vueLoader.options.cacheBusting = false;
}

module.exports = baseConfig;