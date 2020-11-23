const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    configureWebpack: config => {
      if (process.env.NODE_ENV === 'production') {
        return {
            plugins:[
                new CopyWebpackPlugin([{
                    from:'node_modules/@aspnet/signalr/dist/browser/signalr.min.js',
                    to:'dist'
                },{
                    from:'node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr-client.js',
                    to:'dist'
                },{
                    from:'src/lib/abp.js',
                    to:'dist'
                }])
            ]
        }
      } else {
        return {
            plugins:[
                new CopyWebpackPlugin([{
                    from:'node_modules/@aspnet/signalr/dist/browser/signalr.min.js',
                    to:'dist'
                },{
                    from:'node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr-client.js',
                    to:'dist'
                },{
                    from:'src/lib/abp.js',
                    to:'dist'
                }])
            ]
        }
      }
    },
    chainWebpack: config => {
        // 其他配置
        config.entry('main').add('babel-polyfill') // main是入口js文件
        // 其他配置
       }
}