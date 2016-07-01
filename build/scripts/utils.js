const glob = require('glob');
const path = require('path');
const paths = require('./../config/paths');

module.exports.getModernizrPath = () => {
    const filepath = glob.sync(paths.toAbsPath('dist.assets/vendors/modernizr') + '/modernizr.*').pop();
    return filepath ? (paths.toPath('vendors/modernizr') + '/' + path.basename(filepath)) : null;
};