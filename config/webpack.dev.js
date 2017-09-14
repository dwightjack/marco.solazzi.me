const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const merge = require('webpack-merge');

const paths = require('./paths');
const webpackConf = require('./webpack.base');

module.exports = merge.smart(webpackConf, {
    entry: {
        app: [
            './' + paths.toPath('src.assets/styles') + '/index.js',
            './' + paths.toPath('src.assets/js') + '/app.js'
        ]
    },

    cache: true,

    plugins: [
        new HtmlWebpackPlugin({
            template: paths.toPath('src.root/templates') + '/index.ejs',
            inject: true,
            minify: false,
            filename: paths.toAbsPath('dist.root') + '/index.html',
            modernizr: paths.assetsPath('vendors/modernizr/modernizr.*'),
            chunksSortMode: 'dependency'
        }),
        new ScriptExtHtmlWebpackPlugin({
            //@see https://calendar.perfplanet.com/2016/prefer-defer-over-async/
            defaultAttribute: 'defer'
        })
    ]
});