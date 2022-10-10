let currentLocale;

export async function loadLocale (locale) {
	const mod = await import(`../_locales/${locale}.js`);
	currentLocale = mod.default;
}

export function t (path, obj = null) {
	const value = getPath(currentLocale, path);
	const type = typeof value;

	let mutated = false;

	if (type === 'function') {
		for (const key in obj) {
			const val = obj[key];

			if (typeof val === 'string' && val.startsWith('t:')) {
				if (!mutated) {
					obj = { ...obj };
					mutated = true;
				}

				obj[key] = t(val.slice(2));
			}
		}

		return value(obj);
	}
	else if (type === 'string') {
		return value;
	}
	else {
		return missingPath(path);
	}
}

function getPath (obj, path) {
	let current = obj;

	if (current == null) {
		return;
	}

	const paths = path.split('.');

	for (let idx = 0, len = paths.length; idx < len; idx++) {
		const key = paths[idx];
		const next = current[key];

		if (next == null) {
			return;
		}

		current = next;
	}

	return current;
}

function missingPath (path) {
	return `[t:${path}]`;
}
