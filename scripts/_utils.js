import * as fs from 'node:fs/promises';
import * as path from 'node:path';


export async function* recurseReaddir (dir) {
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
