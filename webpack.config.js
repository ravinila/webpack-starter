const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const env = process.env.NODE_ENV;
// console.log('env', env);

module.exports = env => {  
  console.log('environment', env);
  const DEBUG = env.mode !== 'production';

  return {
    mode: env.mode,
    devtool: 'source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      port: 9000,
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
      extensions: ['.js', '.jsx', '.css'],
      alias: {
        // lodash: path.resolve(__dirname, './node_modules/lodash'),
        // moment: path.resolve(__dirname, './node_modules/moment/moment.js'),
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          // use: ['style-loader', 'css-loader'],
          use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '../',
              hmr: env.mode === 'development',
              reloadAll: true,
            },

          }, 'css-loader'],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'vendors',
      }
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[hash:8].css',
        chunkFilename: '[id].css',
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