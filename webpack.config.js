const path = require('path');

module.exports = {
	entry: './src/index.ts',
	mode: 'production',
	devtool: 'source-map',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.test\.ts$/,
				use: 'null-loader',
			},
		],
	},
};
