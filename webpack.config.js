'use strict';

let webpack = require('webpack');
let path = require('path');
let argv = require('yargs').argv;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StringReplacePlugin = require("string-replace-webpack-plugin");
let applicationVersion = "v0.0.0";

let env = argv.env;

if (!env) {
    env = 'local';
}

function isNotLocal() {
    return env == 'production' || env == 'staging' || env == 'integration' || env == 'recette-interne'
}

function isLocal() {
    return !isNotLocal()
}

let toBeExported = {

    entry: ["babel-polyfill", "./application/application.js"],

    output: {
        filename: "bundle.[hash].js",
        path: "dist"
    },

    devServer: {
        contentBase: '.',
        inline: true
    },

    module: {

        loaders: [
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.png$/,
                loader: "url-loader?mimetype=image/png"
            },
            {
                loader: "style-loader!css-loader!autoprefixer-loader!less-loader",
                test: /\.less$/
            },
            {
                loader: "style-loader!css-loader!autoprefixer-loader",
                test: /\.css$/
            },
            {
                loader: "html-loader",
                test: /\.html$/,
                exclude: /node_modules/
            },
            {
                loaders: ['babel'],
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: 'url?limit=100000&name=[name].[ext]'
            },
            {
                test: /\.html$/,
                loader: StringReplacePlugin.replace({
                    replacements: [
                        {
                            pattern: /__(.*?)__/ig,
                            replacement: function (match, token, offset, string) {
                                return `{{'${token}' | translate}}`;
                            }
                        }
                    ]
                })
            }

        ]
    },

    plugins: (function (argv) {

        const env = argv.env || 'local';

        console.log("You are currently building the project for " + env + " environment...");

        let plugins = [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                ENV: JSON.stringify(env),
                VERSION: JSON.stringify(applicationVersion)
            }),
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new StringReplacePlugin()
        ];

        if (isNotLocal()) {
            let optimizer = new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                mangle: true,
                compress: {
                    warnings: false
                }
            });
            plugins.push(optimizer);
        }

        return plugins;
    })(argv)

};


// Next two entries (resolve and resolveLoader) are used only in dev environments in order to work arround a trouble
// when creating replacing some libraries installed with npm installed by a call to npm link
// Usefull in development in order to develop on both packages and have modification on one hand reflected automatically on the other hand
// For exemple we're using it with sometrics-front-services package.
// 
// Anyway, those entries are usefull only in development

const envtypeKey = "envtype";

// console.log( JSON.stringify(argv) )


 if( isLocal() ) {
 toBeExported.resolve = { fallback: path.join(__dirname, "node_modules") };
 toBeExported.resolveLoader = { fallback: path.join(__dirname, "node_modules") };
 console.log( "development environement detected (no --env prod/xyz/... parameter used during build) : usage of packages installed with \"npm link\" is supported");
 } else {
 console.log( "PRODUCTION environement detected : usage of packages installed with \"npm link\" is NOT supported !!!!");
 }


module.exports = toBeExported;
