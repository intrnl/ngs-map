import './lib/x-action.js';
import { query } from './lib/x-controller';

import * as L from 'leaflet';

import { markers, groups } from './markers.js';

import './styles/base.css';
import './styles/app.css';
import 'leaflet/dist/leaflet.css';

import WindowController from './window.js';
import { loadLocale, t } from './locale.js';
import { renderMapLegend } from './template.jsx';


const MAP_NORTH = 0;
const MAP_SOUTH = -2048;
const MAP_WEST = 0;
const MAP_EAST = 2048;

const CONFIG = JSON.parse(localStorage.getItem('config') || '{}');

const LOCALE = CONFIG.locale || 'en-US';
const ENABLED_MARKERS = CONFIG.markers || ['cocoons', 'mags', 'ryukers', 'trinitas', 'urgents'];

await loadLocale(LOCALE);

class AppController extends HTMLElement {
	targets = {
		/** @type {HTMLDivElement} */
		mapContainer: query(this, 'mapContainer'),

		/** @type {HTMLButtonElement} */
		zoomInButton: query(this, 'zoomInButton'),
		/** @type {HTMLButtonElement} */
		zoomOutButton: query(this, 'zoomOutButton'),

		/** @type {HTMLDivElement} */
		latlngWindow: query(this, 'latlngWindow'),

		/** @type {WindowController} */
		legendWindow: query(this, 'legendWindow'),
		/** @type {HTMLSpanElement} */
		legendWindowTitle: query(this, 'legendWindowTitle'),
		/** @type {HTMLDivElement} */
		legendWindowContent: query(this, 'legendWindowContent'),
	};

	/** @type {?L.Map} */
	map = null;

	constructor () {
		super();

		// Initialize map
		const map = L.map(this.targets.mapContainer, {
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

		L.tileLayer('/tiles/{z}/{y}-{x}.png', {
			noWrap: true,
			minNativeZoom: 0,
			maxNativeZoom: 2,
			tileSize: 1024,
			bounds: [[MAP_SOUTH, MAP_WEST], [MAP_NORTH, MAP_EAST]],
		}).addTo(map);

		map.addEventListener('zoomend', () => {
			this.handleCanZoom();
		});

		map.addEventListener('mousemove', (ev) => {
			const { lat, lng } = ev.latlng;
			this.targets.latlngWindow.innerText = `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
		});

		for (const key in markers) {
			if (ENABLED_MARKERS.includes(key)) {
				const group = markers[key];
				group.addTo(map);
			}
		}

		this.map = map;

		// Initialize map layers
		const legendWindowTitle = this.targets.legendWindowTitle;
		const legendWindowContent = this.targets.legendWindowContent;

		legendWindowTitle.textContent = t('ui.map_legend');
		legendWindowContent.appendChild(renderMapLegend(groups, ENABLED_MARKERS));
	}

	connectedCallback () {
		// make sure the map knows about its container size
		requestAnimationFrame(() => {
			this.map.invalidateSize();
		});
	}

	handleCanZoom () {
		const map = this.map;
		const { zoomInButton, zoomOutButton } = this.targets;

		const zoom = map.getZoom();
		const maxZoom = map.getMaxZoom();
		const minZoom = map.getMinZoom();

		zoomInButton.disabled =	zoom >= maxZoom;
		zoomOutButton.disabled = zoom <= minZoom;
	}

	handleZoomIn () {
		this.map.zoomIn();
	}

	handleZoomOut () {
		this.map.zoomOut();
	}

	handleLandmarkChange (ev) {
		const target = ev.target;
		const value = target.value;
		const checked = target.checked;

		const map = this.map;
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

		this._saveConfig();
	}

	openLegendWindow () {
		this.targets.legendWindow.toggleWindow();
	}

	_saveConfig () {
		const config = {
			locale: LOCALE,
			markers: ENABLED_MARKERS,
		};

		localStorage.setItem('config', JSON.stringify(config));
	}
}

customElements.define('x-app', AppController);
