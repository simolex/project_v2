import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/config";

export const buildDevServer = (options: BuildOptions): DevServerConfiguration => {
    const { paths } = options;

    return {
        static: paths.dist,
        port: options.port,
        open: true,
    }
}