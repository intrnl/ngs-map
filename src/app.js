import './lib/x-action.js';
import { query } from './lib/x-controller.js';
import { initializeI18n } from './lib/x-i18n.js';

import * as L from 'leaflet';

import { markers, groups } from './markers.js';

import 'leaflet/dist/leaflet.css';
import './styles/base.css';
import './styles/app.css';

import './elements/x-tree.js';
import WindowController from './elements/x-window.js';
import LegendWindowController from './elements/x-legend-window.js';
import QuestInfoWindowController from './elements/x-quest-info-window.js';
import SettingsWindowController from './elements/x-settings-window.js';
import { renderDevToolsWindow } from './template.jsx';
import { loadLocale } from './locale.js';


const MAP_NORTH = 0;
const MAP_SOUTH = -2048;
const MAP_WEST = 0;
const MAP_EAST = 2048;

const CONFIG = JSON.parse(localStorage.getItem('config') || '{}');

const LOCALE = CONFIG.locale || 'en-US';
const DEFAULT_MARKERS = groups.landmarks.slice();
let ENABLED_MARKERS = new Set(CONFIG.markers || DEFAULT_MARKERS);

await loadLocale(LOCALE);
initializeI18n();

class AppController extends HTMLElement {
	/** @type {HTMLDivElement} */
	get #mapContainer () { return query(this, 'mapContainer'); }

	/** @type {HTMLButtonElement} */
	get #zoomInButton () { return query(this, 'zoomInButton'); }
	/** @type {HTMLButtonElement} */
	get #zoomOutButton () { return query(this, 'zoomOutButton'); }

	/** @type {HTMLDivElement} */
	get #latlngWindow () { return query(this, 'latlngWindow'); }
	/** @type {LegendWindowController} */
	get #legendWindow () { return query(this, 'legendWindow'); }
	/** @type {QuestInfoWindowController} */
	get #questInfoWindow () { return query(this, 'questInfoWindow'); }
	/** @type {SettingsWindowController} */
	get #settingsWindow () { return query(this, 'settingsWindow'); }

	/** @type {?import('leaflet').Map} */
	#map = null;

	/** @type {WindowController} */
	#activeInfoWindow = null;

	connectedCallback () {
		// Initialize map
		const map = L.map(this.#mapContainer, {
			zoom: 0,
			minZoom: 0,
			maxZoom: 2,
			crs: L.CRS.Simple,
			center: [MAP_SOUTH / 2, MAP_EAST / 2],
			maxBounds: [
				[MAP_SOUTH - 100, MAP_WEST - 100],
				[MAP_NORTH + 100, MAP_EAST + 100],
			],
			maxBoundsViscosity: 1,
			attributionControl: false,
			zoomControl: false,
		});

		L.tileLayer('tiles/{z}/{y}-{x}.webp', {
			noWrap: true,
			minNativeZoom: 0,
			maxNativeZoom: 2,
			tileSize: 1024,
			bounds: [[MAP_SOUTH, MAP_WEST], [MAP_NORTH, MAP_EAST]],
		}).addTo(map);

		map.addEventListener('zoomend', () => {
			this.updateCanZoom();
		});

		map.addEventListener('mousemove', (ev) => {
			const { lat, lng } = ev.latlng;
			this.#latlngWindow.innerText = `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
		});

		for (const key of ENABLED_MARKERS) {
			const group = markers[key];

			if (group) {
				group.addTo(map);
			}
			else {
				ENABLED_MARKERS.delete(key);
			}
		}

		this.#map = map;
		this.updateCanZoom();

		// make sure the map knows about its container size
		requestAnimationFrame(() => {
			this.#map.invalidateSize();
		});

		// Initialize windows
		this.#legendWindow.initialize(ENABLED_MARKERS);
		this.#questInfoWindow.initialize();

		if (DEV) {
			const devtoolsWindow = renderDevToolsWindow();

			this.appendChild(devtoolsWindow);
			devtoolsWindow.initialize(this.#map);
		}
	}

	updateCanZoom () {
		const map = this.#map;

		const zoom = map.getZoom();
		const maxZoom = map.getMaxZoom();
		const minZoom = map.getMinZoom();

		this.#zoomInButton.disabled = zoom >= maxZoom;
		this.#zoomOutButton.disabled = zoom <= minZoom;
	}

	zoomIn () {
		this.#map.zoomIn();
	}

	zoomOut () {
		this.#map.zoomOut();
	}

	resetLegend () {
		const map = this.#map;

		for (const key of ENABLED_MARKERS) {
			const group = markers[key];
			group.removeFrom(map);
		}

		ENABLED_MARKERS = new Set(DEFAULT_MARKERS);

		for (const key of ENABLED_MARKERS) {
			const group = markers[key];
			group.addTo(map);
		}

		this.#saveConfig();
		this.#legendWindow.reinitialize(ENABLED_MARKERS);
	}

	handleLegendChange (ev) {
		const target = ev.target;
		const value = target.value;
		const checked = target.checked;

		const map = this.#map;
		const group = markers[value];

		if (!group || !map) {
			return;
		}

		if (checked) {
			try {
				group.addTo(map);
				ENABLED_MARKERS.add(value);

				target.parentElement.style.setProperty('--dot-color', group.$color);
			}
			catch (error) {
				alert(error.message);

				group.removeFrom(map);
				target.checked = false;
			}
		}
		else {
			ENABLED_MARKERS.delete(value);
			group.removeFrom(map);

			target.parentElement.style.removeProperty('--dot-color');
		}

		this.#saveConfig();
	}

	openLegendWindow () {
		this.#legendWindow.toggleWindow();
	}

	openSettingsWindow () {
		this.#settingsWindow.toggleWindow();
	}

	handleMarkerClick (ev) {
		const target = ev.target;

		const type = target.$type;
		const data = target.$data;

		const prev = this.#activeInfoWindow;
		let controller;

		switch (type) {
			case 'battledias':
			case 'cocoons':
			case 'urgents':
			case 'towers':
			case 'trinitas':
				controller = this.#questInfoWindow;
				break;
			default:
				throw new Error(`Unknown marker type: ${type}`);
		}

		if (prev && prev !== controller) {
			prev.closeWindow();
		}

		controller.update(data, type);
		controller.openWindow();

		this.#activeInfoWindow = controller;
	}

	#saveConfig () {
		const config = {
			locale: LOCALE,
			markers: [...ENABLED_MARKERS],
		};

		localStorage.setItem('config', JSON.stringify(config));
	}
}

if (DEV) {
	class DevToolsWindowController extends WindowController {
		/** @type {import('leaflet').Map} */
		#map;

		#inprogress = false;

		initialize (map) {
			this.#map = map;
		}

		addPointer () {
			if (this.#inprogress) {
				return;
			}

			this.#inprogress = true;

			const map = this.#map;
			const container = map.getContainer();

			container.style.cursor = 'crosshair';

			const handleContextMenu = (ev) => {
				ev.originalEvent.preventDefault();

				container.style.cursor = '';

				map.off('contextmenu', handleContextMenu);
				map.off('click', handleClick);

				this.#inprogress = false;
			};

			const handleClick = (ev) => {
				ev.originalEvent.stopPropagation();
			}

			map.on('contextmenu', handleContextMenu);
			map.on('click', handleClick);
		}
	}

	customElements.define('x-devtools-window', DevToolsWindowController);
}

customElements.define('x-app', AppController);
