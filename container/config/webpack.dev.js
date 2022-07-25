const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const stencilMfeRegister = require('./stencil-mfe-register');

const stencilRemote = 'http://localhost:8083/dist';

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            templateParameters: {
                stencilMfeRegister: stencilMfeRegister(stencilRemote)
            }
            // templateParameters: (compilation, assets, assetTags, options) => {
            //     return { stencilMfeRegister: stencilMfeRegister(stencilRemote) }
            // }
        })
    ]
};

module.exports = merge(commonConfig, devConfig);