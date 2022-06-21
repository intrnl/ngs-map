import * as L from 'leaflet/dist/leaflet-src.esm';

const Landmark = L.Icon.extend({ options: { iconSize: [40, 40], iconAnchor: [20, 20] } });

export const markers = {
	ryukers: createMarker('ryukers', '/_data/ryukers.json', new Landmark({ iconUrl: '/assets/landmarks/ryuker.webp' })),
	mags: createMarker('mags', '/_data/mags.json', new Landmark({ iconUrl: '/assets/landmarks/mag.webp' })),
	battledias: createMarker('battledias', '/_data/battledias.json', new Landmark({ iconUrl: '/assets/landmarks/battledia.webp' })),
	cocoons: createMarker('cocoons', '/_data/cocoons.json', new Landmark({ iconUrl: '/assets/landmarks/cocoon.webp' })),
	towers: createMarker('towers', '/_data/towers.json', new Landmark({ iconUrl: '/assets/landmarks/tower.webp' })),
	trinitas: createMarker('trinitas', '/_data/trinitas.json', new Landmark({ iconUrl: '/assets/landmarks/trinitas.webp' })),
	urgents: createMarker('urgents', '/_data/urgents.json', new Landmark({ iconUrl: '/assets/landmarks/urgent.webp' })),
};

export const groups = {
	landmarks: ['ryukers', 'mags', 'battledias', 'cocoons', 'towers', 'trinitas', 'urgents'],
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

/** @param {import('leaflet').LeafletMouseEvent} ev */
function handleLeafletClick (ev) {
	const originalEvent = ev.originalEvent;
	const target = originalEvent.target;

	target.dispatchEvent(new CustomEvent('leaflet-click'));
}
