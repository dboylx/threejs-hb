const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('extract-text-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack'); // to access built-in plugins

module.exports = {
	entry: {
		index: './src/js/index.js',
		particle: './src/js/particle.js',
		hemisphere: './src/js/hemisphere.js',
		lib: './src/js/lib.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[hash:8].js'
	},
  
	module: {
		rules: [
		    { 	test: /\.css$/, 
				use: [
				  { loader: 'file-loader',
					options: {
						name: 'css/[name]-[contenthash:7].[ext]',
					} },
				],
			},

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
				  attrs: [':src','link:href']
				}
			  }
			},
		],
	},
	
	devServer:{
		contentBase:path.resolve(__dirname,'dist'), //基本目录结构
		host:'localhost',  //ip地址
		compress:true, //开启服务器端压缩
		port:9999 ,
		open: true,
	},
	
	plugins: [

	
	    new webpack.ProgressPlugin(),


		new HtmlWebpackPlugin({
		  filename: 'index.html',
		  template: './src/index.html'
		}),
		new HtmlWebpackPlugin({
		  filename: 'particle.html',
		  template: './src/particle.html',
          chunks: ['lib','particle'],

		}),
		
		new HtmlWebpackPlugin({
		  filename: 'hemisphere.html',
		  template: './src/hemisphere.html',
          chunks: ['lib','hemisphere'],

		}),
		

		
		//new ExtractTextPlugin("./css/[name].[hash:8].css", {allChunks: true}),

		
	]
}