const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './lib/index.ts',
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: '@m80126colin/uni-hakka',
    libraryTarget: 'commonjs2',
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts']
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsv$/,
        use: {
          loader: 'raw-loader'
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};