/* eslint consistent-return:0 */
const chalk = require('chalk');
const express = require('express');
const path = require('path');

const paths = require('../config/paths');
const production = process.env.NODE_ENV === 'production';
const outputPath = paths.toAbsPath('dist.root');

const app = express();

app.use(express.static(outputPath));

if (production) {
    app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
} else {
    const webpackConfig = require('../config/webpack.dev');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(webpackConfig);
    const middleware = webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: paths.publicPath,
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
}

// get the intended port number, use port 3000 if not provided
const port = 3000;

// Start your app.
app.listen(port, (err) => {
    if (err) {
        return console.log(chalk.bold.red(err.message));
    }
});