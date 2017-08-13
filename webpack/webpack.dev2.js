const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssUrl = require('postcss-url');
const webpackMerge = require('webpack-merge');
const options = {
    minimizeCss: false,
    baseHref: "",
    deployUtl: ""
}
const commonConfig = require('./webpack.common2.js')(options);
const postcssPlugins = commonConfig.postcssPlugins;

const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin } = require('webpack');
const { GlobCopyWebpackPlugin, NamedLazyChunksWebpackPlugin, BaseHrefWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AotPlugin } = require('@ngtools/webpack');

module.exports = webpackMerge(commonConfig.webpack, {
    "output": {
        "path": path.join(process.cwd(), "dist"),
        "filename": "app/[name].bundle.js",
        "chunkFilename": "app/[id].chunk.js"
    },
    "module": {
        "rules": [{
                "include": [
                    path.join(process.cwd(), "src/styles.scss")
                ],
                "test": /\.css$/,
                "use": [
                    "style-loader",
                    {
                        "loader": "css-loader",
                        "options": {
                            "sourceMap": false,
                            "importLoaders": 1
                        }
                    },
                    {
                        "loader": "postcss-loader",
                        "options": {
                            "ident": "postcss",
                            "plugins": postcssPlugins
                        }
                    }
                ]
            },
            {
                "include": [
                    path.join(process.cwd(), "src/styles.scss")
                ],
                "test": /\.scss$|\.sass$/,
                "use": [
                    "style-loader",
                    {
                        "loader": "css-loader",
                        "options": {
                            "sourceMap": false,
                            "importLoaders": 1
                        }
                    },
                    {
                        "loader": "postcss-loader",
                        "options": {
                            "ident": "postcss",
                            "plugins": postcssPlugins
                        }
                    },
                    {
                        "loader": "sass-loader",
                        "options": {
                            "sourceMap": false,
                            "precision": 8,
                            "includePaths": []
                        }
                    }
                ]
            },
            {
                "include": [
                    path.join(process.cwd(), "src/styles.scss")
                ],
                "test": /\.less$/,
                "use": [
                    "style-loader",
                    {
                        "loader": "css-loader",
                        "options": {
                            "sourceMap": false,
                            "importLoaders": 1
                        }
                    },
                    {
                        "loader": "postcss-loader",
                        "options": {
                            "ident": "postcss",
                            "plugins": postcssPlugins
                        }
                    },
                    {
                        "loader": "less-loader",
                        "options": {
                            "sourceMap": false
                        }
                    }
                ]
            },
            {
                "include": [
                    path.join(process.cwd(), "src/styles.scss")
                ],
                "test": /\.styl$/,
                "use": [
                    "style-loader",
                    {
                        "loader": "css-loader",
                        "options": {
                            "sourceMap": false,
                            "importLoaders": 1
                        }
                    },
                    {
                        "loader": "postcss-loader",
                        "options": {
                            "ident": "postcss",
                            "plugins": postcssPlugins
                        }
                    },
                    {
                        "loader": "stylus-loader",
                        "options": {
                            "sourceMap": false,
                            "paths": []
                        }
                    }
                ]
            },
            {
                "test": /\.ts$/,
                "loader": "@ngtools/webpack"
            }
        ]
    },
    "plugins": [
        new NamedLazyChunksWebpackPlugin(),
        new HtmlWebpackPlugin({
            "template": "./src/index.html",
            "filename": "./index.html",
            "hash": false,
            "inject": true,
            "compile": true,
            "favicon": false,
            "minify": false,
            "cache": true,
            "showErrors": true,
            "chunks": "all",
            "excludeChunks": [],
            "title": "Webpack App",
            "xhtml": true,
            "chunksSortMode": function sort(left, right) {
                let leftIndex = commonConfig.entryPoints.indexOf(left.names[0]);
                let rightindex = commonConfig.entryPoints.indexOf(right.names[0]);
                if (leftIndex > rightindex) {
                    return 1;
                } else if (leftIndex < rightindex) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }),
        new SourceMapDevToolPlugin({
            "filename": "[file].map[query]",
            "moduleFilenameTemplate": "[resource-path]",
            "fallbackModuleFilenameTemplate": "[resource-path]?[hash]",
            "sourceRoot": "webpack:///"
        }),
        new NamedModulesPlugin({}),
        new AotPlugin({
            "mainPath": "main.ts",
            "replaceExport": false,
            "hostReplacementPaths": {
                "environments/environment.ts": "environments/environment.ts"
            },
            "exclude": [],
            "tsConfigPath": "src/tsconfig.app.json",
            "skipCodeGeneration": true
        })
    ]
});