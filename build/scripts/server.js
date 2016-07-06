/* eslint consistent-return:0 */
const chalk = require('chalk');
const express = require('express');
const path = require('path');

const paths = require('../config/paths');
const production = process.env.NODE_ENV === 'production';
const outputPath = paths.toAbsPath('dist.root');
const portfinder = require('portfinder');
const address = require('ip').address();


const listen = (app, port) => {
    // Start your app.
    app.listen(port, (err) => {
        if (err) {
            return console.log(chalk.bold.red(err.message));
        }
        console.log(chalk.green('\nStarted a server at http://%s:%s\n'), address, port);
    });
};

const app = express();

app.use(express.static(outputPath));

if (production) {

    portfinder.getPort((err, port) => {
        app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
        listen(app, port);
    });

} else {
    const webpackConfig = require('../config/webpack.dev');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');


    // get the intended port number, use port 3000 if not provided
    portfinder.getPort((err, port) => {
        //TODO: temporary fix for https://github.com/mxstbr/react-boilerplate/issues/370 and https://github.com/webpack/style-loader/pull/96
        const publicPath = 'http://' + address + ':' + port + paths.publicPath;

        webpackConfig.output.publicPath = publicPath;

        const compiler = webpack(webpackConfig);
        const middleware = webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: publicPath,
            silent: true,
            stats: 'errors-only'
        });

        app.use(middleware);
        app.use(webpackHotMiddleware(compiler));

        // Since webpackDevMiddleware uses memory-fs internally to store build
        // artifacts, we use it instead
        const fs = middleware.fileSystem;

        app.get('*', (req, res) => {
            fs.readFile(path.join(outputPath, 'index.html'), (err, file) => {
                if (err) {
                    res.sendStatus(404);
                } else {
                    res.send(file.toString());
                }
            });
        });

        listen(app, port);

    });

}



