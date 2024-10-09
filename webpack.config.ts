import path from "path";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildOptions } from "./config/build/types/config";

const options: BuildOptions = {
    mode: "development",
    paths: {
        entry: path.resolve(__dirname, "src", "index.ts"),
        output: path.resolve(__dirname, "dist"),
        html: path.resolve(__dirname, "public", "index.html")
    }
};

const config = buildWebpackConfig(options);

export default config;
