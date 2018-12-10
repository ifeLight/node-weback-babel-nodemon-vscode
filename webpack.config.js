const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
    entry: [
      './src/index.js'
    ],
    target: 'node',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: 'build/'
    },
    externals: nodeModules,
    module: {
        rules: [
            {
                exclude: /(node_modules|bower_components)/,
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                      plugins: [
                        require('@babel/plugin-transform-runtime'),
                        require('@babel/plugin-transform-async-to-generator'),
                        require('@babel/plugin-syntax-dynamic-import'),
                        require('@babel/plugin-syntax-import-meta'),
                        require('@babel/plugin-proposal-class-properties'),
                        require('@babel/plugin-proposal-json-strings')
                      ]
                    }
                }
            }
        ]
    }
}
