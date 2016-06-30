const path = require('path');
const _ = require('lodash');

const paths = {

    src: {
        root: 'application',
        assets: 'application/assets'
    },

    dist: {
        root: 'dist', //where static files are to be saved
        assets: 'dist/assets'
    },

    js: 'js',
    sass: 'scss',
    css: 'css',
    images: 'images',
    fonts: 'fonts',
    audio: 'audio',
    video: 'video',
    vendors: 'vendors',

    tmp: '.tmp'
};

module.exports = paths;

const translatePath = (pathMatch) => pathMatch.split('/').map((frag) => _.get(paths, frag, frag));

module.exports.toPath = (pathMatch) => {
    return path.join.apply(null, translatePath(pathMatch));
};

module.exports.toAbsPath = (pathMatch) => {
    return path.join.apply(null, [process.cwd()].concat(translatePath(pathMatch)));
}