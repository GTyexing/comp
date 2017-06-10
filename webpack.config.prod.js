const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'react-router-redux',
    ],
    main: path.join(__dirname, 'app/main.jsx'),
  },
  output: {
    path: `${__dirname}/build`,
    chunkFilename: '[name].chunk.js',
    filename: '[name].[chunkhash].js',
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor'] }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
      sourceMap: true,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
      title: 'wisdom-classroom',
    }),
  ],
};
