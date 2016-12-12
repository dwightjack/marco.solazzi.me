// MyPlugin.js
const isRegExp = require('lodash/isRegExp');

function HtmlWebpackPluginDeferScripts(options = {}) {
    this.options = Object.assign({
        scripts: []
    }, options);
}

HtmlWebpackPluginDeferScripts.prototype.apply = function apply(compiler) {
    const { scripts } = this.options;
    compiler.plugin('compilation', (compilation) => {

        compilation.plugin('html-webpack-plugin-alter-asset-tags', function (object, callback) {
            const filteredScripts = object.body.concat(object.head).filter((tag) => {
                if (!tag.attributes.src) {
                    return false;
                }
                if (isRegExp(scripts)) {
                    return scripts.test(tag.attributes.src);
                }
                return scripts.indexOf(tag.attributes.src) !== -1;
            });

            filteredScripts.forEach((tag) => {
                if (tag.tagName === 'script') {
                    tag.attributes.defer = 'defer';
                }
            });
            callback(null, object);
        });
    });

};

module.exports = HtmlWebpackPluginDeferScripts;