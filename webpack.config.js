var path = require('path');
var Dotenv = require('dotenv-webpack');

var config = {
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: '.'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							camelCase: true,
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]-[local]-[hash:base64:5]'
						}
					},
					'postcss-loader'
				]
			},
			{
				test: /\.js/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['babel-preset-env', 'react'],
						plugins: [
							'transform-object-rest-spread',
							'transform-class-properties'
						]
					}
				}
			}
		]
	},
	plugins: [
		new Dotenv({ path: './.env' })
	]
};

module.exports = config;
