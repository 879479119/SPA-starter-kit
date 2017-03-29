let webpack = require('webpack');
let fs = require('fs');
let autoprefixer = require('autoprefixer');
let globalConfig = require('./config');
let exec = require('child_process').exec, child;

let __DEV__ = process.env.npm_lifecycle_event === "webpack";

let pages = JSON.parse(fs.readFileSync('routes/route.json', 'utf-8'));
let entryObj = {};

pages.forEach(function (item, index) {
	entryObj[item.name] = __DEV__ ? [
			item.src,
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://0.0.0.0:' + globalConfig.dev.sourcePort
		] : item.src;
})

//noinspection JSUnresolvedFunction
let DevConfig = {
	output: {
		publicPath: "http://0.0.0.1:" + globalConfig.dev.sourcePort + "/output/",
		path: __dirname + '/output',
		filename: '[name].bundle.js'
	},
	devServer: {
		inline: true,
		progress: true,
		color: true,
		//好像想要在手机上访问的话这里需要改成 0.0.0.0
		host: '0.0.0.0',
		port: globalConfig.dev.sourcePort,
		contentBase: 'output/',
		outputPublicPath: 'output/'
	},
	// 插件项
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"development"',
			'process.env.SOURCE_PORT': globalConfig.dev.sourcePort
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		})
	],
};

entryObj.vendor = ["react"]

//noinspection JSUnresolvedFunction
let config = {
	// 页面入口文件配置
	entry: entryObj,
	// 入口文件输出配置
	output: {
		path: __dirname + '/output/',
		filename: '[name].bundle.js',
	},
	postcss:[autoprefixer({browsers:['last 2 versions']})],
	module: {
		// 加载器配置
		loaders: [
			{
				test: /\.(jsx|js)$/,
				exclude: /node_modules/,
				loader: 'babel',
				//很奇怪，不需要进行query配置或者是.babelrc文件，用了会报错
				query: {
					presets: ["react", 'es2015', 'stage-0']
				}
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: 'style!css'
			},
			{
				test: /\.less$/,
				loader: 'style!css!postcss!less'
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url?limit=5000'
			}
		]
	},
	// 其他解决方案配置
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.json', 'less']
	},

	externals: {
		jquery: "jquery"
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.SOURCE_PORT': globalConfig.dev.sourcePort
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false,
			},
			compress: {
				warnings: false
			}
		}),
	],
};

//进入开发者模式
if (__DEV__) {
	let prop;
	for (prop in DevConfig) {
		config[prop] = DevConfig[prop]
	}
	//启动后台nodejs服务器
	// exec('npm start',function(err,another_process){
	// 	err && console.error(err,new Date());
	// });
}

module.exports = config;
