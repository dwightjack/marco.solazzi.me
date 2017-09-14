const path = require('path');
const webpack = require('webpack');

const paths = require('./paths');

const PRODUCTION = process.env.NODE_ENV === 'production';
const srcPath = paths.toAbsPath('src.assets');
const destPath = paths.toAbsPath('dist.assets');

const styleLoaders = require('./style-loaders');

module.exports = {
    context: process.cwd(),
    externals: {},
    entry: {},
    target: 'web', // Make web variables accessible to webpack, e.g. window,
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: true,
        version: true,
        cached: false,
        cachedAssets: false,
        reasons: false,
        source: false,
        errorDetails: false
    },
    performance: {
        hints: false
    },
    devtool: (PRODUCTION ? '#source-map' : '#cheap-module-source-map'),
    output: {
        path: destPath,
        publicPath: paths.publicPath,
        chunkFilename: paths.js + '/[name].chunk.js',
        filename: paths.js + '/[name].js'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            __PRODUCTION__: PRODUCTION,
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),

        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin(),

        // @see https://github.com/vuejs-templates/webpack/blob/master/template/build/webpack.prod.conf.js#L67
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            minChunks(module) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                );
            }
        })
    ],
    module: {
        rules: [
            { parser: { amd: false } },
            {
                test: /\.js$/,
                include: [path.join(srcPath, paths.js), path.join(srcPath, paths.styles)],
                loader: 'babel-loader',
                options: {
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
            }, {
                test: /\.(scss|css)$/,
                exclude: /(node_modules|vendors)/,
                use: styleLoaders
            }, {
                test: /\.(eot|svg|ttf|woff|woff2|jpe?g|png|gif)$/,
                include: [
                    paths.toAbsPath('src.assets/images'),
                    paths.toAbsPath('src.assets/fonts')
                ],
                loader: 'file-loader',
                options: {
                    name: (PRODUCTION ? '[path][name].[hash:10].[ext]' : '[path][name].[ext]'),
                    context: paths.toPath('src.assets')
                }
            }
        , {
            test: /.vue$/,
            include: [
                paths.toAbsPath('src.assets/js')
            ],
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: (PRODUCTION ? require('extract-text-webpack-plugin').extract({
                        fallback: 'vue-style-loader',
                        use: styleLoaders.loaders
                    }) : ['vue-style-loader'].concat(styleLoaders.loaders))
                },
                cssModules: {
                    modules: true,
                    camelCase: true,
                    importLoaders: 1,
                    sourceMap: true,
                    localIdentName: '[name]__[local]---[hash:base64:5]'
                }
            }
        }
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            styles: paths.toAbsPath('src.assets/styles'),
            images: paths.toAbsPath('src.assets/images'),
            '@': paths.toAbsPath('src.assets/js')
        },
        modules: ['node_modules', paths.toAbsPath('src.assets/vendors')]
    }
};