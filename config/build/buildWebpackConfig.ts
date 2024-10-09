import { buildDevServer } from "./buildDevServer";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { buildLoaders } from "./buildLoaders";
import { BuildOptions } from "./types/config";

import { Configuration } from "webpack";



export const buildWebpackConfig = (options: BuildOptions): Configuration => {
    const { mode, paths, isDev } = options
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
            path: paths.dist,
            filename: "[name].[contenthash:8].js",
            clean: true,
        },
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}