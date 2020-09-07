const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

let mode  = 'production';
let entry = './lib/index.ts';
let outputPath = path.resolve(__dirname, 'dist');
let configFile = path.resolve(__dirname, 'tsconfig.prod.json');
let devtool = false;

if ('development' === process.env.PROJ_ENV) {
  mode  = 'development';
  entry = './test/index.ts';
  outputPath = path.resolve(__dirname, 'test-dist');
  configFile = path.resolve(__dirname, 'tsconfig.dev.json');
  devtool = 'source-map';
}

module.exports = {
  entry: entry,
  mode:  mode,
  devtool: devtool,
  output: {
    path: outputPath,
    library: '@m80126colin/uni-hakka',
    libraryTarget: 'commonjs2',
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.tsv'],
    plugins: [
      new TsconfigPathsPlugin({ configFile: configFile })
    ]
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, 'webpack/loaders'),
      'node_modules',
    ],
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
          loader: 'pua-tsv-loader'
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: { configFile: configFile }
        }
      }
    ]
  }
};