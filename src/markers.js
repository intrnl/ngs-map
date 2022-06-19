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

			node.setAttribute('x-action', 'click:x-app#handleMarkerClick');

			node.$type = name;
			node.$data = item;
		}
	});

	return group;
}
