module.exports = {
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  publicPath: '',
  productionSourceMap: false, // 不在production环境使用SourceMap
  devServer: {
    // 跨域
    port: 9527, // 端口号
    open: true, // 配置自动启动浏览器
    proxy: {
      '/API': {
        target: 'http://Siemens-SFLL-app-II.vip.ccwonline.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/API': '/API'
        },
        secure: false
      },
      '/Content': {
        target: 'http://Siemens-SFLL-app-II.vip.ccwonline.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/Content': '/Content'
        },
        secure: false
      }
    }
  }
}
