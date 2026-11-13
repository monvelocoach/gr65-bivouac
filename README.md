# GR65 Bivouac

Ébauche d'application PWA pour le Chemin de Compostelle GR65 (Via Gebennensis + Via Podiensis) de Genève à Saint-Jean-Pied-de-Port en mode bivouac.

## Objectif
App offline-first orientée autonomie : spots de bivouac, points d'eau, réglementation locale (Suisse/France), planificateur d'étapes, suivi GPS.

## Stack
- PWA (Vite + React + TypeScript)
- MapLibre GL JS
- vite-plugin-pwa

## État actuel
- Carte MapLibre + contrôles (navigation, géolocalisation)
- Track sample détaillé
- Markers spots avec popups
- Planificateur d'étapes
- Ajout de spots **persistés** (localStorage)
- Journal de bord **persisté** (localStorage)
- Statut GPS
- Réglementation
- PWA + layout responsive

## Lancer
```bash
npm install
npm run dev
```

## Prochaines étapes
- [x] Carte + track sample
- [x] Spots + markers
- [x] Planificateur
- [x] Réglementation
- [x] Contribution spots (locale)
- [x] Suivi GPS basique
- [x] Persistance localStorage (spots + journal)
- [x] Journal de bord
- [ ] Track GPX réel (remplacer track.sample.json)
- [ ] Tuiles offline complètes (PMTiles)

**Note** : Respecter les règles locales de bivouac. Le bivouac est généralement toléré du coucher au lever du soleil hors zones protégées et avec autorisation sur terrain privé.

Pour un track réel, remplace `src/data/track.sample.json` par un GeoJSON converti depuis GPX.
