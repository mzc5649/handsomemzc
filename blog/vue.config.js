module.exports = {
    // 相当于webpack-dev-server，对本地服务器进行配置
    devServer: {
        proxy: {
            "/blog-api": {
                //target: "https://handsomemzc.cn/blog-api/",// 需要跨域的目标url
                target: "http://localhost:8888/",// 需要跨域的目标url
                changeOrigin: true, // 将基于名称的虚拟托管网站的选项，如果不配置，请求会报404
                ws: true,
                pathRewrite: {
                    "^/blog-api": ''
                }
            },
            "/music": {
                target: "https://handsomemzc.cn/music/",// 需要跨域的目标url
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
