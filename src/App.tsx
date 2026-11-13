import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import spotsData from './data/spots.sample.json';
import track from './data/track.sample.json';
import stages from './data/stages.sample.json';
import './App.css';

function App() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [selectedStage, setSelectedStage] = useState<any>(null);
  const [spots, setSpots] = useState<any[]>(() => {
    const saved = localStorage.getItem('gr65-spots');
    return saved ? JSON.parse(saved) : spotsData;
  });
  const [gpsStatus, setGpsStatus] = useState('Inactif');
  const [newSpot, setNewSpot] = useState({ name: '', lat: '', lng: '', water: false, notes: '' });
  const [journal, setJournal] = useState<string[]>(() => {
    const saved = localStorage.getItem('gr65-journal');
    return saved ? JSON.parse(saved) : [];
  });
  const [journalEntry, setJournalEntry] = useState('');

  useEffect(() => {
    localStorage.setItem('gr65-spots', JSON.stringify(spots));
  }, [spots]);

  useEffect(() => {
    localStorage.setItem('gr65-journal', JSON.stringify(journal));
  }, [journal]);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [3.5, 44.5],
      zoom: 6
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    const geo = new maplibregl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true
    });
    map.current.addControl(geo, 'top-right');

    geo.on('geolocate', () => setGpsStatus('Actif'));
    geo.on('error', () => setGpsStatus('Erreur'));

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

      addMarkers(spots);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const addMarkers = (spotList: any[]) => {
    if (!map.current) return;
    spotList.forEach((spot: any) => {
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
             Type: ${spot.type || 'bivouac'}<br/>
             Eau: ${spot.water ? '✅' : '❌'}<br/>
             ${spot.notes || ''}`
          )
        )
        .addTo(map.current!);
    });
  };

  const handleAddSpot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpot.name || !newSpot.lat || !newSpot.lng) return;
    const spot = {
      id: Date.now().toString(),
      name: newSpot.name,
      lat: parseFloat(newSpot.lat),
      lng: parseFloat(newSpot.lng),
      type: 'bivouac',
      water: newSpot.water,
      notes: newSpot.notes
    };
    const updated = [...spots, spot];
    setSpots(updated);
    addMarkers([spot]);
    setNewSpot({ name: '', lat: '', lng: '', water: false, notes: '' });
  };

  const addJournalEntry = () => {
    if (!journalEntry.trim()) return;
    const entry = `${new Date().toLocaleString()} — ${journalEntry}`;
    setJournal([entry, ...journal]);
    setJournalEntry('');
  };

  return (
    <div className="app">
      <header>
        <h1>GR65 Bivouac</h1>
        <p>Genève → Saint-Jean-Pied-de-Port · Mode bivouac · GPS: {gpsStatus}</p>
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
            <h2>Ajouter un spot</h2>
            <form onSubmit={handleAddSpot} className="form">
              <input placeholder="Nom" value={newSpot.name} onChange={e => setNewSpot({...newSpot, name: e.target.value})} required />
              <input placeholder="Latitude" value={newSpot.lat} onChange={e => setNewSpot({...newSpot, lat: e.target.value})} required />
              <input placeholder="Longitude" value={newSpot.lng} onChange={e => setNewSpot({...newSpot, lng: e.target.value})} required />
              <label><input type="checkbox" checked={newSpot.water} onChange={e => setNewSpot({...newSpot, water: e.target.checked})} /> Eau disponible</label>
              <textarea placeholder="Notes" value={newSpot.notes} onChange={e => setNewSpot({...newSpot, notes: e.target.value})} />
              <button type="submit">Ajouter (persisté)</button>
            </form>
          </section>

          <section>
            <h2>Journal de bord</h2>
            <div className="form">
              <textarea placeholder="Note du jour..." value={journalEntry} onChange={e => setJournalEntry(e.target.value)} />
              <button type="button" onClick={addJournalEntry}>Ajouter au journal</button>
            </div>
            <ul className="journal">
              {journal.map((entry, i) => <li key={i}>{entry}</li>)}
            </ul>
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
            <h2>Offline & Suivi</h2>
            <p>Spots et journal persistés en localStorage. PWA + cache de base. GPS via contrôle MapLibre.</p>
            <p><em>Track = sample. Pour GPX réel : remplacer track.sample.json.</em></p>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default App;
