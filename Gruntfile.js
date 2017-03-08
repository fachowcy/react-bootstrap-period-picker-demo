var NpmImportPlugin = require('less-plugin-npm-import');
var webpack = require('webpack');

module.exports = function(grunt) {
	grunt.initConfig({
		"less": {
			"demo": {
				options: {
					compress: true,
					optimization: 2,
					plugins: [new NpmImportPlugin()]
				},
				files: {
					'assets/style.css': 'less/style.less'
				}
			}
		},

		"webpack": {
			"demo": {
				entry: "src/demo.tsx",
				output: {
					path: "assets",
					filename: '[name].js'
				},
				module: {
					rules: [
						{
							test: /\.tsx?$/,
							use: 'ts-loader'
						}
					]
				},
				resolve: {
					// you can now require('file') instead of require('file.tsx')
					extensions: ['.js', '.ts', '.tsx'],
					// resolve modules by webpack, not typescript
					modules: ['node_modules', __dirname]
				},
				plugins: [
					new webpack.optimize.UglifyJsPlugin({
						minimize: true,
						sourceMap: false,
						output: {
							comments: false
						},
						compress: {
							warnings: false,
						}
					})
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks("grunt-webpack");
	grunt.registerTask("default", ["less", "webpack"]);

};



