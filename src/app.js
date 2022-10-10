import './lib/x-action.js';
import { query } from './lib/x-controller.js';

import * as L from 'leaflet';

import { markers, groups } from './markers.js';

import './styles/base.css';
import './styles/app.css';
import 'leaflet/dist/leaflet.css';

import './tree.js';
import WindowController from './window.js';
import LegendWindowController from './window-legend.js';
import QuestInfoWindowController from './window-quest-info.js';
import { renderDevToolsWindow } from './template.jsx';
import { loadLocale } from './locale.js';


const MAP_NORTH = 0;
const MAP_SOUTH = -2048;
const MAP_WEST = 0;
const MAP_EAST = 2048;

const CONFIG = JSON.parse(localStorage.getItem('config') || '{}');

const LOCALE = CONFIG.locale || 'en-US';
const ENABLED_MARKERS = CONFIG.markers || groups.landmarks.slice();

await loadLocale(LOCALE);

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
			group.addTo(map);
		}

		this.#map = map;
		this.updateCanZoom();

		// make sure the map knows about its container size
		requestAnimationFrame(() => {
			this.#map.invalidateSize();
		});

		// Initialize windows
		this.#legendWindow.initialize(groups, ENABLED_MARKERS);
		this.#questInfoWindow.initialize();

		if (DEV) {
			const devtoolsWindow = renderDevToolsWindow(groups);

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
			group.addTo(map);

			ENABLED_MARKERS.push(value);
		}
		else {
			group.removeFrom(map);

			const idx = ENABLED_MARKERS.indexOf(value);
			if (idx !== -1) {
				ENABLED_MARKERS.splice(idx, 1);
			}
		}

		this.#saveConfig();
	}

	openLegendWindow () {
		this.#legendWindow.toggleWindow();
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
			markers: ENABLED_MARKERS,
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

		/**
		 * @param {MouseEvent} ev
		 */
		addMarker (ev) {
			if (this.#inprogress) {
				return;
			}

			this.#inprogress = true;

			const map = this.#map;
			const container = map.getContainer();

			const value = ev.target.value;
			const group = markers[value];

			const icon = group.$icon;

			/** @type {import('leaflet').Marker} */
			const cursor = L.marker([0, 0], { icon, zIndexOffset: 100 });
			let init = false;

			container.style.cursor = 'crosshair';

			/**
			 * @param {import('leaflet').LeafletMouseEvent} ev
			 */
			const handleMouseMove = (ev) => {
				const latlng = ev.latlng;
				cursor.setLatLng(latlng);

				if (!init) {
					cursor.addTo(map);

					const element = cursor.getElement();
					element.style.display = '';
					element.style.cursor = 'inherit';
					init = true;
				}
			};

			/**
			 * @param {import('leaflet').LeafletMouseEvent} ev
			 */
			const handleContextMenu = (ev) => {
				ev.originalEvent.preventDefault();

				container.style.cursor = '';

				cursor.removeFrom(map);

				map.off('mousemove', handleMouseMove);
				map.off('contextmenu', handleContextMenu);

				this.#inprogress = false;
			};


			map.on('mousemove', handleMouseMove);
			map.on('contextmenu', handleContextMenu);
		}
	}

	customElements.define('x-devtools-window', DevToolsWindowController);
}

customElements.define('x-app', AppController);
