const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './js/app.js',
  output: {
      path: __dirname + "/dist",
      filename: 'app.bundle.js',
  },
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
