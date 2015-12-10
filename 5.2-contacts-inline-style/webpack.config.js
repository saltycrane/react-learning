var Clean = require("clean-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var merge = require("webpack-merge");
var path = require("path");
var webpack = require("webpack");

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, "src");
var BUILD_PATH = path.resolve(ROOT_PATH, "dist");

var common = {
    entry: [
        APP_PATH
    ],
    output: {
        path: BUILD_PATH,
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index-template.html",
            inject: "body"
        })
    ],
    sassLoader: {
        includePaths: [
            path.resolve(__dirname, "node_modules/bootstrap-sass/assets/stylesheets"),
            path.resolve(__dirname, "node_modules/bootstrap-sass/assets/fonts")
        ]
    },
    module: {
        loaders: [
            {
                test: /\.(png|jpg|gif)$/,
                loader: "file-loader?name=image/[name].[ext]",
                include: APP_PATH
            }
        ]
    }
};

if (TARGET === "start" || !TARGET) {
    module.exports = merge(common, {
        devtool: "eval-source-map",
        devServer: {
            contentBase: APP_PATH,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            port: 3000
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loaders: ["style", "css", "sass"],
                    include: APP_PATH
                },
                {
                    test: /\.js$/,
                    loaders: ["react-hot", "babel"],
                    include: APP_PATH
                }
            ]
        }
    });
}

else if (TARGET === "build") {
    module.exports = merge(common, {
        devtool: "source-map",
        output: {
            path: BUILD_PATH,
            filename: "[name].[chunkhash].js"
        },
        plugins: [
            new Clean(["dist"]),
            new ExtractTextPlugin("style.[chunkhash].css"),
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify("production")
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ],
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader"),
                    include: APP_PATH
                },
                {
                    test: /\.js$/,
                    loaders: ["babel"],
                    include: APP_PATH
                }
            ]
        }
    });
}
