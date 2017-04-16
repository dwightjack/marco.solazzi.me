const path = require('path');
const get = require('lodash.get');
const glob = require('glob');

const paths = {

    src: {
        root: 'app',
        assets: 'app/assets'
    },

    dist: {
        root: 'public', //where static files are to be saved
        assets: 'public/assets'
    },

    publicPath: '/assets/',

    js: 'js',
    styles: 'styles',
    images: 'images',
    fonts: 'fonts',
    audio: 'audio',
    video: 'video',
    vendors: 'vendors',

    tmp: '.tmp'
};

module.exports = paths;

const translatePath = (pathMatch) => pathMatch.split('/').map((frag) => get(paths, frag, frag));

module.exports.toPath = (pathMatch) => (
    path.join.apply(null, translatePath(pathMatch))
);

module.exports.toAbsPath = (pathMatch) => (
    path.join.apply(null, [process.cwd()].concat(translatePath(pathMatch)))
);

module.exports.assetsPath = (match) => {
    const filepath = glob.sync(match, { cwd: paths.toAbsPath('dist.assets/') }).pop();
    return filepath;
};