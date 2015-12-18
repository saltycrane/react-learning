var webpack = require("webpack");


module.exports = function (config) {
    config.set({
        browsers: ["Chrome"],
        singleRun: true,
        frameworks: ["mocha", "chai"],
        files: [
            "webpack.tests.config.js"
        ],
        preprocessors: {
            "webpack.tests.config.js": ["webpack", "sourcemap"]
        },
        reporters: ["dots"],
        webpack: {
            devtool: "inline-source-map",
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: "babel-loader"
                    }
                ]
            }
        },
        webpackServer: {
            noInfo: true
        }
    });
};
