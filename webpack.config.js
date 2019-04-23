/* webpack.config.js */

const path    = require('path');
const webpack = require('webpack');

const srcPath  = path.resolve(__dirname, './src');
const distPath = path.resolve(__dirname, './dist');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebPackPlugin({
  template: './index.html',
  filename: './index.html'
});

module.exports = {
  context: srcPath,
  resolve: {
    alias: {
      utilities: path.resolve(srcPath, './utilities'),
      components: path.resolve(srcPath, './components'),
      api: path.resolve(srcPath, './api'),
    }
  },
  entry: {
    index: './index.jsx',
  },
  output: {
    path: distPath,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', {loader: 'css-loader', options: {url: false}}]
      }, {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {module: false}],
              'react'
            ],
            plugins: [
              'babel-plugin-transform-class-properties',
              'transform-object-rest-spread'
            ]
          }
        }],
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [htmlPlugin],
  devServer: {
    contentBase: distPath,
    compress: true,
    port: 8080
  },
  devtool: 'cheap-source-map',
};
