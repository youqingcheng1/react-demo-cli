const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/api', {
      target: 'http://47.94.142.215:8081',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api"
      }
    })
  )
}