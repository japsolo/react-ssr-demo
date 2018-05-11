const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

var config = {
  mode: 'development',
  entry: {
    client: './src/client'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-bundle.js'
  },
  module: {
    rules: [
      { test: /js$/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'public' }
    ]),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ],
  devServer: {
    historyApiFallback: true
  }
}

module.exports = config
