"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlTagsPlugin = require("html-webpack-tags-plugin");

module.exports = (_env, args) => ({
  externals: {
    cesium: "Cesium",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {},
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify("/cesium"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "node_modules/cesium/Build/Cesium",
          to: "cesium",
        },
      ],
    }),
    new HtmlPlugin({
      template: "index.html",
    }),
    new HtmlTagsPlugin({
      append: false,
      tags: ["cesium/Widgets/widgets.css", "cesium/Cesium.js"],
    }),
  ],
});
