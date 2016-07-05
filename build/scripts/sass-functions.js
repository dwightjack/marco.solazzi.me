/**
 * Node Sass Functions
 */

'use strict';

const path = require('path');
const fs = require('fs');
const times = require('lodash/times');
const sizeOf = require('image-size');

const paths = require('../config/paths');

let types;

try {
    types = require('node-sass').types;
} catch (e) {
    types = require('gulp-sass/node_modules/node-sass').types;
}

module.exports = {

    'build-env()': function () {
        return new types.String(process.env.NODE_ENV);
    },
    'map-to-JSON($map)': function (map) {
        const obj = {};
        times(map.getLength(), function (i) {
            var key = map.getKey(i).getValue().toString();
            obj[key] = map.getValue(i).getValue();
        });
        return new types.String(JSON.stringify(obj));
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
    }
};

