const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = env => ({
  devtool: "cheap-module-source-map",
  output: {
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    compress: true,
    port: 8080,
    stats: "errors-only",
    quiet: true
  }
});
