# KRNZY MEDIA — site + Edit Suite (React)

## Run locally
    npm install
    npm run dev

## Build
    npm run build   →  dist/

## Deploy (Vercel)
Import the repo (or `dist/` via vercel.com/drop). Framework preset: Vite. No env vars needed.
Routing uses HashRouter (`/#/suite`) so it works on any static host with zero config.

## Where to edit content
- `src/data.js` — ALL clips, clients, metrics.
  ⚠️ views / retention / lift are SAMPLE numbers. Replace with real
  YT Studio analytics before launch — fake metrics can kill deals
  and are false advertising.
- 3D model: `public/camera.glb` — "Antique Camera", Khronos glTF
  Sample Assets (CC0), Draco-compressed. Credit kept in footer.
