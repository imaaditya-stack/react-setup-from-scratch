const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path")
const webpack = require("webpack")

module.exports = {
    target: "web",

    entry: path.join(__dirname, "..", "src", "index.js"),

    output: {
        path: path.join(__dirname, "..", "dist"),
        filename: 'scripts/[name].[contenthash].js',
        clean: true,
        assetModuleFilename: 'images/[hash][ext][query]'
    },

    devServer: {
        hot: false,
        liveReload: true,
        port: 9050,
        open: true,
        compress: true
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: path.join(__dirname, "..", "node_modules"),
                use: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "..", "public", "index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "css/bundle.css"
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: 'sourcemaps/[file].map',
        })
    ]
}