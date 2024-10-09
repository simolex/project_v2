import { buildDevServer } from "./buildDevServer";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { buildLoaders } from "./buildLoaders";
import { BuildOptions } from "./types/config";

import webpack from "webpack";



export const buildWebpackConfig = (options: BuildOptions): webpack.Configuration => {
    const { mode, paths } = options
    return {
        mode,
        entry: {
            script: paths.entry,
        },
        module: {
            rules: buildLoaders(),
        },
        plugins: buildPlugins(options),
        resolve: buildResolvers(),
        output: {
            path: paths.output,
            filename: "[name].[contenthash:8].js",
            clean: true,
        },
        devtool: 'inline-source-map',
        devServer: buildDevServer(options),
    }
}