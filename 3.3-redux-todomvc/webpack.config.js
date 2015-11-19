var path = require("path");
var webpack = require("webpack");

module.exports = {
    devtool: "eval-source-map",
    entry: [
        "webpack-dev-server/client?http://localhost:3000",
        "webpack/hot/only-dev-server",
        "./src/index"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ["react-hot", "babel"],
            include: path.join(__dirname, "src")
        }, {
            text: /\.css?$/,
            loaders: [ "style", "css" ],
            include: path.join(__dirname, "node_modules/todomvc-app-css")
        }]
    }
};