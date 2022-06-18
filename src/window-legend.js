import WindowController from './window';
import { query } from './lib/x-controller.js';


class LegendWindowController extends WindowController {
	/** @type {HTMLSpanElement} */
	get title () { return query(this, 'title'); }
	/** @type {HTMLDivElement} */
	get content () { return query(this, 'content'); }
}

customElements.define('x-legend-window', LegendWindowController);

export default LegendWindowController;
