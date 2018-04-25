// webpack.config.js
// var webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  devtool: 'eval',
  // This will be our app's entry point (webpack will look for it in the 'src' directory due to the modulesDirectory setting below). Feel free to change as desired.
  entry: [
    'index.tsx',
  ],
  // Output the bundled JS to dist/app.js
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '../dist/[name].bundle.js',
    path: __dirname + '/dist',
    publicPath: '/'
  },
  resolve: {
    // Look for modules in .ts(x) files first, then .js(x)
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    // Add 'src' to our modulesDirectories, as all our app code will live in there, so Webpack should look in there for modules
    modules: ['ts', 'node_modules'],
  },
  module: {
    rules: [
      // .ts(x) files should first pass through the Typescript loader, and then through babel
      { test: /\.tsx?$/, use:['babel-loader','ts-loader'] },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      { test: /\.txt$/, 
        use: ['raw-loader'] 
      },
      { test: /\.html$/, 
        use: ['html-loader'] 
      }
    ]
  },
  plugins: [
    // Set up the notifier plugin - you can remove this (or set alwaysNotify false) if desired
    new WebpackNotifierPlugin(
      { 
        alwaysNotify: true,
        title:'Code splitting'
      }
    ),
  ]
};