const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const fs = require('fs');
const ini = require('ini');

if (fs.existsSync('.env')) {
  const env = ini.decode(fs.readFileSync('.env', { encoding: 'utf8' }));
  for (const key of Object.keys(env)) {
    process.env[key] = env[key];
  }
}

const DEBUG = process.env.npm_lifecycle_event !== 'build';

const config = {
  entry: {
    app: './src/app.js',
  },
  output: {
    path: './dist',
    publicPath: '/',
    filename: 'js/[name].[hash].js',
    devtoolModuleFilenameTemplate(info) {
      return `webpack:///${encodeURI(info.resourcePath.replace('webpack://', '.'))}`;
    },
  },
  devServer: {
    port: 8090,
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel', 'eslint'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style', `css!resolve-url!${!DEBUG ? 'postcss!' : ''}sass?sourceMap`
        ),
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract(
          'style', `css!resolve-url!${!DEBUG ? 'postcss' : ''}`),
      },
      {
        test: /\.woff(2)?$/,
        loader: 'url',
        query: {
          name: 'fonts/[hash].[ext]',
          limit: 5000,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.ttf$|\.eot$/,
        loader: 'file',
        query: {
          name: 'fonts/[hash].[ext]',
        },
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'file',
        query: {
          name: 'assets/[hash].[ext]',
        },
      },
      { test: /\.html$/, loader: 'html' },
      { test: /\.pug/, loader: 'pug-loader' },
    ],
  },
  sassLoader: {
    data: '@import "globals.scss";\n',
    includePaths: './src/styles',
  },
  postcss() {
    return [autoprefixer];
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Sample Frontend Project',
      inject: 'head',
      template: './src/views/index.pug',
      filename: 'index.html',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      _: 'lodash',
    }),
    new webpack.DefinePlugin({
      DEBUG,
      API_URL: JSON.stringify(process.env.API_URL),
    }),
    new ExtractTextPlugin('styles/[name].[hash].css', { disable: DEBUG }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  devtool: DEBUG ? 'cheap-source-map' : '',
};

if (!DEBUG) {
  config.plugins.push(
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  );
} else {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = config;
