const glob = require('glob');
const path = require('path');
const paths = require('./../config/paths');

module.exports.getAssetPath = (searchpath) => {
    const filepath = glob.sync(paths.toAbsPath('dist.assets/' + searchpath)).pop();
    const folder = path.dirname(searchpath);
    return filepath ? (paths.toPath(folder) + '/' + path.basename(filepath)) : null;
};