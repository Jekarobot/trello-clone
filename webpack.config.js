const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true
  }
};
