const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
	entry: {
		index: './src/index.js',
		lib: './src/lib.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[hash:8].js'
	},
  
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|jpg|gif)$/i,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
				},
			},
			{
				test: /\.exec\.js$/,
				use: [ 'script-loader' ]
			},
			{
			  test: /\.(html)$/,
			  use: {
				loader: 'html-loader',
				options: {
				  attrs: [':src']
				}
			  }
			},
		],
	},
	
	devServer:{
		contentBase:path.resolve(__dirname,'dist'), //基本目录结构
		host:'localhost',  //ip地址
		compress:true, //开启服务器端压缩
		port:8888 ,
		open: true,
	},
	
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
		  filename: 'index.html',
		  template: './public/index.html'
		}),
	]
}