const path = require("path");
const { EnvironmentPlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const resolve = require("./webpack.config.resolve");
require("dotenv").config({ silent: true });

module.exports = () => {
  return {
    entry: ["./src/index.tsx"],
    mode: process.env.NODE_ENV || "development",
    resolve,
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "[name].js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: { transpileOnly: true },
        },
        {
          test: /\.css?$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(gif|jpg|png|jpeg)$/,
          type: "asset/resource",
        },
        {
          test: /\.(svg)$/,
          use: [{ loader: "@svgr/webpack", options: { dimensions: false } }],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new EnvironmentPlugin({
        API_ENDPOINT: process.env.API_ENDPOINT,
      }),
      new HtmlWebpackPlugin({
        template: "src/index.html",
        favicon: "src/assets/favicon/favicon.ico",
      }),
    ],
    devServer: {
      compress: true,
      port: 40212,
      historyApiFallback: true,
    },
  };
};
