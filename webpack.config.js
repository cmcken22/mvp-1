var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './src');

const config = {
   entry: {
     main: APP_DIR + '/main.js'
   },
   output: {
     filename: 'bundle.js',
     path: BUILD_DIR,
     publicPath: '/'
   },
   resolve: {
     extensions: [".js", ".jsx"]
   },
   module: {
    rules: [
     {
       test: /(\.css|.scss)$/,
       use: [{
           loader: "style-loader" // creates style nodes from JS strings
       }, {
           loader: "css-loader" // translates CSS into CommonJS
       }, {
           loader: "sass-loader" // compiles Sass to CSS
       }]
     },
     { 
       test: /\.(png|woff|woff2|eot|ttf|otf|svg)$/, loader: 'url-loader'
     },
     {
       test: /\.(jsx|js)?$/,
       use: [{
         loader: "babel-loader",
         options: {
           cacheDirectory: true,
          // presets: ['react', 'es2015'], // Transpiles JSX and ES6
          presets: [['es2015', {modules:false}], 'react'],
          plugins: ['transform-class-properties']
         }
       }]
     }
    ],

  }
};

module.exports = config;