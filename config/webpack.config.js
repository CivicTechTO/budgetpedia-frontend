// webpack.config.js
var webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  devtool: 'eval',
  // This will be our app's entry point (webpack will look for it in the 'src' directory due to the modulesDirectory setting below). Feel free to change as desired.
  entry: {
    main:'index.tsx',
  },
  // Output the bundled JS to dist/app.js
  output: {
    filename: '[name].bundle.js',
    // chunkFilename: '[name].bundle.js',
    path: '/Users/henrikbechmann/Servers/budgetpedia/www/budgetpedia.ca/dist',
    publicPath: '/dist/'
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
  optimization: {
    // runtimeChunk: 'single',
    splitChunks: {
       cacheGroups: {
        vendor: {
         test: /node_modules/,
         chunks: 'initial',
         name: 'vendor',
         enforce: true
        },
        // utilities: {
        //  test: '/ts/addons/exporer/modules/utilities.tsx',
        //  chunks: 'initial',
        //  name: 'utilities',
        //  enforce: true
        // }
       }
    },
  },
  plugins: [
    // Set up the notifier plugin - you can remove this (or set alwaysNotify false) if desired
    new WebpackNotifierPlugin(
      { 
        alwaysNotify: true,
        title:'Code splitting'
      },
      // new BundleAnalyzerPlugin()
    )
  ]
};




