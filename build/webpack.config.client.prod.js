const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const config = require('./../config');
const {API_URL} = require("../app/constants");

const BASE_PATH = process.env.BASE_PATH || '/';
const COMMIT_HASH = require('child_process')
    .execSync('git rev-parse --short HEAD')
    .toString()
    .trim();

module.exports = {
    devtool: 'inline-source-map',
    mode: 'production',
    entry: {
        app: ['react-hot-loader/patch', path.join(config.srcDir, 'index.js')]
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: config.distDir,
        publicPath: BASE_PATH
    },
    resolve: {
        modules: [
            'node_modules',
            config.srcDir
        ]
    },
    plugins: [
        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd(),
        }),
        new HtmlWebpackPlugin({
            template: config.srcHtmlLayout,
            inject: false
        }),
        new webpack.HashedModuleIdsPlugin(),
        new ExtractCssChunks(),
        new OptimizeCssAssetsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.BASE_PATH': JSON.stringify(BASE_PATH),
            'process.env.COMMIT_HASH': JSON.stringify(COMMIT_HASH)
        })
    ],
    optimization: {
        minimizer: [new TerserPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: config.srcDir,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            // Modular Styles
            {
                test: /\.css$/,
                use: [
                    ExtractCssChunks.loader,
                    { 
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                        }
                    },
                    { loader: 'postcss-loader' }
                ],
                exclude: [path.resolve(config.srcDir, 'styles')],
                include: [config.srcDir]
            },
            {
                test: /\.scss$/,
                use: [
                    ExtractCssChunks.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                        }
                    },
                    { loader: 'postcss-loader' },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: config.scssIncludes
                        }
                    }
                ],
                exclude: [path.resolve(config.srcDir, 'styles')],
                include: [config.srcDir]
            },
            // Global Styles
            {
                test: /\.css$/,
                use: [
                    ExtractCssChunks.loader,
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' }
                ],
                include: [path.resolve(config.srcDir, 'styles')]
            },
            {
                test: /\.scss$/,
                use: [
                    ExtractCssChunks.loader,
                    { loader: 'css-loader' }, 
                    { loader: 'postcss-loader' }, 
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: config.scssIncludes
                        }
                    }
                ],
                include: [path.resolve(config.srcDir, 'styles')]
            },
            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]",
                }
            },
            // Files
            {
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
                loader: "file-loader",
                options: {
                    name: "static/[name].[ext]",
                }
            }
        ]
    },
    devServer: {
        hot: false,
        contentBase: config.distDir,
        compress: true,
        historyApiFallback: {
            index: '/'
        },
        host: API_URL,
        port: 443,
        https: true
    }
}