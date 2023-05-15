import path from 'path';

module.exports = {
	entry: './src/index.ts',
	mode: 'development',
	target: 'web',
	devtool: 'source-map',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget : "umd"
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
