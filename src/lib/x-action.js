const ATTR = 'x-action';

const observer = new MutationObserver((mutations) => {
	for (const mutation of mutations) {
		if (mutation.type === 'attribute') {
			bindActions(mutation.target);
			continue;
		}

		if (mutation.type === 'childList') {
			for (const node of mutation.removedNodes) {
				if (node.$binds) {
					node.$binds = null;
				}
			}

			for (const node of mutation.addedNodes) {
				if (node.nodeType === Node.ELEMENT_NODE) {
					bindActions(node);
				}
			}

			continue;
		}
	}
});

if (document.readyState === 'complete') {
	initialize();
}
else {
	document.addEventListener('DOMContentLoaded', initialize, { once: true });
}

function initialize () {
	const root = document.body;

	observer.observe(root, {
		childList: true,
		subtree: true,
		attributeFilter: [ATTR],
	});

	for (const node of root.querySelectorAll(`[${ATTR}]`)) {
		bindActions(node);
	}
}

function bindActions (node) {
	if (!node.hasAttribute(ATTR)) {
		return;
	}

	const actions = node.getAttribute(ATTR).split(/\s+/);
	const binds = node.$binds = {};

	for (const action of actions) {
		const eventSep = action.lastIndexOf(':');
		const methodSep = Math.max(0, action.lastIndexOf('#')) || action.length;

		const event = action.slice(0, eventSep);
		const tag = action.slice(eventSep + 1, methodSep);
		const method = action.slice(methodSep + 1) || 'handleEvent';

		if (!tag.includes('-')) {
			if (DEV) {
				console.warn(`cannot bind ${event} event to ${tag} because it is not a custom element`);
			}

			continue;
		}

		const target = node.closest(tag);

		if (!target) {
			if (DEV) {
				console.warn(`cannot bind ${event} event to ${tag}#${method} because ${tag} is not in the ancestor tree`, node);
			}

			continue;
		}

		// there's a possibility that the controller hasn't been defined yet, if
		// that's the case we'll store a string and resolve it later.
		const _target = customElements.get(tag) ? target : tag;

		node.addEventListener(event, handleEvent);

		let current = binds[event];

		if (!current) {
			binds[event] = createEvent(_target, method);
			continue;
		}

		while (current.next) {
			current = current.next;
		}

		current.next = createEvent(_target, method);
	}
}

function handleEvent (event) {
	const node = event.currentTarget;
	const binds = node.$binds;

	if (!binds) {
		return;
	}

	let def = binds[event.type];

	while (def) {
		const method = def.method;
		let target = def.target;

		if (typeof target === 'string') {
			if (!customElements.get(target)) {
				if (DEV) {
					console.warn(`cannot fire ${event.type} event for ${target} because the controller is still not present.`, node);
				}

				def = def.next;
				continue;
			}

			target = def.target = node.closest(target);
		}

		if (target[method]) {
			target[method](event);
		}
		else if (DEV) {
			console.warn(`cannot fire ${event.type} event for ${target.localName}#${method} because it does not exist.`, node);
		}

		def = def.next;
	}
}

function createEvent (target, method) {
	return {
		target,
		method,
		next: null,
	};
}
