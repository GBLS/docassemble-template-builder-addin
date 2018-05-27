const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let plugins = [
  new HtmlWebpackPlugin({
    inject: false,
    chunks: ['index'],
    filename: 'index.html',
    template: path.join(__dirname, 'public', 'index.html')
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }));
}

module.exports = {
  mode: 'production',
  entry: {
    index: path.join(__dirname, 'src', 'index.tsx'),
  },
  output: {
    path: path.resolve('build'),
    filename: 'static/js/[name].js'
  },
  resolve: {
    extensions: [".ts", ".tsx", '.js', '.jsx']
  },
  plugins: plugins,
  devtool: 'source-map',
  module: {
    rules: [
      {
	test: /\.tsx?$/,
	loader: "awesome-typescript-loader"
      },
      {
	enforce: "pre",
	test: /\.js$/,
	loader: "source-map-loader" },
      {
        test: /.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react'],
              plugins: ['transform-class-properties']
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|ico|png|gif|eot|woff|woff2|ttf|svg)$/i,
	use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[ext]'
            },
          },
	]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },  
  devServer: {
    publicPath: '/',
    contentBase: './build'
  }
}
