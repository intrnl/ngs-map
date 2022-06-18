import WindowController from './window';
import { query } from './lib/x-controller.js';

import { t } from './locale.js';


class QuestInfoWindowController extends WindowController {
	/** @type {HTMLSpanElement} */
	get title () { return query(this, 'title'); }

	/** @type {HTMLImageElement} */
	get maxPlayersIcon () { return query(this, 'maxPlayersIcon'); }
	/** @type {HTMLSpanElement} */
	get questName () { return query(this, 'questName'); }
	/** @type {HTMLParagraphElement} */
	get questDescription () { return query(this, 'questDescription'); }

	currentData = null;

	initialize () {
		this.title.textContent = t(`ui.quest_info.title`);
	}

	update (data, type) {
		if (!type || !data || data === this.currentData) {
			return;
		}

		this.maxPlayersIcon.src = `/assets/ui/players_${data.max_players}.png`;
		this.maxPlayersIcon.title = t(`ui.quest_info.max_players_info`, { value: data.max_players });
		this.questName.textContent = t(`${type}.${data.id}.name`);
		this.questDescription.textContent = t(`${type}.${data.id}.description`);

		this.currentData = data;
	}
}

customElements.define('x-quest-info-window', QuestInfoWindowController);

export default QuestInfoWindowController;
