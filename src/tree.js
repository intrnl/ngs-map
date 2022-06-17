class TreeController extends HTMLElement {
	handleMenuExpand (ev) {
		const target = ev.currentTarget;
		const parent = target.parentElement;

		parent.setAttribute('aria-expanded', parent.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
	}
}

customElements.define('x-tree', TreeController);
