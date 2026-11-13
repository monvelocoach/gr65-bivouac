import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import spots from './data/spots.sample.json';
import track from './data/track.sample.json';
import stages from './data/stages.sample.json';
import './App.css';

function App() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [selectedStage, setSelectedStage] = useState<any>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [3.5, 44.5],
      zoom: 6
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.current.addControl(new maplibregl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true
    }), 'top-right');

    map.current.on('load', () => {
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
          'line-width': 5,
          'line-opacity': 0.9
        }
      });

      spots.forEach((spot: any) => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundColor = spot.water ? '#4CAF50' : '#E4B15A';
        el.style.width = '18px';
        el.style.height = '18px';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 0 4px rgba(0,0,0,0.5)';

        new maplibregl.Marker(el)
          .setLngLat([spot.lng, spot.lat])
          .setPopup(
            new maplibregl.Popup({ offset: 20 }).setHTML(
              `<strong>${spot.name}</strong><br/>
               Type: ${spot.type}<br/>
               Eau: ${spot.water ? '✅' : '❌'}<br/>
               ${spot.legal ? `Légal: ${spot.legal}<br/>` : ''}
               ${spot.notes || ''}`
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
      <header>
        <h1>GR65 Bivouac</h1>
        <p>Genève → Saint-Jean-Pied-de-Port · Mode bivouac</p>
      </header>

      <div className="layout">
        <div ref={mapContainer} className="map" />

        <aside className="panel">
          <section>
            <h2>Planificateur</h2>
            <ul className="stages">
              {stages.map((s: any) => (
                <li key={s.id} onClick={() => setSelectedStage(s)} className={selectedStage?.id === s.id ? 'active' : ''}>
                  <strong>{s.name}</strong><br/>
                  <small>{s.distance} km · {s.days} j · Eau: {s.waterPoints}</small>
                </li>
              ))}
            </ul>
            {selectedStage && (
              <div className="detail">
                <h3>{selectedStage.name}</h3>
                <p>{selectedStage.notes}</p>
              </div>
            )}
          </section>

          <section>
            <h2>Réglementation bivouac</h2>
            <ul className="rules">
              <li><strong>Suisse (départ Genève)</strong> : Tolérance au-dessus de la limite des arbres pour 1 nuit (CC art. 699). Interdit dans parcs nationaux, zones de chasse, réserves.</li>
              <li><strong>France</strong> : Bivouac généralement toléré du coucher au lever hors zones protégées, sites classés, 200m des captages, terrains privés sans accord.</li>
              <li><strong>Toujours</strong> : Leave No Trace, pas de feu, distance des habitations, vérifier panneaux locaux.</li>
            </ul>
          </section>

          <section>
            <h2>Offline</h2>
            <p>PWA configurée. Pour tuiles offline complètes : pré-télécharger une zone (ex. via PMTiles ou cache Workbox) ou utiliser OsmAnd en complément.</p>
            <p><em>Track actuel = sample approximatif. Remplacer par un GPX réel (sources : VisuGPX, FFRandonnée, Bivimap).</em></p>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default App;
