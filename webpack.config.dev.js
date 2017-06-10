const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: './app',
    port: 8888,
  },
  devtool: 'cheap-module-eval-source-map',
  entry: path.join(__dirname, 'app/main.jsx'),
  output: {
    path: `${__dirname}/build`,
    chunkFilename: '[name].chunk.js',
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]"',
        }),
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'node_modules'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: { loader: 'url-loader', options: { limit: 100000 } },
      },
      {
        test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
        use: {
          loader: 'url-loader',
          options: { limit: 100000, prefix: 'fonts' },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true,
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:8888' }),
  ],
};
