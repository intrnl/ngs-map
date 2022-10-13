import WindowController from './x-window.js';
import { query } from '~/lib/x-controller.js';


class SettingsWindowController extends WindowController {
	/** @type {HTMLDivElement} */
	get #settingsChangeBanner () { return query(this, 'settingsChangeBanner'); }
	/** @type {HTMLSpanElement} */
	get #commitHash () { return query(this, 'commitHash'); }

	/** @type {HTMLSelectElement} */
	get #languageOption () { return query(this, 'languageOption'); }

	initialize (locale) {
		this.#settingsChangeBanner.style.display = 'none';
		this.#commitHash.textContent = COMMIT_HASH;

		this.#languageOption.value = locale;
	}

	showBanner () {
		this.#settingsChangeBanner.style.display = '';
	}

	reloadPage () {
		window.location.reload();
	}
}

customElements.define('x-settings-window', SettingsWindowController);

export default SettingsWindowController;
