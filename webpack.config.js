/*jshint node: true */
'use strict';

var webpack = require('webpack');

module.exports = {
  devServer: {
    compress: true,
    contentBase: './public',
    host: '0.0.0.0',
    port: '8080',
    proxy: {
      '/nytfeedfun': {
        target: 'http://backend:3000'
      }
    },
    stats: 'errors-only'
  },
  entry: ['bootstrap-loader','./public/js/index.js'],
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
        loader: 'babel-loader',
        query: {
          plugins: ['syntax-class-properties','transform-class-properties'],
          presets: ['es2015','react']
        }
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      { test: /\.(ttf|eot)$/,
        loader: 'file'
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: 'url?limit=10000'
      },
      {
        test: /bootstrap-sass\/assets\/javascripts\//,
        loader: 'imports?jQuery=jquery'
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
