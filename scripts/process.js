import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import json5 from 'json5';

// Turns the mapping files that are in JSONC into compact JSON form.
async function* recurseReaddir (dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const entryPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			yield* recurseReaddir(entryPath);
		}
		else {
			yield entryPath;
		}
	}
}

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
