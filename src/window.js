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
	targets = {
		title: query(this, 'title'),
	};

	prevX = 0;
	prevY = 0;
	currX = 0;
	currY = 0;

	connectedCallback () {
		const title = this.targets.title;
		title.addEventListener('pointerdown', this);

		this.style.position = 'absolute';
		this.style.top = '12px';
		this.style.left = '12px';
	}

	openWindow () {
		return this.toggleWindow(true);
	}

	closeWindow () {
		return this.toggleWindow(false);
	}

	toggleWindow (force) {
		const isUndefined = force === undefined;

		if (isUndefined) {
			this.style.display = this.style.display === 'none' ? '' : 'none';
		}
		else {
			this.style.display = force ? '' : 'none';
		}
	}

	handleEvent (ev) {
		const type = ev.type;

		switch (type) {
			case 'pointerdown': return this.handlePointerDown(ev);
			case 'pointermove': return this.handleDocumentPointerMove(ev);
			case 'pointerup': return this.handleDocumentPointerUp(ev);
		}
	}

	handlePointerDown (ev) {
		ev.preventDefault();

		this.prevX = ev.clientX;
		this.prevY = ev.clientY;

		document.addEventListener('pointermove', this);
		document.addEventListener('pointerup', this);
	}

	handleDocumentPointerMove (ev) {
		ev.preventDefault();

		const x = ev.clientX;
		const y = ev.clientY;

		this.currX = this.prevX - x;
		this.currY = this.prevY - y;
		this.prevX = x;
		this.prevY = y;

		this.style.top = `${this.offsetTop - this.currY}px`;
		this.style.left = `${this.offsetLeft - this.currX}px`;
	}

	handleDocumentPointerUp () {
		document.removeEventListener('pointermove', this);
		document.removeEventListener('pointerup', this);
	}
}

customElements.define('x-window', WindowController);

export default WindowController;
