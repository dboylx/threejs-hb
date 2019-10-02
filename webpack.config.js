const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		index: './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash:8].js'
	},
  
	module: {
		rules: [
		{
			test: /\.(png|jpe?g|gif)$/i,
			use: [
			  {
				loader: 'file-loader',
			  },
			],
		},
		{
			test: /\.exec\.js$/,
			use: [ 'script-loader' ]
		}
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
		new HtmlWebpackPlugin({
		  filename: 'index.html', // 配置输出文件名和路径
		  template: './public/index.html' // 配置要被编译的html文件
		})
	]
}