const path = require("path");
const webpack = require("webpack");


module.exports = {
  devtool: "source-map",
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,         // Match both .js and .jsx files
        exclude: /node_modules/,
        loader: "babel-loader",
        query:
          {
            presets:["react", "es2015", "stage-0"],
            plugins: ["react-html-attrs", "transform-class-properties", "transform-decorators-legacy"]
          }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader", // creates style nodes from JS strings
          query: {
            modules: true,
            sourceMaps: true
          }
        }, {
          loader: "css-loader?importLoaders=1" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }, {
          loader: "postcss-loader" // postprocesses your CSS with PostCSS plugins using postcss.config.js
        }]
      }

    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
