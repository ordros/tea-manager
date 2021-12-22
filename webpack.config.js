const path = require('path');

const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: outputPath,
  },
  devServer: {
    static: outputPath,
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/react',
          ],
        },
      },
    },
    {
      test: /\.tsx?$/,
      use: {
        loader: 'ts-loader',
      },
    },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  target: ['web', 'es5'],
};
