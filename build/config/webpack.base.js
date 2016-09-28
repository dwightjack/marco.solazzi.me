const webpack = require('webpack');
const paths = require('./paths');
const srcPath = paths.toAbsPath('src.assets');
const destPath = paths.toAbsPath('dist.assets');

const sassFunctions = require('../scripts/sass-functions');

module.exports = {
    context: process.cwd(),
    externals: {},
    entry: {},
    target: 'web', // Make web variables accessible to webpack, e.g. window
    stats: false, // Don't show stats in the console
    progress: true,
    output: {
        path: destPath,
        publicPath: paths.publicPath,
        chunkFilename: paths.js + '/[name].chunk.js',
        filename: paths.js + '/[name].js'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'PRODUCTION': (process.env.NODE_ENV === 'production'),
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: /gsap/, //fix gsap
                loader: 'imports?define=>false'
            }, {
                test: /\.js$/,
                include: [srcPath],
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
            }, {
                test: /\.html$/,
                exclude: /(node_modules|vendors)/,
                loader: 'raw-loader'
            }, {
                test: /\.json$/,
                exclude: /(node_modules|vendors)/,
                loader: 'json-loader'
            }
        ]
    },

    sassLoader: {
        precision: 10,
        includePaths: [
            paths.toPath('src.assets/sass'),
            paths.toPath('src.assets/vendors'),
            'node_modules'
        ],
        functions: sassFunctions,
        outputStyle: 'expanded'
    },

    resolve: {
        alias: {
            scss: paths.toAbsPath('src.assets/sass'),
            vendors: paths.toAbsPath('src.assets/vendors'),
            images: paths.toAbsPath('src.assets/images'),
            base: paths.toAbsPath('src.assets/js/base')
        },
        modulesDirectories: ['node_modules', paths.toPath('src.assets/vendors')]
    }
};