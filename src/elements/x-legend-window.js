import WindowController from './x-window.js';
import { query } from '../lib/x-controller.js';

import { renderMapLegend } from '../template.jsx';


class LegendWindowController extends WindowController {
	/** @type {HTMLDivElement} */
	get #content () { return query(this, 'content'); }


	initialize (enabled) {
		this.#content.appendChild(renderMapLegend(enabled));
	}

	reinitialize (enabled) {
		this.#content.innerHTML = '';
		this.initialize(enabled);
	}
}

customElements.define('x-legend-window', LegendWindowController);

export default LegendWindowController;
