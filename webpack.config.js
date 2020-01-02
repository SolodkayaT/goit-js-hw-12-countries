const path = require("path");
const webpackMerge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBar = require("webpackbar");

const modeConfig = env => require(`./build-utils/${env.mode}.config`)(env);

module.exports = env =>
  webpackMerge(
    {
      mode: env.mode,
      context: path.resolve(__dirname, "src"),
      entry: "./index.js",
      output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: "babel-loader"
          },
          {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: "url-loader",
                options: {
                  name: "[path]/[name].[ext]",
                  limit: 5000
                }
              }
            ]
          },
          { test: /\.hbs$/, loader: "handlebars-loader" },
          {
            test: /\.(html)$/,
            use: { loader: "html-loader" }
          }
        ]
      },
      plugins: [new CleanWebpackPlugin(), new WebpackBar()]
    },
    modeConfig(env)
  );
