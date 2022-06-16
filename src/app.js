import './lib/x-action.js';
import { query } from './lib/x-controller';

import * as L from 'leaflet';

import { markers } from './markers.js';

import './styles/base.css';
import './styles/app.css';
import 'leaflet/dist/leaflet.css';


const MAP_NORTH = 0;
const MAP_SOUTH = -2048;
const MAP_WEST = 0;
const MAP_EAST = 2048;

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
	};

	/** @type {?L.Map} */
	map = null;
	layersInitialized = false;

	connectedCallback () {
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
			const group = markers[key];
			group.addTo(map);
		}

		this.map = map;

		// make sure the map knows about its container size
		requestAnimationFrame(() => {
			this.map?.invalidateSize();
		});
	}

	disconnectedCallback () {
		const map = this.map;

		if (map) {
			map.remove();
			this.map = null;
		}
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
		this.map?.zoomIn();
	}

	handleZoomOut () {
		this.map?.zoomOut();
	}
}

customElements.define('x-app', AppController);
