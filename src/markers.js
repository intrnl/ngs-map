import L from 'leaflet';

const Landmark = L.Icon.extend({ options: { iconSize: [40, 40], iconAnchor: [20, 20] } });

export const markers = {
	ryukers: createMarker('ryukers', '/_data/ryukers.json', new Landmark({ iconUrl: '/assets/landmarks/ryuker.png' })),
	mags: createMarker('mags', '/_data/mags.json', new Landmark({ iconUrl: '/assets/landmarks/mag.png' })),
	battledias: createMarker('battledias', '/_data/battledias.json', new Landmark({ iconUrl: '/assets/landmarks/battledia.png' })),
	cocoons: createMarker('cocoons', '/_data/cocoons.json', new Landmark({ iconUrl: '/assets/landmarks/cocoon.png' })),
	towers: createMarker('towers', '/_data/towers.json', new Landmark({ iconUrl: '/assets/landmarks/tower.png' })),
	trinitas: createMarker('trinitas', '/_data/trinitas.json', new Landmark({ iconUrl: '/assets/landmarks/trinitas.png' })),
	urgents: createMarker('urgents', '/_data/urgents.json', new Landmark({ iconUrl: '/assets/landmarks/urgent.png' })),
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

			const marker = L.marker([lat, lng], { icon });

			if (name === 'mags') {
				marker.bindPopup(`<strong>${item.type}</strong>`);
			} else {
				marker.bindPopup(`<strong>${item.id}</strong>`)
			}

			marker.addTo(group);
		}
	});

	return group;
}
