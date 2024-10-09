import path from "path";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildEnv, BuildOptions } from "./config/build/types/config";
import { Configuration } from "webpack";



const config = (env: BuildEnv): Configuration => {

    const port = env.port || 3000;
    const mode = env.mode || "development";
    const isDev = mode === "development"
    const options: BuildOptions = {
        mode,
        port,
        isDev,
        paths: {
            entry: path.resolve(__dirname, "src", "index.ts"),
            output: path.resolve(__dirname, "dist"),
            html: path.resolve(__dirname, "public", "index.html")
        },
    };

    return buildWebpackConfig(options)
};

export default config;
