import { t } from '../locale.js';

const ATTR = `x-i18n`;
const SELECTOR = `[${ATTR}]`;

export function initializeI18n () {
	const root = document.body;

	for (const node of root.querySelectorAll(SELECTOR)) {
		transform(node);
	}
}

function transform (node) {
	const key = node.getAttribute(ATTR);
	node.textContent = t(key);
}
