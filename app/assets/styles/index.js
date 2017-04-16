//put base styles on top
require('./app.scss');

if (__PRODUCTION__ === false) { //eslint-disable-line no-undef

    if (module.hot) {

        module.hot.accept('./app.scss', () => {
            require('./app.scss'); //eslint-disable-line global-require
        });
    }
}