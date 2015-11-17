var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'public'),
  entry: path.join('..', 'client', 'app.jsx'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css!less')
      }, {
        test: /\.png$/,
        loader: 'url?limit=1000&name=images/[name].[ext]?[hash:6]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('app.min.css'),
    //new webpack.optimize.UglifyJsPlugin({
    //  minimize: true,
    //  compress: {
    //    warnings: false
    //  }
    //})
  ]
};
