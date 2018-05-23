module.exports = {
  resolve: {
    aliasFields: ["browser"]
  },
  entry: ["babel-polyfill", './src/js/index.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
};
