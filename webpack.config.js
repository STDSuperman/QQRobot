const path = require('path');

module.exports = {
	resolve: {
		extensions: ['.ts', '.js', '.json'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@modules': path.resolve(__dirname, 'src/modules'),
			'@utils': path.resolve(__dirname, 'src/common/utils')
		}
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					configFile: path.resolve(__dirname, './tsconfig.json')
				}
			},
			{
				test: /\.png|jpg|jpeg|svg/,
				loader: 'file-loader',
				exclude: /node_modules/
			}
		]
	}
};
