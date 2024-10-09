import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

const config: webpack.Configuration = {
    mode: "development",
    entry: path.resolve(__dirname, "src", "index.ts"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash:8].js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public", "index.html") }),
        new webpack.ProgressPlugin(),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};

export default config;
