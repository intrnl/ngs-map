import WindowController from './window';
import { query } from './lib/x-controller.js';

import { t } from './locale.js';
import { renderMapLegend } from './template.jsx';


class LegendWindowController extends WindowController {
	/** @type {HTMLSpanElement} */
	get #title () { return query(this, 'title'); }
	/** @type {HTMLDivElement} */
	get #content () { return query(this, 'content'); }


	initialize (data, enabled) {
		this.#title.textContent = t(`ui.map_legend`);
		this.#content.appendChild(renderMapLegend(data, enabled));
	}
}

customElements.define('x-legend-window', LegendWindowController);

export default LegendWindowController;
