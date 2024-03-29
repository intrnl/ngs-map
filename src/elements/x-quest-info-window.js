import WindowController from './x-window.js';
import { query } from '../lib/x-controller.js';

import { t } from '../locale.js';


function formatRomanNumeral (num) {
	if (num < 1) {
		return '';
	}

	if (num >= 9) {
		return 'IX' + formatRomanNumeral(num - 9);
	}
  if (num >= 5) {
		return 'V' + formatRomanNumeral(num - 5);
	}
  if (num >= 4) {
		return 'IV' + formatRomanNumeral(num - 4);
	}

	// num >= 1
	return 'I' + formatRomanNumeral(num - 1);
}

class QuestInfoWindowController extends WindowController {
	/** @type {HTMLSelectElement} */
	get #rankSelect () { return query(this, 'rankSelect'); }

	/** @type {HTMLImageElement} */
	get #maxPlayersIcon () { return query(this, 'maxPlayersIcon'); }
	/** @type {HTMLSpanElement} */
	get #questName () { return query(this, 'questName'); }
	/** @type {HTMLParagraphElement} */
	get #questDescription () { return query(this, 'questDescription'); }

	/** @type {HTMLTableRowElement} */
	get #enemyLevel () { return query(this, 'enemyLevel'); }
	/** @type {HTMLTableCellElement} */
	get #enemyLevelTitle () { return query(this, 'enemyLevelTitle'); }
	/** @type {HTMLTableCellElement} */
	get #enemyLevelContent () { return query(this, 'enemyLevelContent'); }

	/** @type {HTMLTableRowElement} */
	get #recommendedPower () { return query(this, 'recommendedPower'); }
	/** @type {HTMLTableCellElement} */
	get #recommendedPowerContent () { return query(this, 'recommendedPowerContent'); }

	/** @type {HTMLTableRowElement} */
	get #mainMission () { return query(this, 'mainMission'); }
	/** @type {HTMLTableCellElement} */
	get #mainMissionTitle () { return query(this, 'mainMissionTitle'); }
	/** @type {HTMLTableCellElement} */
	get #mainMissionContent () { return query(this, 'mainMissionContent'); }

	/** @type {HTMLTableRowElement} */
	get #sideMissions () { return query(this, 'sideMissions'); }
	/** @type {HTMLTableCellElement} */
	get #sideMissionsContent () { return query(this, 'sideMissionsContent'); }

	/** @type {HTMLTableRowElement} */
	get #failConditions () { return query(this, 'failConditions'); }
	/** @type {HTMLTableCellElement} */
	get #failConditionsContent () { return query(this, 'failConditionsContent'); }

	/** @type {HTMLTableRowElement} */
	get #firstClearRewards () { return query(this, 'firstClearRewards'); }
	/** @type {HTMLTableCellElement} */
	get #firstClearRewardsContent () { return query(this, 'firstClearRewardsContent'); }

	/** @type {HTMLTableRowElement} */
	get #rewards () { return query(this, 'rewards'); }
	/** @type {HTMLTableCellElement} */
	get #rewardsContent () { return query(this, 'rewardsContent'); }

	#currentData = null;

