const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

let config = {
  context: path.join(__dirname, 'public'),
  entry: path.join('..', 'client', 'app.jsx'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.min.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel?presets[]=es2015&presets[]=react', exclude: /node_modules/ },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!less') },
      { test: /\.png$/, loader: 'url?limit=1000&name=images/[name].[ext]?[hash:6]' },
      { test: /\.svg/, loader: 'file?name=images/[name].[ext]?[hash:6]' }
    ]
  },
  postcss: [
    require('autoprefixer')({ browsers: ['last 2 versions'] })
  ],
  plugins: [
    new ExtractTextPlugin('app.min.css'),
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

if (production) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false
    }
  }));
}

module.exports = config;
