import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import spots from './data/spots.sample.json';
import track from './data/track.sample.json';
import './App.css';

function App() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json', // style simple pour démo
      center: [3.5, 44.5],
      zoom: 6
    });

    map.current.on('load', () => {
      // Track sample
      map.current!.addSource('gr65', {
        type: 'geojson',
        data: track as any
      });
      map.current!.addLayer({
        id: 'gr65-line',
        type: 'line',
        source: 'gr65',
        paint: {
          'line-color': '#E4B15A',
          'line-width': 4
        }
      });

      // Markers spots
      spots.forEach((spot: any) => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundColor = spot.water ? '#4CAF50' : '#E4B15A';
        el.style.width = '16px';
        el.style.height = '16px';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';

        new maplibregl.Marker(el)
          .setLngLat([spot.lng, spot.lat])
          .setPopup(
            new maplibregl.Popup().setHTML(
              `<strong>${spot.name}</strong><br/>${spot.notes || ''}<br/>Eau: ${spot.water ? 'Oui' : 'Non'}`
            )
          )
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="app">
      <h1>GR65 Bivouac</h1>
      <p>Ébauche — Genève → Saint-Jean-Pied-de-Port</p>
      <div ref={mapContainer} className="map" />
    </div>
  );
}

export default App;
