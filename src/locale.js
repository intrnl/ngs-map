let currentLocale;

export async function loadLocale (locale) {
	const mod = await import(`/_locales/${locale}.js`);
	currentLocale = mod.default;
}

export function t (path, obj) {
	const value = getPath(currentLocale, path);

	if (typeof value === 'function') {
		return value(obj);
	}
	else {
		return value;
	}
}

function getPath (obj, path) {
	let current = obj;

	if (current == null) {
		return missingPath(path);
	}

	const paths = path.split('.');

	for (let idx = 0, len = paths.length; idx < len; idx++) {
		const key = paths[idx];
		const next = current[key];

		if (next == null) {
			return missingPath(path);
		}

		current = next;
	}

	return current;
}

function missingPath (path) {
	return `[t:${path}]`;
}
