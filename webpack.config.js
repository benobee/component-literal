/****************************************/
/*******     WEBPACK CONFIG     *********/
/****************************************/

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

/****************************************/
/*******     CONFIG OBJECT      *********/
/****************************************/

const WEBPACK_CONFIG = { module: {} };

/****************************************/
/*******      ENVRIONMENTS      *********/
/****************************************/

/*
 * test whether the script will be run in
 * production using "npm run build" from
 * the terminal.
*/

if (process.env.PROD_ENV === 'true') {
    const isProduction = true;
}

/***************************************/
/*********       INPUT        **********/
/***************************************/
const input = {
    context: __dirname,
    entry: ['./dist/component.js'],
    devtool: isProduction ? '' : 'eval',
    node: {
        fs: 'empty'
    }
};

//extend properties to config
Object.assign(WEBPACK_CONFIG, input);

/****************************************/
/********   LOADERS / RULES   ***********/
/****************************************/

/*
 * each loader will push to this rules
 * array then added to WEBPACK_CONFIG.
*/

const rules = [];

/*********************/

// @rule: ES Lint

const eslint = {
    test: /\.js$/,
    enforce: 'pre',
    loader: 'eslint-loader',
    exclude: /dist/,
    options: {
      emitWarning: true,
    }
};

rules.push(eslint);

/*********************/

// @rule: Babel
const babel = {
    test: /\.js$/, 
    exclude: [/node_modules/, /dist/],
    use: [
        {
            loader: 'babel-loader',
            options: { presets: 
                ['es2015'] //NEED TO USE WEBPACK MODULES INSTEAD
            }       
        }
    ]
};

rules.push(babel);

/*********************/

// @rule: json
const jsonLoader = { 
    test: /\.json$/,
    use: [
        {
            loader: "json-loader",
        }
    ]
};

rules.push(jsonLoader);

/*********************/

WEBPACK_CONFIG.module.rules = rules;

/***************************************/
/**********      PLUGINS      **********/
/***************************************/

/*
 * each plugin will push to this plugins
 * array. Some will only be pushed when
 * config is set to production. 
*/

const plugins = [];

/*********************/

// @plugin: node env
const nodeENV = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
});

isProduction ? plugins.push(nodeENV) : false;

/*********************/

// @plugin: handling es6 promises
const promises = new webpack.ProvidePlugin({
    'Promise': 'es6-promise', 
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
});

plugins.push(promises);

/*********************/

// @plugin: for minifying javascript
const minify = new webpack.optimize.UglifyJsPlugin({
    compress: { 
        warnings: false 
    },
    output: {
        comments: false
    },
    minimize: true,
    debug: true,
    sourceMap: true,
    minify: true,
});

//if production is set, js will be minified
if (isProduction) {
    plugins.push(minify);
}

//output to config object
WEBPACK_CONFIG.plugins = plugins;

/************************************/
/********       OUTPUT        *******/
/************************************/

const output = {
    output: {
          publicPath: '/',
          path: __dirname + "/dist",
          filename: isProduction ? "component-literal.min.js" : "component-literal.js"
    }
};

//extend properties to config
Object.assign(WEBPACK_CONFIG, output);

//export config
module.exports = WEBPACK_CONFIG;