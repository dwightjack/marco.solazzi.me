/**
 * Node Sass Functions
 */
const times = require('lodash/times');
const { types } = require('node-sass');

module.exports = {

    'build-env()': function buildEnv() {
        return new types.String(process.env.NODE_ENV);
    },
    'map-to-JSON($map)': function mapToJSON(map) {
        const obj = {};
        times(map.getLength(), (i) => {
            const key = map.getKey(i).getValue().toString();
            obj[key] = map.getValue(i).getValue();
        });
        return new types.String(JSON.stringify(obj));
    }
};

