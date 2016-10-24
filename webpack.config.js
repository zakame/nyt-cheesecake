/*jshint node: true */
'use strict';

var webpack = require('webpack');

module.exports = {
  devServer: {
    compress: true,
    contentBase: './public',
    historyApiFallback:true,
    host: '0.0.0.0',
    port: '8080',
    proxy: {
      '/nytfeedfun': {
        target: 'http://backend:3000'
      }
    },
    stats: 'errors-only'
  },
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './public/js/index.js'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot-loader!babel-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      { test: /\.(ttf|eot)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /bootstrap\/js\//,
        loader: 'imports-loader?jQuery=jquery'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};
