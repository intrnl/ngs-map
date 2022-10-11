import WindowController from './x-window.js';
import { query } from '../lib/x-controller.js';

import { renderMapLegend } from '../template.jsx';
import { markers } from '../markers.js';


class LegendWindowController extends WindowController {
	/** @type {HTMLDivElement} */
	get #content () { return query(this, 'content'); }


	initialize (enabled) {
		this.#content.appendChild(renderMapLegend(enabled));
	}

	reinitialize (enabled) {
		for (const input of this.querySelectorAll('input')) {
			const key = input.value;

			const checked = enabled.has(key);
			const marker = markers[key];

			input.checked = checked;
			input.parentElement.style.setProperty('--dot-color', marker.$color || '');
		}
	}
}

customElements.define('x-legend-window', LegendWindowController);

export default LegendWindowController;
