# Harshit Mittal — AI Product Portfolio

A personal portfolio showcasing AI-augmented product management work. Built with React + Vite.

## Features
- Personal hero landing page
- Interactive mobile prototype (Rapido Smart Commute Card)
- Canvas-animated map with driver tracking
- Project detail pages with Overview, Prototype, and Metrics tabs

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add to package.json scripts: `"deploy": "vite build && gh-pages -d dist"`
4. Run: `npm run deploy`

## Deploy to Vercel (Recommended — easiest)

1. Push this repo to GitHub
2. Go to vercel.com → Import Project → Select this repo
3. Done. Auto-deploys on every push.

## Deploy to Netlify

1. Push this repo to GitHub
2. Go to netlify.com → Add new site → Import from GitHub
3. Build command: `npm run build`
4. Publish directory: `dist`

## Tech Stack
- React 18
- Vite
- Canvas API (animated map)
- No external UI libraries
