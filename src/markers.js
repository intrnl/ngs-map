import * as L from 'leaflet';

const UNIQUE_COLORS = ['#000000', '#a0522d', '#006400', '#778899', '#4b0082', '#ff0000', '#ffa500', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#1e90ff', '#98fb98', '#ffe4b5', '#ff69b4'];

const Landmark = L.Icon.extend({ options: { iconSize: [40, 40], iconAnchor: [20, 20] } });

export const markers = {
	ryukers: createMarker('ryukers', '_data/ryukers.json', new Landmark({ iconUrl: 'assets/landmarks/ryuker.webp' })),
	mags: createMarker('mags', '_data/mags.json', new Landmark({ iconUrl: 'assets/landmarks/mag.webp' })),
	battledias: createMarker('battledias', '_data/battledias.json', new Landmark({ iconUrl: 'assets/landmarks/battledia.webp' })),
	cocoons: createMarker('cocoons', '_data/cocoons.json', new Landmark({ iconUrl: 'assets/landmarks/cocoon.webp' })),
	towers: createMarker('towers', '_data/towers.json', new Landmark({ iconUrl: 'assets/landmarks/tower.webp' })),
	trinitas: createMarker('trinitas', '_data/trinitas.json', new Landmark({ iconUrl: 'assets/landmarks/trinitas.webp' })),
	urgents: createMarker('urgents', '_data/urgents.json', new Landmark({ iconUrl: 'assets/landmarks/urgent.webp' })),

	// Kvaris Fruits
	kvaris_guava: createCollectable('kvaris_guava', '_data/fruits/kvaris_guava.json'),

	// Kvaris Seafood
	kvaris_notable_squid: createCollectable('kvaris_notable_squid', '_data/seafoods/kvaris_notable_squid.json'),
	kvaris_squid: createCollectable('kvaris_squid', '_data/seafoods/kvaris_squid.json'),
};

export const groups = {
	landmarks: ['ryukers', 'mags', 'battledias', 'cocoons', 'towers', 'trinitas', 'urgents'],

	fruits: [
		// Kvaris
		'kvaris_guava',
	],
	seafoods: [
		// Kvaris
		'kvaris_notable_squid',
		'kvaris_squid',
	],
};

function createMarker (name, url, icon) {
	const group = L.layerGroup();
	let init = false;

	if (DEV) {
		group.$name = name;
		group.$icon = icon;
	}

	group.addEventListener('add', async () => {
		if (init) {
			return;
		}

		init = true;

		const response = await fetch(url);
		const json = await response.json();

		for (const item of json) {
			const lat = item.lat;
			const lng = item.lng;

			/** @type {import('leaflet').Marker} */
			const marker = L.marker([lat, lng], { icon });
			marker.addTo(group);

			const node = marker.getElement();

			node.setAttribute('x-action', 'leaflet-click:x-app#handleMarkerClick');

			node.$type = name;
			node.$data = item;

			marker.on('click', handleLeafletClick);
		}
	});

	return group;
}

function createCollectable (name, url) {
	const group = L.layerGroup();

	let color = null;
	let json;

	if (DEV) {
		group.$name = name;
	}

	group.addEventListener('add', () => {
		if (!color) {
			group.$color = color = UNIQUE_COLORS.pop();
		}

		if (!color) {
			throw new Error(`No colors.`);
		}

		let promise;

		if (!json) {
			// const response = await fetch(url);
			// json = await response.json();

			promise = fetch(url).then((response) => response.json()).then((_json) => json = _json);
		}
		else {
			promise = Promise.resolve();
		}

		promise.then(() => {
			if (!color) {
				return;
			}

			const icon = L.divIcon({ iconSize: [12, 12], className: 'x-dot-marker' });

			for (const item of json) {
				const lat = item.lat;
				const lng = item.lng;

				const marker = L.marker([lat, lng], { icon, zIndexOffset: 10 });
				marker.addTo(group);

				const node = marker.getElement();
				node.style.setProperty('--dot-color', color);
			}
		});
	});

	group.addEventListener('remove', () => {
		group.clearLayers();

		if (color) {
			UNIQUE_COLORS.push(color);
			group.$color = color = null;
		}
	});

	return group;
}

/** @param {import('leaflet').LeafletMouseEvent} ev */
function handleLeafletClick (ev) {
	const originalEvent = ev.originalEvent;
	const target = originalEvent.target;

	target.dispatchEvent(new CustomEvent('leaflet-click'));
}
