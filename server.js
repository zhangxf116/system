const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config');

let compiler = webpack(webpackConfig);
let devServer = new webpackDevServer(compiler, {
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true,
		chunks: true
	},
	contentBase: 'src/',
	historyApiFallback: true,
	disableHostCheck: true,
	proxy: [{
		context: ['/auth'],
		target: 'http://10.100.15.100:8080',
		// target: 'http://10.100.15.100:8081',//测试
		secure: false
	}, {
		context: '/upload',
		target: 'http://10.100.15.100:7080',
		pathRewrite: {"^/upload" : ""},
	}, {
		context: ['/api'],
		target: 'http://10.100.15.17:8080',
		// target: 'http://10.100.15.17:7070', //测试
		secure: false
	}, {
		context: ['/websocket'],
		target: 'http://10.100.15.17:9009',
		// target: 'http://10.100.15.17:9090', //测试
		ws: true,
		secure: false
	}, {
		context: ['/tick'],
		target: 'http://analytics.dev.bnrong.com',
		// target: 'http://analytics.test.bnrong.com', //测试
		secure: false,
		changeOrigin: true
	}]
});

devServer.listen(3400, error => {
	if(error) {
		console.log(error);
		return;
	}
	console.log('http://localhost:' + 3400);
});