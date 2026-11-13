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
- Track sample (GeoJSON approximatif)
- Markers spots avec popups (eau, légalité, notes)
- Panneau planificateur d'étapes
- Section réglementation (Suisse / France)
- Config PWA améliorée (cache de base)
- Layout responsive

## Lancer
```bash
npm install
npm run dev
```

## Prochaines étapes
- [x] Carte interactive + track sample
- [x] Spots + markers
- [x] Planificateur d'étapes (sample)
- [x] Réglementation de base
- [ ] Track GPX réel (sources : VisuGPX, FFRandonnée, Bivimap, MonGR)
- [ ] Tuiles offline complètes (PMTiles ou pré-cache zone)
- [ ] Contribution communautaire (ajout spots)
- [ ] Suivi GPS + journal

**Note** : Respecter les règles locales de bivouac. Le bivouac est généralement toléré du coucher au lever du soleil hors zones protégées et avec autorisation sur terrain privé.

Pour un track réel, remplace `src/data/track.sample.json` par un GeoJSON converti depuis GPX (ou adapte le code pour charger un fichier GPX).
