const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const pkgJson = require('./package.json');

// const env = process.env.NODE_ENV;
// console.log('env', env);

module.exports = env => {  
  console.log('environment', env);
  const IS_DEBUG_MODE = env.mode !== 'production';

  return {
    mode: env.mode,
    devtool: 'source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      port: 9009,
      historyApiFallback: true,
      hot: true,
    },
    entry: {
      app: './src/index.jsx'
    },
    output: {
      filename: IS_DEBUG_MODE ? '[name].js' : '[name].[contenthash:8].js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.scss'],
      alias: {
        // if there is a duplicate in any plugins alias makes webpack
        // to load only one instance and avoids duplicates
        // lodash: path.resolve(__dirname, './node_modules/lodash'),
        // moment: path.resolve(__dirname, './node_modules/moment/moment.js'),
      }
    },
    module: {
      rules: [
        {
          test: /\.s?css$/i,
          // use: ['style-loader', 'css-loader'],
          use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '../',
              hmr: IS_DEBUG_MODE,
              reloadAll: true,
            },

          }, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        // It's used to minify bundled js files
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: false,
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          }
        }),
        // It's used to minify bundled css files
        new OptimizeCSSAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
        name: 'vendors',
      }
    },
    plugins: [
      
      // It's to create global constants which can be configured at compile time
      new webpack.DefinePlugin({
        'process.ENV': {
          BUILD_VERSION: JSON.stringify(pkgJson.version),
        },
      }),

      // It's used to show bundle statistics/analysis after build
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),

      // It's used to extract css to separate files
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css', // app.a71bc45b.css
        chunkFilename: '[name].[contenthash:8].css', // vendors.a71bc45b.css
      }),
      
      // It's used to remove unwanted files (Ex. moment locale files) from bundle
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),

      // It's is to remove/clean your build folder(s).
      new CleanWebpackPlugin(),

      new HtmlWebpackPlugin({
        template: './src/template.html',
        filename: 'index.html',
        minify: false,
      }),

      // It's used for maintaining cache of each bundled files
      new webpack.HashedModuleIdsPlugin(),
    ]
  }
}