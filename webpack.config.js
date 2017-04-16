const path = require("path");
const webpack = require("webpack");
const debug = process.env.NODE_ENV !== "production";

module.exports = {
  context: path.resolve(__dirname + "/app"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./entry.js",
  output: {
    path: path.resolve(__dirname + "/app"),
    filename: "bundle.js"
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
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
  ]
};
