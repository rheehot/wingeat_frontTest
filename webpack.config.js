const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devServer: {
    hot: true,
    inline: true,
    port: 3000,
    host: 'localhost',
  },
  performance: {
    maxEntrypointSize: 400000,
    maxAssetSize: 1000000,
  },
  resolve: {
    alias: {
      Style: path.resolve(__dirname, 'src/Style/'),
    },
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(scss|sass)$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
