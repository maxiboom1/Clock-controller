const path = require('path');

module.exports = {
  mode: 'production', // 'development' for development
  entry: './src/app.ts', // starting point of your application
  target: 'node', // targeting Node.js
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // resolve these extensions
  },
  output: {
    filename: 'app.js', // output file
    path: path.resolve(__dirname, 'dist'), // output path
  },
};
