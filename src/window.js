import { query } from './lib/x-controller.js';


let currentWindow = document.querySelector('.window.is-active');

function handleWindowFocus (event) {
	const target = event.target.closest('.window');

	if (target === currentWindow) {
		return;
	}

	if (currentWindow) {
		currentWindow.classList.remove('is-active');
	}

	if (target) {
		target.classList.add('is-active');
	}

	currentWindow = target;
}

document.addEventListener('pointerdown', handleWindowFocus);
document.addEventListener('focusin', handleWindowFocus);

class WindowController extends HTMLElement {
	prevX = 0;
	prevY = 0;
	currX = 0;
	currY = 0;

	connectedCallback () {
		this.style.display = 'none';
	}

	openWindow () {
		return this.toggleWindow(true);
	}

	closeWindow () {
		return this.toggleWindow(false);
	}

	toggleWindow (force) {
		const isUndefined = force === undefined;
		const value = isUndefined ? this.style.display === 'none' : force;

		this.style.display = value ? '' : 'none';

		if (value) {
			handleWindowFocus({ target: this });
		}
	}

	handleEvent (ev) {
		const type = ev.type;

		switch (type) {
			case 'pointerdown': return this.#handlePointerDown(ev);
			case 'pointermove': return this.#handleDocumentPointerMove(ev);
			case 'pointerup': return this.#handleDocumentPointerUp(ev);
		}
	}

	/**
	 * @param {PointerEvent} ev
	 */
	#handlePointerDown (ev) {
		if (ev.button !== 0 || ev.target.closest('button')) {
			return;
		}

		ev.preventDefault();

		this.prevX = ev.clientX;
		this.prevY = ev.clientY;

		document.addEventListener('pointermove', this);
		document.addEventListener('pointerup', this);
	}

	/**
	 * @param {PointerEvent} ev
	 */
	#handleDocumentPointerMove (ev) {
		ev.preventDefault();

		const x = ev.clientX;
		const y = ev.clientY;

		this.currX = this.prevX - x;
		this.currY = this.prevY - y;
		this.prevX = x;
		this.prevY = y;

		this.style.top = `${this.offsetTop - this.currY}px`;
		this.style.left = `${this.offsetLeft - this.currX}px`;
		this.style.bottom = '';
		this.style.right = '';
	}

	#handleDocumentPointerUp () {
		document.removeEventListener('pointermove', this);
		document.removeEventListener('pointerup', this);

		// prevent clipping
		const { top, left } = this.getBoundingClientRect();

		if (top < 0) {
			this.style.top = '0px';
		}
		else if (top + this.offsetHeight > window.innerHeight) {
			this.style.top = `${window.innerHeight - this.offsetHeight}px`;
		}

		if (left < 0) {
			this.style.left = '0px';
		}
		else if (left + this.offsetWidth > window.innerWidth) {
			this.style.left = `${window.innerWidth - this.offsetWidth}px`;
		}
	}
}

customElements.define('x-window', WindowController);

export default WindowController;
