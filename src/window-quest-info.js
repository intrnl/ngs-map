import WindowController from './window';
import { query } from './lib/x-controller.js';

import { t } from './locale.js';


class QuestInfoWindowController extends WindowController {
	/** @type {HTMLSpanElement} */
	get #title () { return query(this, 'title'); }

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
	get #recommendedPowerTitle () { return query(this, 'recommendedPowerTitle'); }
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
	get #sideMissionsTitle () { return query(this, 'sideMissionsTitle'); }
	/** @type {HTMLTableCellElement} */
	get #sideMissionsContent () { return query(this, 'sideMissionsContent'); }

	/** @type {HTMLTableRowElement} */
	get #failConditions () { return query(this, 'failConditions'); }
	/** @type {HTMLTableCellElement} */
	get #failConditionsTitle () { return query(this, 'failConditionsTitle'); }
	/** @type {HTMLTableCellElement} */
	get #failConditionsContent () { return query(this, 'failConditionsContent'); }

	/** @type {HTMLTableRowElement} */
	get #firstClearRewards () { return query(this, 'firstClearRewards'); }
	/** @type {HTMLTableCellElement} */
	get #firstClearRewardsTitle () { return query(this, 'firstClearRewardsTitle'); }
	/** @type {HTMLTableCellElement} */
	get #firstClearRewardsContent () { return query(this, 'firstClearRewardsContent'); }

	/** @type {HTMLTableRowElement} */
	get #rewards () { return query(this, 'rewards'); }
	/** @type {HTMLTableCellElement} */
	get #rewardsTitle () { return query(this, 'rewardsTitle'); }
	/** @type {HTMLTableCellElement} */
	get #rewardsContent () { return query(this, 'rewardsContent'); }

	currentData = null;

	initialize () {
		this.#title.textContent = t(`ui.quest_info.title`);
		this.#enemyLevelTitle.textContent = t(`ui.quest_info.enemy_level.title`);
		this.#recommendedPowerTitle.textContent = t(`ui.quest_info.recommended_power.title`);
		this.#mainMissionTitle.textContent = t(`ui.quest_info.main_mission`);
		this.#sideMissionsTitle.textContent = t(`ui.quest_info.side_missions`);
		this.#failConditionsTitle.textContent = t(`ui.quest_info.fail_conditions`);
		this.#firstClearRewardsTitle.textContent = t(`ui.quest_info.first_clear_rewards`);
		this.#rewardsTitle.textContent = t(`ui.quest_info.rewards`);

		// Attempt to do a fixed table layout
		this.openWindow();
		this.#enemyLevelContent.textContent = 'x '.repeat(100);

		const { width } = this.#enemyLevelTitle.getBoundingClientRect();

		this.style.setProperty('--table-layout', 'fixed');
		this.style.setProperty('--header-width', `${width + 8}px`);

		this.closeWindow();
	}

	update (data, type) {
		if (!type || !data || data === this.currentData) {
			return;
		}

		this.#maxPlayersIcon.src = `/assets/ui/players_${data.max_players}.png`;
		this.#maxPlayersIcon.title = t(`ui.quest_info.max_players_info`, { value: data.max_players });
		this.#questName.textContent = t(`${type}.${data.id}.name`);
		this.#questDescription.textContent = t(`${type}.${data.id}.description`);

		this.#enemyLevelContent.textContent = t(`ui.quest_info.enemy_level.content`, { level: data.enemy_level });
		this.#recommendedPowerContent.textContent = t(`ui.quest_info.recommended_power.content`, { power: data.recommended_power });

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

		if (data.initial_rewards) {
			let rewards = '';

			for (let reward of data.initial_rewards) {
				rewards && (rewards += '\n');
				rewards += `${t(reward[0])} x${reward[1]}`;
			}

			this.#firstClearRewards.style.display = '';
			this.#firstClearRewardsContent.textContent = rewards;
		}
		else {
			this.#firstClearRewards.style.display = 'none';
		}

		if (data.rewards) {
			let rewards = '';

			for (let reward of data.initial_rewards) {
				rewards && (rewards += '\n');
				rewards += `${t(reward[0])} x${reward[1]}`;
			}

			this.#rewards.style.display = '';
			this.#rewardsContent.textContent = rewards;
		}
		else {
			this.#rewards.style.display = 'none';
		}

		this.currentData = data;
	}
}

customElements.define('x-quest-info-window', QuestInfoWindowController);

export default QuestInfoWindowController;
