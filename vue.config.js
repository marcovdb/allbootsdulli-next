const webpack = require('webpack')

module.exports = {
    productionSourceMap: false,
    devServer: {
        proxy: 'http://allbootsdulli.ubuntu.local'
    },
    configureWebpack: {
        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
          ]
    }
}