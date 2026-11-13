# GR65 Bivouac

Ébauche d'application PWA pour le Chemin de Compostelle GR65 (Via Gebennensis + Via Podiensis) de Genève à Saint-Jean-Pied-de-Port en mode bivouac.

## Objectif
App offline-first orientée autonomie : spots de bivouac, points d'eau, réglementation locale (Suisse/France), planificateur d'étapes, suivi GPS.

## Stack envisagée
- PWA (Vite + React ou Vue)
- MapLibre + OpenStreetMap (tuiles offline)
- IndexedDB / Service Worker pour offline
- Backend optionnel (Node.js) pour spots crowdsourcés

## Structure
```
/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   └── App.tsx
├── package.json
└── README.md
```

## Prochaines étapes
- [ ] Carte interactive avec track GPX officiel
- [ ] Base de spots bivouac (eau, abris, légalité)
- [ ] Couche réglementation
- [ ] Planificateur d'étapes
- [ ] Mode offline complet
- [ ] Contribution communautaire

**Note** : Respecter les règles locales de bivouac. Le bivouac est généralement toléré du coucher au lever du soleil hors zones protégées et avec autorisation sur terrain privé.
