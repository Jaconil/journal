const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'public'),
  entry: path.join('..', 'client', 'app.jsx'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.min.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'images/[name].[ext]?[hash:6]'
        }
      },
      {
        test: /\.svg/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash:6]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'app.min.css' }),
    new webpack.optimize.UglifyJsPlugin({
      uglifyOptions: process.env.NODE_ENV === 'production'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      _: 'lodash'
    })
  ]
};
