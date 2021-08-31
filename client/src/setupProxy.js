const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://localhost:5000', //node 서버 5000, client 3000
			changeOrigin: true,
		}),
	);
};
