let webpack = require('webpack');
let fs = require('fs');
let globalConfig = require('./config');
// let exec = require('child_process').exec, child;

let __DEV__ = process.env.npm_lifecycle_event === "webpack";

let pages = JSON.parse(fs.readFileSync('routes/route.json', 'utf-8'));
let entryObj = {};

pages.forEach(function (item) {
	entryObj[item.name] = __DEV__ ? [
			item.src,
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://0.0.0.0:' + globalConfig.dev.sourcePort
		] : item.src;
})

//noinspection JSUnresolvedFunction
let DevConfig = {
	output: {
		// publicPath: "http://127.0.0.1:" + globalConfig.dev.sourcePort + "/output/js/",
		path: __dirname + '/output/js',
		filename: '[name].bundle.js',
		publicPath: '/output/js/'
	},
	devServer: {
		inline: true,
		progress: true,
		color: true,
		host: '0.0.0.0',
		port: globalConfig.dev.sourcePort,
		// contentBase: 'output/',
		publicPath: '/output/js/'
	},
	// 插件项
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"development"',
			'process.env.SOURCE_PORT': globalConfig.dev.sourcePort
		}),
		new webpack.HotModuleReplacementPlugin()
	],
};

//noinspection JSUnresolvedFunction
let config = {
	// 页面入口文件配置
	entry: entryObj,
	// 入口文件输出配置
	output: {
		path: __dirname + '/output/js/',
		filename: '[name].bundle.js',
	},
	externals: {
		"jquery": "jQuery",
		"react-dom": "ReactDOM",
		"react": "React"
	},
	module: {
		// 加载器配置
		loaders: [
			{
				test: /\.(jsx|js)$/,
				exclude: /node_modules/,
				loader: 'babel',
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
				loader: 'style!css!less'
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
	plugins: [
		new webpack.DefinePlugin({
			'process.env.SOURCE_PORT': globalConfig.dev.sourcePort
		})
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
