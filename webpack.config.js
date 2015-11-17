var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname + '/public',
  entry: '../client/app.jsx',
  output: {
    path: __dirname + '/public',
    filename: '[name].min.js'
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
    new ExtractTextPlugin('[name].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ]
};
