import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/config";
// import type { Configuration } from "webpack";

export const buildDevServer = (options: BuildOptions): DevServerConfiguration => {
    const { paths } = options;

    return {
        static: paths.output,
        port: options.port,
        open: true,
    }
}