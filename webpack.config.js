module.exports = {
  entry: './client/app.jsx',
  output: {
    filename: './public/bundle.js'
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
        loader: 'style!css!less'
      }, {
        test: /\.png$/,
        loader: 'url?limit=100000'
      }
    ]
  }
};
