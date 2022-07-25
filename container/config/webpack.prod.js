const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const stencilMfeRegister = require('./stencil-mfe-register');
const packageJson = require('../package.json');

const domain = 'https://do2iwbmg4wi9.cloudfront.net';
const stencilRemote = `${domain}/segmentation`;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/login/'    //same set as the deploy path in container-deploy.yml + the / is needed at the end
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            templateParameters: {
                stencilMfeRegister: stencilMfeRegister(stencilRemote)
            }
        })
    ]
}

module.exports = merge(commonConfig, prodConfig);