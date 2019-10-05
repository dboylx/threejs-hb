const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
	entry: {
		index: './src/index.js',
		particle: './src/particle.js',
		hemisphere: './src/hemisphere.js',
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
					name: 'img/[name]-[contenthash:7].[ext]',
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
		new HtmlWebpackPlugin({
		  filename: 'particle.html',
		  template: './public/particle.html',
          chunks: ['lib','particle'],

		}),
		
		new HtmlWebpackPlugin({
		  filename: 'hemisphere.html',
		  template: './public/hemisphere.html',
          chunks: ['lib','hemisphere'],

		}),
		
	]
}