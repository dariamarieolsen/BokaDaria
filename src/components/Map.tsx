import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import HairdresserIcon from '../assets/hairdresser.png'

function Map() {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<mapboxgl.Map | null>(null);
	const [error, setError] = useState<string | null>(null);


	// const locations = [
	// 	{
	// 		coordinates: [-74.0060, 40.7128],
	// 		name: 'New York City'
	// 	},
	// 	{
	// 		coordinates: [-118.2437, 34.0522],
	// 		name: 'Los Angeles'
	// 	},
	// 	// ... more locations
	// ];

	// locations.forEach(location => {
	// 	// create a marker for each location
	// 	new mapboxgl.Marker()
	// 		.setLngLat(location.coordinates)
	// 		.addTo(map);
	// });

	const createCustomMarker = (image: string) => {
		const el = document.createElement('div');
		// add a class or style to the element
		el.className = 'custom-marker';
		el.style.backgroundImage = `url(${image})`;
		el.style.width = '32px';
		el.style.height = '32px';
		el.style.backgroundSize = 'cover';
		el.style.borderRadius = '50%'; // optional
		el.style.cursor = 'pointer';

		return el;
	};

	const addMarkers = () => {
		const customElement = createCustomMarker(HairdresserIcon);

		const marker = new mapboxgl.Marker({
			element: customElement,
			scale: 1.5,
			color: 'red'

		})
			.setLngLat([12.980692, 55.611703])
			.setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))

			.addTo(mapRef.current!);

		return marker;
	};

	useEffect(() => {
		if (!mapContainer.current) return;

		const accessToken = import.meta.env.VITE_ACCESS_TOKEN_MAP;
		if (!accessToken) {
			setError('Mapbox access token is missing');
			return;
		}

		mapboxgl.accessToken = accessToken;
		console.log("Token is:", accessToken);


		try {
			mapRef.current = new mapboxgl.Map({
				container: mapContainer.current,
				center: [13.0038, 55.6050], // starting position [lng, lat]
				zoom: 12, // starting zoom
			});
		} catch (err) {
			setError('Failed to initialize map');
			return;
		}

		mapRef.current.on('load', () => {
			addMarkers();
		});

		return () => {
			mapRef.current?.remove();
			mapRef.current = null;
		};
	}, []);

	if (error) {
		return (
			<div className='mapContainer' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', color: '#666' }}>
				<p>Map unavailable: {error}</p>
			</div>
		);
	}

	return (
		<div
			id="map"
			ref={mapContainer}
			className='mapContainer'
		/>
	);
}

export default Map
