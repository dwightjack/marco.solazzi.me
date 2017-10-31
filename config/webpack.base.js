const { loadConfig } = require('umeboshi-dev-utils');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = loadConfig('paths.js');

let baseConfig;

try {
    baseConfig = require('umeboshi-config-vue/webpack/webpack.base');
} catch () {
    baseConfig = require('umeboshi-config/webpack/webpack.base');
}

baseConfig.plugins.push(
    new CopyWebpackPlugin([{
        from: paths.toAbsPath('src.assets/favicons/'),
        to: paths.toAbsPath('dist.root')
    }])
);

module.exports = baseConfig;