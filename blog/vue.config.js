module.exports = {
    // 相当于webpack-dev-server，对本地服务器进行配置
    devServer: {
        proxy: {
            "/blog": {
                target: "http://localhost:6789/",// 需要跨域的目标url
                changeOrigin: true, // 将基于名称的虚拟托管网站的选项，如果不配置，请求会报404
                ws: true,
                pathRewrite: {
                    "^/blog": ''
                }
            },
            "/music": {
                target: "http://47.110.127.215:80/music/",// 需要跨域的目标url
                changeOrigin: true, // 将基于名称的虚拟托管网站的选项，如果不配置，请求会报404
                ws: true,
                pathRewrite: {
                    "^/music": ''
                }
            },



        }
    },
    lintOnSave: false
}
