const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

let mode = 'production';
let entry = './lib/index.ts';
let outputPath = path.resolve(__dirname, 'dist');

if (process.env.TESTBUILD) {
  mode = 'development';
  entry = './test/index.ts';
  outputPath = path.resolve(__dirname, 'test-dist');
}

module.exports = {
  entry: entry,
  mode: mode,
  output: {
    path: outputPath,
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
  resolveLoader: {
    modules: [
      path.resolve(__dirname, 'webpack/loaders'),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsv$/,
        use: {
          loader: 'pua-tsv-loader'
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