var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './examples/index',
  output: {
    path: './',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 3000
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css|.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?sourceMap&modules&localIdentName=[local]!postcss-loader'
        ),
      }
    ]
  },
  postcss: function() {
    return [
      require('precss')(),
      require('autoprefixer')(),
    ];
  },
  plugins: [
    new ExtractTextPlugin("bundle.css", { allChunks: true })
  ]
}