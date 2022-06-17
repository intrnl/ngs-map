import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import json5 from 'json5';

import { recurseReaddir } from './_utils.js';

// Turns the mapping files that are in JSONC into compact JSON form.
for await (const file of recurseReaddir('data/')) {
	if (!file.endsWith('.jsonc')) {
		continue;
	}

	const source = await fs.readFile(file, 'utf8');
	const json = json5.parse(source);

	const dest = 'dist/_' + file.replace('.jsonc', '.json');

	await fs.mkdir(path.dirname(dest), { recursive: true });
	await fs.writeFile(dest, JSON.stringify(json));
}
