const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = require(`./webpack.${PRODUCTION ? 'prod' : 'dev'}.js`);