const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      filename: '[name].[hash:8].js',
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
        cacheGroups: {
          // It separates node_modules files & app files,
          // and creates different bundle files for caching purpose
          common: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.ENV': {
          BUILD_VERSION: JSON.stringify(pkgJson.version),
        },
      }),
      
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),

      new MiniCssExtractPlugin({
        filename: '[name].[hash:8].css', // app.35849831.css
        chunkFilename: '[id].[hash:8].css', // 1.35849831.css
      }),
      
      // It's used to remove unwanted files (Ex. moment locale files) from bundle
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      
      new HtmlWebpackPlugin({
        template: './src/template.html',
        filename: 'index.html',
        minify: false,
      }),
    ]
  }
}