const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {
      "child_process": false, // Menambahkan fallback untuk child_process
      "fs": false, // Jika Anda juga menggunakan modul fs
      "util": require.resolve("util/"), // Tambahkan ini untuk mendukung modul 'util'
      "path": require.resolve("path-browserify"), // Tambahkan fallback untuk path
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
