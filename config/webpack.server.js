/**
 * Development Server Config
 */
const webpack = require('webpack');
const address = require('ip').address();
const localhost = require('./hosts').local;

module.exports = {
    entry: {
        app: [
            'eventsource-polyfill', // Necessary for hot reloading with IE
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://' + address + ':' + localhost.port,
            'webpack/hot/only-dev-server'
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};