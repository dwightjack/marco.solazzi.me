const paths = require('./paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';

const loaders = [
    { loader: 'css-loader',
        options: {
            importLoaders: 1,
            sourceMap: true
        }
    },
    { loader: 'resolve-url-loader', options: { sourceMap: true } },
    { loader: 'postcss-loader', options: { sourceMap: true } },
    'resolve-url-loader',
    { loader: 'sass-loader',
        options: {
            sourceMap: true,
            precision: 10,
            includePaths: [
                paths.toAbsPath('src.assets/styles'),
                'node_modules'
            ],
            functions: require('../scripts/sass-functions'),
            outputStyle: 'expanded'
        }
    }
];

module.exports = (PRODUCTION ? ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: loaders
}) : ['style-loader'].concat(loaders));


module.exports.loaders = loaders;