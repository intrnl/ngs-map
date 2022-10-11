import WindowController from './x-window.js';
import { query } from '../lib/x-controller.js';

import { t } from '../locale.js';
import { renderMapLegend } from '../template.jsx';


class LegendWindowController extends WindowController {
	/** @type {HTMLSpanElement} */
	get #title () { return query(this, 'title'); }
	/** @type {HTMLDivElement} */
	get #content () { return query(this, 'content'); }


	initialize (enabled) {
		this.#title.textContent = t(`ui.map_legend.title`);
		this.#content.appendChild(renderMapLegend(enabled));
	}

	reinitialize (enabled) {
		this.#content.innerHTML = '';
		this.initialize(enabled);
	}
}

customElements.define('x-legend-window', LegendWindowController);

export default LegendWindowController;
