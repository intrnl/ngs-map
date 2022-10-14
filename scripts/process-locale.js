import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import * as esbuild from 'esbuild';
import json5 from 'json5';
import MessageFormat from '@messageformat/core';
import compileMF from '@messageformat/core/compile-module.js';

import { recurseReaddir } from './_utils.js';


const files = [];

for await (const file of recurseReaddir('locales/')) {
	if (!file.endsWith('.jsonc')) {
		continue;
	}

	files.push(file);
}

await esbuild.build({
	entryPoints: files,
	outdir: 'dist/_locales/',
	format: 'esm',
	bundle: true,
	splitting: true,
	minify: true,
	sourcemap: true,
	charset: 'utf8',
	plugins: [
		{
			name: 'messageformat',
			setup (build) {
				build.onLoad({ filter: /\.jsonc$/i }, async (opts) => {
					const { path: filename } = opts;

					const source = await fs.readFile(filename, 'utf8');
					const json = json5.parse(source);

					const locale = path.basename(filename, '.jsonc').replace(/-x-.+/, '');
					const mf = new MessageFormat(locale);
					const code = compileMF(mf, json);

					return {
						loader: 'js',
						contents: code,
					};
				});
			},
		},
	],
})
