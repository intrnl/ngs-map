/**
 * @param {HTMLElement} node
 * @param {string} target
 * @returns {?HTMLElement}
 */
export function query (node, target) {
	return node.querySelector(`[x-target~='${node.localName}.${target}']`) || null;
}

/**
 * @param {HTMLElement} node
 * @param {string} target
 * @returns {HTMLElement[]}
 */
export function queryAll (node, target) {
	return [...node.querySelectorAll(`[x-targets~='${node.localName}.${target}']`)];
}
