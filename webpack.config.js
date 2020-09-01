const path = require('path');

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