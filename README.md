# GR65 Bivouac

Ébauche d'application PWA pour le Chemin de Compostelle GR65 (Via Gebennensis + Via Podiensis) de Genève à Saint-Jean-Pied-de-Port en mode bivouac.

## Objectif
App offline-first orientée autonomie : spots de bivouac, points d'eau, réglementation locale (Suisse/France), planificateur d'étapes, suivi GPS.

## Stack
- PWA (Vite + React + TypeScript)
- MapLibre GL JS
- vite-plugin-pwa

## État actuel
- Carte MapLibre interactive
- Track sample (GeoJSON approximatif)
- Markers de spots avec popups (eau, notes)
- Styles de base (thème sombre)

## Lancer
```bash
npm install
npm run dev
```

## Prochaines étapes
- [x] Carte interactive + track sample
- [x] Spots + markers
- [ ] Track GPX réel
- [ ] Couche réglementation
- [ ] Planificateur d'étapes
- [ ] Mode offline complet (tuiles)
- [ ] Contribution communautaire

**Note** : Respecter les règles locales de bivouac. Le bivouac est généralement toléré du coucher au lever du soleil hors zones protégées et avec autorisation sur terrain privé.
