import path from "path";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildEnv, BuildOptions, BuildPaths } from "./config/build/types/config";
import { Configuration } from "webpack";

export default (env: BuildEnv) => {

    const port = env.port || 3000;
    const mode = env.mode || "development";
    const isDev = mode === "development";

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, "src", "index.tsx"),
        dist: path.resolve(__dirname, "dist"),
        html: path.resolve(__dirname, "public", "index.html")
    }

    const options: BuildOptions = {
        mode,
        paths,
        port,
        isDev,
    };

    const config: Configuration = buildWebpackConfig(options);

    return config;
}
