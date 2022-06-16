import * as esbuild from 'esbuild';

/** @type {esbuild.BuildOptions} */
export let config = {
	entryPoints: ['src/app.js'],
	entryNames: 'app',
	outdir: 'dist/_assets',
	publicPath: '/_assets/',

	loader: {
		'.png': 'file',
	},

	sourcemap: true,
};
