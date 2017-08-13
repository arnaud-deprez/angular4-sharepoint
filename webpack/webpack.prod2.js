const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssUrl = require('postcss-url');
const webpackMerge = require('webpack-merge');
const options = {
    minimizeCss: true,
    baseHref: "",
    deployUtl: ""
}
const commonConfig = require('./webpack.common2.js')(options);
const postcssPlugins = commonConfig.postcssPlugins;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const licensePlugin = require('license-webpack-plugin');
const { NoEmitOnErrorsPlugin, EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack');
const { GlobCopyWebpackPlugin, BaseHrefWebpackPlugin, SuppressExtractedTextChunksWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin, ModuleConcatenationPlugin, UglifyJsPlugin } = require('webpack').optimize;
const { AotPlugin } = require('@ngtools/webpack');
const ReplacePlugin = require('replace-webpack-plugin');

module.exports = webpackMerge(commonConfig.webpack, {
    "output": {
        "path": path.join(process.cwd(), "dist"),
        "filename": "app/[name].[chunkhash:20].bundle.js",
        "chunkFilename": "app/[id].[chunkhash:20].chunk.js"
    },
    "module": {
        "rules": [{
                "include": [
                    path.join(process.cwd(), "src/styles.scss")
                ],
                "test": /\.css$/,
                "loaders": ExtractTextPlugin.extract({
                    "use": [{
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
                    ],
                    "publicPath": ""
                })
            },
            {
                "include": [
                    path.join(process.cwd(), "src/styles.scss")
                ],
                "test": /\.scss$|\.sass$/,
                "loaders": ExtractTextPlugin.extract({
                    "use": [{
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
                    ],
                    "publicPath": ""
                })
            },
            {
                "include": [
                    path.join(process.cwd(), "src/styles.scss")
                ],
                "test": /\.less$/,
                "loaders": ExtractTextPlugin.extract({
                    "use": [{
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
                    ],
                    "publicPath": ""
                })
            },
            {
                "include": [
                    path.join(process.cwd(), "src/styles.scss")
                ],
                "test": /\.styl$/,
                "loaders": ExtractTextPlugin.extract({
                    "use": [{
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
                    ],
                    "publicPath": ""
                })
            },
            {
                "test": /\.ts$/,
                "use": [
                    "@ngtools/webpack"
                ]
            }
        ]
    },
    "plugins": [
        new HtmlWebpackPlugin({
            "template": "./src/index.html",
            "filename": "./index.html",
            "hash": false,
            "inject": true,
            "compile": true,
            "favicon": false,
            "minify": {
                "caseSensitive": true,
                "collapseWhitespace": true,
                "keepClosingSlash": true
            },
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
        new ExtractTextPlugin({
            "filename": "[name].[contenthash:20].bundle.css"
        }),
        new SuppressExtractedTextChunksWebpackPlugin(),
        new licensePlugin({
            "pattern": /^(MIT|ISC|BSD.*)$/
        }),
        new EnvironmentPlugin({
            "NODE_ENV": "production"
        }),
        new HashedModuleIdsPlugin({
            "hashFunction": "md5",
            "hashDigest": "base64",
            "hashDigestLength": 4
        }),
        new ModuleConcatenationPlugin({}),
        new UglifyJsPlugin({
            "mangle": {
                "screw_ie8": true
            },
            "compress": {
                "screw_ie8": true,
                "warnings": false
            },
            "output": {
                "ascii_only": true
            },
            "sourceMap": false,
            "comments": false
        }),
        new AotPlugin({
            "mainPath": "main.ts",
            "replaceExport": false,
            "hostReplacementPaths": {
                "environments/environment.ts": "environments/environment.prod.ts"
            },
            "exclude": [],
            "tsConfigPath": "src/tsconfig.app.json"
        }),
        new ReplacePlugin({
            entry: 'src/index.aspx',
            hash: '[hash]',
            output: 'dist/index.aspx'
        })
    ]
});