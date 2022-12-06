const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://ec2-52-79-235-201.ap-northeast-2.compute.amazonaws.com:3000/',
            changeOrigin: true,
        })
    );
};