class TreeController extends HTMLElement {
	handleMenuExpand (ev) {
		const target = ev.currentTarget;
		const parent = target.parentElement;

		const expanded = parent.getAttribute('aria-expanded') === 'true';
		parent.setAttribute('aria-expanded', expanded ? 'false' : 'true');
	}
}

customElements.define('x-tree', TreeController);
