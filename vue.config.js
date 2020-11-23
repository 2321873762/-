// vue.config.js
module.exports = {
    lintOnSave: true,
    publicPath: './',
    devServer: {
        port: 8080,
        open:true,
        proxy: {
            [process.env.VUE_APP_API]: {
                //请求源地址
                target:'http://mengxuegu.com:7300/mock/5faa58d2a528522f7959d78d/gxvue',
                //是否跨域
                changeOrigin: true,
                pathRewrite: {
                    ['^'+process.env.VUE_APP_API]:''
                }
            }
        }
    }
}