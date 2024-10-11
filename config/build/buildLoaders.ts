import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { RuleSetRule } from "webpack";
import { BuildOptions } from "./types/config";

export const buildLoaders = ({ isDev }: BuildOptions): RuleSetRule[] => {
    const sassLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev
                ? "style-loader"
                : {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                          esModule: false,
                      },
                  },
            {
                loader: "css-loader",
                options: {
                    modules: {
                        auto: /\.module\./i,
                        localIdentName: isDev
                            ? "[path][name]__[local]--[hash:base64:4]"
                            : "[hash:base64:8]",
                        namedExport: false,
                    },
                },
            },
            "sass-loader",
        ],
    };

    const tsLoader: RuleSetRule = {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
    };

    return [tsLoader, sassLoader];
};
