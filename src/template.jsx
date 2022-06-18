/** @jsx h */
/** @jsxFrag null */

import { t } from './locale.js';


export function renderMapLegend (data, enabled) {
	return (
		<x-tree>
			<ul class='tree' role='tree'>
				{Object.keys(data).map((key) => {
					const values = data[key];

					return (
						<li role='treeitem' aria-expanded='false'>
							<button
								class='button is-item fullwidth'
								x-action='click:x-tree#handleMenuExpand'
							>
								{t(`ui.${key}`)}
							</button>
							<ul>
								{values.map((value) => (
									<li>
										<label class='checkbox-control'>
											<input
												type='checkbox'
												name='landmarks'
												value={value}
												checked={enabled.includes(value)}
												x-action='input:x-app#handleLegendChange'
											/>
											<span>{t(`markers.${value}`)}</span>
										</label>
									</li>
								))}
							</ul>
						</li>
					);
				})}
			</ul>
		</x-tree>
	);
}

function h (type, props, ...children) {
	if (typeof type === 'function') {
		if (props === null) {
			props = {};
		}

		if (children.length > 0) {
			props.children = children;
		}

		return type(props);
	}

	const node = type === null
		? document.createDocumentFragment()
		: document.createElement(type, { is: props && props.is });

	if (props && type) {
		for (let key in props) {
			const value = props[key];

			if (typeof value !== 'function') {
				if (value != null && (value !== false || key.startsWith('aria-'))) {
					node.setAttribute(key, value);
				}
				else {
					node.removeAttribute(key);
				}
			}
		}
	}

	for (let idx = 0, len = children.length; idx < len; idx++) {
		const child = children[idx];

		if (child == null || child === true || child === false) {
			// do nothing
		}
		else if (Array.isArray(child)) {
			children = children.slice(0, idx).concat(child, children.slice(idx + 1));
			len += child.length - 1;
			idx--;
		}
		else if (child instanceof Node) {
			node.appendChild(child);
		}
		else {
			node.appendChild(document.createTextNode(child));
		}
	}

	return node;
}
