const webpack = require('webpack');
const _ = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConf = require('./webpack.base');
const paths = require('./paths');

const getModernizrPath = require('../scripts/utils').getModernizrPath;

const config = _.assign({}, webpackConf, {

    entry: {
        app: [
            './' + paths.toPath('src.assets/js') + '/app.js'
        ]
    },

    output: _.assign({}, webpackConf.output, {
        filename: paths.js + '/[name].[chunkhash:10].js',
        chunkFilename: paths.js + '/[name].[chunkhash:10].chunk.js'
    }),

    debug: false,

    devtool: '#source-map',

    plugins: webpackConf.plugins.concat([
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            children: true,
            minChunks: 2,
            async: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compressor: {
                warnings: false
            }
        }),
        // new webpack.BannerPlugin(
        //     _.template(options.banners.application)(options),
        //     {entryOnly: true, raw: true}
        // ),

        new ExtractTextPlugin(paths.css + '/[name].[contenthash:10].css'),

        new HtmlWebpackPlugin({
            template: paths.toPath('src.root') + '/index.ejs',
            filename: paths.toAbsPath('dist.root') + '/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: false,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            modernizr: getModernizrPath(),
            inject: true
        })
    ]),

    postcss: function () {
        return [autoprefixer];
    }
});

config.module.loaders = webpackConf.module.loaders.concat([
    {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: [paths.toAbsPath('src.assets/fonts')],
        loader: 'file-loader?name=[path][name].[hash:10].[ext]&context=' + paths.toPath('src.assets')
    }, {
        test: /\.(jpg|png|gif)$/,
        include: [paths.toAbsPath('src.assets/images')],
        loaders: [
            'file-loader?name=[path][name].[hash:10].[ext]&context=' + paths.toPath('src.assets'),
            'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
    }, {
        test: /\.(scss|css)$/,
        exclude: /(node_modules|vendors)/,
        loader: ExtractTextPlugin.extract(
            'style', // The backup style loader
            'css?sourceMap!postcss!sass?sourceMap'
        )
    }
]);


module.exports = config;