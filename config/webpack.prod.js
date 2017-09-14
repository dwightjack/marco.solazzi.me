const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

const webpackConf = require('./webpack.base');
const paths = require('./paths');

module.exports = merge.smart(webpackConf, {
    entry: {
        app: [
            './' + paths.toPath('src.assets/styles') + '/index.js',
            './' + paths.toPath('src.assets/js') + '/app.js'
        ]
    },

    output: {
        filename: paths.js + '/[name].[chunkhash].js',
        chunkFilename: paths.js + '/[name].[chunkhash].chunk.js'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compressor: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        new ExtractTextPlugin({
            filename: paths.styles + '/[name].[contenthash:10].css'
        }),

        new HtmlWebpackPlugin({
            template: paths.toPath('src.root/templates') + '/index.ejs',
            filename: paths.toAbsPath('dist.root') + '/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: false,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            modernizr: paths.assetsPath('vendors/modernizr/modernizr.*'),
            inject: true,
            chunksSortMode: 'dependency'
        }),
        new ScriptExtHtmlWebpackPlugin({
            //@see https://calendar.perfplanet.com/2016/prefer-defer-over-async/
            defaultAttribute: 'defer'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendors']
        })
    ]
});