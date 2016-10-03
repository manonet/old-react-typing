var path = require("path");
var webpack = require("webpack");
var debug = process.env.NODE_ENV !== "production";

module.exports = {
  context: path.resolve(__dirname + "/app"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./scripts/entry.js",
  output: {
    path: path.resolve(__dirname + "/app"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style!css",
        exclude: /node_modules/
      },
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
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
  ]
};
