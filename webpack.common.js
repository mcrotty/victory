const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");

module.exports = {
  entry: {
    main: [
      path.join(__dirname, "src", "index.js"),
      path.join(__dirname, "src/css", "main.css")
    ]
  },

  output: {
    path: path.join(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/fonts/[name].[ext]"
      },

      {test: /\.json$/, loader: "json-loader"},

      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        query: {cacheDirectory: true}
      },

      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },
  
  resolve: {
    alias: {
      jquery: 'jquery/src/jquery',
    }
  },

  plugins: [
    new webpack.ProvidePlugin({
       $: "jquery",
       jQuery: "jquery",
       'window.JQuery': 'jquery'
       // 'glyphicons-halflings-regular.eot': 'bootstrap/glyphicons-halflings-regular.eot'
    }),
    
    new webpack.ProvidePlugin({
      fetch: "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
    }),
    
    new AssetsPlugin({
      filename: "webpack.json",
      path: path.join(process.cwd(), "site/data"),
      prettyPrint: true
    }),

    new CopyWebpackPlugin([
      {
        from: "./src/fonts/",
        to: "fonts/",
        flatten: true
      }
    ])
  ]
};
