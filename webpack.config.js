const path = require('path');

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 9000,
    historyApiFallback: true,
    hot: true,
  },
}