	updateRank () {
		const value = parseInt(this.#rankSelect.value);
		const data = this.#currentData;

		const rank = data.ranks[value];

		if (!rank) {
			this.#enemyLevel.style.display = 'none';
			this.#recommendedPower.style.display = 'none';
			this.#rewards.style.display = 'none';
			this.#firstClearRewards.style.display = 'none';
			return;
		}

		this.#enemyLevelContent.textContent = t(`ui.quest_info.enemy_level.content`, { level: rank.enemy_level });
		this.#recommendedPowerContent.textContent = t(`ui.quest_info.recommended_power.content`, { power: rank.recommended_power });

		if (rank.initial_rewards) {
			const rewards = this.#buildRewards(rank.initial_rewards);

			this.#firstClearRewards.style.display = '';
			this.#firstClearRewardsContent.textContent = rewards;
		}
		else if (data.initial_rewards) {
			const rewards = this.#buildRewards(data.initial_rewards);

			this.#firstClearRewards.style.display = '';
			this.#firstClearRewardsContent.textContent = rewards;
		}
		else {
			this.#firstClearRewards.style.display = 'none';
		}

		if (rank.rewards) {
			const rewards = this.#buildRewards(rank.rewards);

			this.#rewards.style.display = '';
			this.#rewardsContent.textContent = rewards;
		}
		else {
			this.#rewards.style.display = 'none';
		}
	}

	update (data, type) {
		if (!type || !data || data === this.#currentData) {
			return;
		}

		this.#currentData = data;

		this.#maxPlayersIcon.src = `assets/ui/players_${data.max_players}.webp`;
		this.#maxPlayersIcon.title = t(`ui.quest_info.max_players_info`, { value: data.max_players });
		this.#questName.textContent = t(`${type}.${data.id}.name`);
		this.#questDescription.textContent = t(`${type}.${data.id}.description`);

		if (data.ranks) {
			const select = this.#rankSelect;
			const nodes = [...select.childNodes];
			const ranks = data.ranks;

			const nodes_len = nodes.length;
			const ranks_len = ranks.length;

			let idx = 0;

			for (; idx < ranks_len; idx++) {
				const rank = ranks[idx];
				let node;

				if (idx >= nodes_len) {
					node = document.createElement('option');
					select.appendChild(node);
				}
				else {
					node = nodes[idx];
				}

				node.textContent = t(`ui.quest_info.rank_select_option`, { rank: idx + 1, level: rank.enemy_level });
				node.value = idx;
			}

			select.style.display = idx < 2 ? 'none' : '';

			for (; idx < nodes_len; idx++) {
				const node = nodes[idx];
				node.remove();
			}

			select.value = '0';
			this.updateRank();
		}
		else {
			this.#rankSelect.style.display = 'none';
		}

		if (data.main_missions) {
			let mainMission = '';

			for (let mission of data.main_missions) {
				mainMission && (mainMission += '\n');
				mainMission += t(`missions.${mission[0]}`, mission);
			}

			this.#mainMission.style.display = '';
			this.#mainMissionContent.textContent = mainMission;
		}
		else {
			this.#mainMission.style.display = 'none';
		}

		if (data.side_missions) {
			let sideMissions = '';

			for (let mission of data.side_missions) {
				sideMissions && (sideMissions += '\n');
				sideMissions += t(`missions.${mission[0]}`, mission);
			}

			this.#sideMissions.style.display = '';
			this.#sideMissionsContent.textContent = sideMissions;
		}
		else {
			this.#sideMissions.style.display = 'none';
		}

		if (data.fail_conditions) {
			let failConditions = '';

			for (let condition of data.fail_conditions) {
				failConditions && (failConditions += '\n');
				failConditions += t(`failures.${condition[0]}`, condition);
			}

			this.#failConditions.style.display = '';
			this.#failConditionsContent.textContent = failConditions;
		}
		else {
			this.#failConditions.style.display = 'none';
		}
	}

	#buildRewards (array) {
		let text = '';

		for (const [item, amount, enhStart, enhEnd] of array) {
			const isAugment = item.startsWith('items.augment_');

			if (text) {
				text += '\n';
			}

			text += t(item);

			if (enhStart) {
				text += ` ${isAugment ? formatRomanNumeral(enhStart) : `+${enhStart}`}`;
			}
			if (enhEnd) {
				text += `-${isAugment ? formatRomanNumeral(enhEnd) : enhEnd}`;
			}

			if (amount) {
				text += ` x${amount}`;
			}
		}

		return text;
	}
}

customElements.define('x-quest-info-window', QuestInfoWindowController);

export default QuestInfoWindowController;
