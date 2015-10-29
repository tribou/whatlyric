// Webpack config file
require('babel/register');
const Path = require('path');
const jsBundle = require('../build/utils.js').getJsBundle();

module.exports = {
  entry: './web/react/app.js',
  output: {
    path: Path.resolve(__dirname, '../web/static/js'),
    filename: jsBundle,
  },
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: [ 'style', 'css', 'sass' ],
      },
    ],
  },
};

