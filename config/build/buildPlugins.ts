import { BuildOptions } from "./types/config";

import HtmlWebpackPlugin from "html-webpack-plugin";
import { WebpackPluginInstance, ProgressPlugin } from "webpack";

export const buildPlugins = ({ paths }: BuildOptions): WebpackPluginInstance[] => {

    return [
        new HtmlWebpackPlugin({ template: paths.html }),
        new ProgressPlugin(),
    ]

}