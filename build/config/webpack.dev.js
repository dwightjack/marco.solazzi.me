const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const _ = require('lodash');

const getModernizrPath = require('../scripts/utils').getModernizrPath;
const paths = require('./paths');
const webpackConf = require('./webpack.base');


const loaders = webpackConf.module.loaders.map((loader) => {
    if (loader.loader === 'babel-loader') {
        loader.query.presets = ['react-hmre'];
    }
    return loader;
});

const config = _.assign({}, webpackConf, {

    entry: {
        app: [
            'eventsource-polyfill', // Necessary for hot reloading with IE
            'webpack-hot-middleware/client',
            './' + paths.toPath('src.assets/js') + '/app.js'
        ]
    },

    debug: true,

    devtool: '#cheap-module-source-map',

    plugins: webpackConf.plugins.concat([
        // Tell webpack we want hot reloading
        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({
            template: paths.toPath('src.root') + '/index.ejs',
            inject: true,
            minify: false,
            filename: paths.toAbsPath('dist.root') + '/index.html',
            modernizr: getModernizrPath()
        })
    ]),

    postcss: function () {
        return [autoprefixer];
    }

});

config.module.loaders = loaders.concat([
    {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: [paths.toAbsPath('src.assets/fonts')],
        loader: 'file-loader?name=[path][name].[ext]&context=' + paths.toPath('src.assets')
    }, {
        test: /\.(jpg|png|gif)$/,
        include: [paths.toAbsPath('src.assets/images')],
        loader: 'file-loader?name=[path][name].[ext]&context=' + paths.toPath('src.assets')
    }, {
        test: /\.(scss|css)$/,
        exclude: /(node_modules|vendors)/,
        loaders: [ 'style', 'css?importLoaders=1&sourceMap', 'resolve-url?sourceMap', 'postcss', 'sass?sourceMap' ]
    }
]);

module.exports = config;