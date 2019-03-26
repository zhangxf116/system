// Webpack version 3.8.1 及以上
const webpack = require('webpack');
const path  = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 设置统一插件
const plugins = [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
	}),
	new ExtractTextPlugin({
		filename: "static/css/[name].[hash].css",
		disable: false,
		allChunks: true
	}),
	new HtmlWebpackPlugin({
		favicon: './src/favicon.ico',
		template: './src/index.html',
		inject: 'body',
	})
];
// 非开发环境对js进行混淆，以及清除老版 dist 文件
if (process.env.NODE_ENV !== 'DEV') {
	plugins.push(new UglifyJsPlugin(), new CleanWebpackPlugin(['dist']));
}



const config = {
	entry: {
		app: './src/app.js', // 程序启动入口
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		// publicPath: 'http://cdn.baidu.com/', // cdn 地址
		publicPath: '/',
		filename: 'static/js/[name].[hash].js', // 设置文件夹 和 文件的文字
		// chunkFilename: 'static/js/[name][id].[chunkhash].js' // 针对多个 entry 点
	},
	module: {
		rules: [{
			test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
			loader: 'file-loader',
			options:{
				name: 'static/image/[name].[hash].[ext]'
			}
		},{
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				use: [{
					loader: "css-loader",
					options:{
						sourceMap: process.env.NODE_ENV === 'DEV',
						minimize: process.env.NODE_ENV !== 'DEV'
					}
				}, {
					loader: "less-loader",
					options:{
						sourceMap: process.env.NODE_ENV === 'DEV',
						minimize: process.env.NODE_ENV !== 'DEV'
					}
				}],
				fallback: "style-loader"
			})
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				use: [{
					loader: "css-loader",
					options:{
						sourceMap: process.env.NODE_ENV === 'DEV',
						minimize: process.env.NODE_ENV !== 'DEV'
					}
				}],
				fallback: "style-loader"
			})
		}, {
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader'
			}
		}, {
			test: /\.(html)$/,
			use: {
				loader: 'html-loader',
				options: {
					minimize: process.env.NODE_ENV !== 'DEV'
				}
			}
		}],
	},
	devtool: "source-map",
	plugins: plugins,
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.js',
			'@': path.join(__dirname, '', 'src')
		}
	}
};

module.exports = config;