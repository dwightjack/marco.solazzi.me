/**
 * Node Sass Functions
 */

'use strict';

const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const sizeOf = require('image-size');
const datauri = require('datauri').sync;

const paths = require('../config/paths');

let types;

try {
    types = require('node-sass').types;
} catch (e) {
    types = require('gulp-sass/node_modules/node-sass').types;
}

module.exports = function () {


    const rootPath = paths.toAbsPath('src.root');
    const baseRegExp = new RegExp('^' + _.escapeRegExp(rootPath + path.sep));
    const baseUrl = '/' + paths.toAbsPath('src.assets/images').replace(baseRegExp, '').replace(path.sep, '/').trim('/') + '/';

    return {

        'build-env()': function () {
            return new types.String(process.env.NODE_ENV);
        },
        'map-to-JSON($map)': function (map) {
            const obj = {};
            _.times(map.getLength(), function (i) {
                var key = map.getKey(i).getValue().toString();
                obj[key] = map.getValue(i).getValue();
            });
            return new types.String(JSON.stringify(obj));
        },
        'image-url($path)': function (filepath) {
            const imagePath = path.join(paths.toAbsPath('src.assets/images'), filepath.getValue());
            let imageUrl = (baseUrl + filepath.getValue());
            if (!fs.existsSync(imagePath)) {
                console.warn('File %s not found', imagePath);
                return false;
            }
            if (process.env.NODE_ENV !== 'production') {
                imageUrl += '?' + Date.now();
            }
            return new types.String('url(\'' + imageUrl + '\')');
        },
        'image-width($path)': function (filepath) {
            const imagePath = path.join(paths.toAbsPath('src.assets/images'), filepath.getValue());
            if (!fs.existsSync(imagePath)) {
                console.warn('File %s not found', imagePath);
                return false;
            }
            return new types.Number(sizeOf(imagePath).width, 'px');
        },
        'image-height($path)': function (filepath) {
            const imagePath = path.join(paths.toAbsPath('src.assets/images'), filepath.getValue());
            if (!fs.existsSync(imagePath)) {
                console.warn('File %s not found', imagePath);
                return false;
            }
            return new types.Number(sizeOf(imagePath).height, 'px');
        },
        'inline-image($path)': function (filepath) {
            const imagePath = path.join(paths.toAbsPath('src.assets/images'), filepath.getValue());
            if (!fs.existsSync(imagePath)) {
                console.warn('File %s not found', imagePath);
                return false;
            }
            return new types.String('url(\'' + datauri(imagePath) + '\')');

        }
    };
};

