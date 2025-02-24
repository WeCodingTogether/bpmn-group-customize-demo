// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { watch } = require('fs');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';



const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public")
        },
        open: true,
        host: 'localhost',
        port: 9091
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            favicon: "./favicon.ico"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "assets/**", to: "vendor/bpmn-js", context: "./node_modules/bpmn-js/dist/" },
                // { from: "**/*.{html,css}", context: "", globOptions: { ignore: ["**/index.html"] } },
                { from: "assets", to: "assets" }
            ]
        }),
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.bpmn$/,
                use: "raw-loader"
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.(svg|png)$/,
                use: [
                    {
                        loader: "url-loader",
                    },
                ],
            }

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300, // Check for changes every 300ms
        ignored: /node_modules/, // Ignore node_modules to speed up watching
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        // Add plugins for production, e.g., CSS extraction
        config.plugins.push(new MiniCssExtractPlugin());
    } else {
        config.mode = 'development';
    }
    return config;
};
