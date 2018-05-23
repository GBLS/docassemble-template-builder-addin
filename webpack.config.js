const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    aliasFields: ["browser"]
  },
  entry: {
    polyfill: "babel-polyfill",
    app: './src/js/index.js'
  },
  module: {
    rules: [
      {
	test: /\.js$/,
	exclude: /node_modules/,
	loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: ['polyfill', 'app']
    })
  ]
};
