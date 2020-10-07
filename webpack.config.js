const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    module: {
      rules: [
        {
          test: /\.css$/i,
          include: /src/,
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
      new MiniCssExtractPlugin({
        filename: '[name].[hash:8].css',
        chunkFilename: '[id].css',
      }),
      new HtmlWebpackPlugin({
        template: './src/template.html',
        filename: 'index.html',
        minify: false,
      }),
    ]
  }
}