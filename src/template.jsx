/** @jsx h */
/** @jsxFrag null */

import { t } from './locale.js';


export function renderMapLegend (data, enabled) {
	return (
		<ul className='tree' role='tree'>
			{Object.keys(data).map((key) => {
				const values = data[key];

				return (
					<li role='treeitem' aria-expanded='false'>
						<button className='button is-item fullwidth'>
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
											x-action='input:x-app#handleLandmarkChange'
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
	)
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

			if (key === 'style') {
				if (typeof value === 'string') {
					node.style.cssText = value;
				}
				else {
					for (const style in value) {
						const styleValue = value[style];

						if (style.includes('-')) {
							node.style.setProperty(style, styleValue);
						}
						else if (styleValue == null) {
							node.style[style] = '';
						}
						else {
							node.style[style] = styleValue;
						}
					}
				}
			}
			else if (key.startsWith('on')) {
				let isCapture = false;

				if (key.endsWith('Capture')) {
					isCapture = true;
					key = key.slice(0, -7);
				}

				let lowercase = key.toLowerCase();

				if (lowercase in node) {
					key = lowercase;
				}

				key = key.slice(2);
				node.addEventListener(key, value, isCapture);
			}
			else {
				if (key in node) {
					try {
						node[key] = value;
						continue;
					} catch {}
				}

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
