# Resume

> Marco Solazzi Personal Website

## Features
* [React](https://facebook.github.io/react/) and [Webpack 2](https://webpack.js.org/) with HMR 
* ES6+ and JSX with [Babel](https://babeljs.io/)
* Unit test with [Jest](https://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/)
* CSS and JS linting with [ESLint](http://eslint.org/) (airbnb preset) and [Stylelint](https://stylelint.io/)
* [Sass](http://sass-lang.com/) with [node-sass](https://github.com/sass/node-sass) 
* CSS [post-processing](https://github.com/postcss/postcss)
* [CSS Modules](https://github.com/css-modules/css-modules)
* Em based media-queries via [sass-mq](https://github.com/sass-mq/sass-mq)



## Requirements

* Node.js >= 6.9.0 (we strongly suggest to use something like [nvm](https://github.com/creationix/nvm))
* npm or [yarn](https://yarnpkg.com/lang/en/)

## Installation

Clone this repo:

    git clone git://github.com/dwightjack/umeboshi.git

From project root:

* `npm install` or `yarn`

## Scripts

Either use `npm run <script>` or `yarn run <script>`

* `start`: start development mode
* `server`: run a static web server
* `test`: run jest
* `build`: generate a development build (will also lint files)
* `build:production`: generate a production build
* `eslint`: lint JS files
* `stylelint`: lint SCSS/CSS files
* `lint`: lint both styles and JS files


## Development 

To run the boilerplate in development mode (uses [webpack dev server](https://webpack.js.org/configuration/dev-server/)) run:

```
yarn start
```