const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      favicon: './src/assets/React_Logo.ico',
    }),
    new ESLintPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  // 'none' | 'development' | 'production'
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    port: 3000,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|png)$/,
        // use: {
        //   loader: 'url-loader',
        // },
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, 'src'),
    },
  },
};
