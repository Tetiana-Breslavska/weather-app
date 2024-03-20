const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
    mode,
    devtool,
    entry: {index: path.resolve(__dirname, 'src', 'index.js')},
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },

    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "main.css",
        })
    ],

    module: {
        rules: [
            { test: /\.html$/, loader: "html-loader" },
            { test: /\.svg$/, use: 'svg-inline-loader' },
            {
                test: /\.(c|sa|sc)ss$/i,
                // exclude: /node_modules/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader']
            },
            { test: /\.(js)$/, use: 'babel-loader' }
        ],
    },
    devServer: {
        hot: true,
        port: 8080,
        open: true
    },
    resolve: {
        fallback: {
            os: false,
            fs: false,
            path: false,
            child_process: false,
        },
    },
};