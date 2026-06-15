# Calorie Tracker PWA

A fully offline-capable Progressive Web App for tracking daily calories, macros, water, and nutrition. Built with React + Vite + Tailwind CSS. Optimized for iPhone Safari.

## Features

- **Dashboard** — Remaining calories, macro rings (protein/carbs/fat), water tracker, meal summaries, weight log, streak counter
- **Log Food** — Search 130+ Indian foods + Open Food Facts database, manual entry, quick-add calories
- **Progress** — Weight chart, calorie history, macro breakdown, streak stats, weekly summary, insights
- **Recipes** — Create and log custom recipes with ingredient-level nutrition
- **Settings** — Profile management, custom daily targets, CSV export, data reset
- **Offline** — Full offline support via service worker; data persists in IndexedDB
- **PWA** — Installable on iPhone via Safari "Add to Home Screen"

---

## Local Development

### Prerequisites
- Node.js 18+
- npm 9+

### Setup
```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000

---

## Deployment to Vercel (Free Tier)

### Step 1 — Initialize Git Repository

```bash
# From the project root (Calorie_Tracking_App/)
git init
git add web/
git commit -m "Add calorie tracker PWA"
```

### Step 2 — Push to GitHub

```bash
# Create a new repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/calorie-tracker-pwa.git
git branch -M main
git push -u origin main
```

### Step 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Configure build settings:
   - **Root Directory**: `web`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**

Vercel auto-detects Vite projects. No environment variables needed.

### Step 4 — Verify Deployment

After deployment, open your Vercel URL and check:
- [ ] App loads and shows onboarding
- [ ] Manifest is served at `/manifest.webmanifest`
- [ ] Service worker registers (DevTools → Application → Service Workers)
- [ ] No console errors

---

## Install on iPhone

1. Open your Vercel URL in **Safari** on iPhone (must be Safari, not Chrome)
2. Tap the **Share** button (rectangle with arrow at bottom)
3. Scroll down and tap **"Add to Home Screen"**
4. Name it **"Calories"** or keep the default
5. Tap **Add**
6. Launch from your Home Screen — opens fullscreen, no browser UI

### Verification
- Opens without Safari address bar ✓
- Status bar blends with app (black-translucent) ✓
- Works offline after first visit ✓
- Safe area padding for Dynamic Island/Notch ✓

---

## Architecture

```
web/
├── public/
│   └── icons/          # PWA icons (8 sizes, generated)
├── src/
│   ├── components/
│   │   ├── dashboard/  # Main home screen
│   │   ├── logfood/    # Food logging (search + manual)
│   │   ├── progress/   # Charts and analytics
│   │   ├── recipes/    # Recipe management
│   │   ├── settings/   # Profile and preferences
│   │   ├── onboarding/ # 5-step setup flow
│   │   └── layout/     # Bottom navigation
│   ├── db/             # IndexedDB layer (idb)
│   ├── store/          # Zustand state management
│   └── utils/          # Calculations, food search
├── scripts/
│   └── generate-icons.js
├── vite.config.js      # PWA plugin config
├── vercel.json         # SPA routing + headers
└── package.json
```

### Data Persistence
All data is stored locally in **IndexedDB** (via the `idb` library). No backend server or database is required. Data persists across app launches and works fully offline.

### Food Database
- **130+ Indian foods** (bundled, offline — includes katori/roti/piece serving units)
- **Open Food Facts** (online search, network-first with 5-second timeout)
- **Custom foods** (user-created, stored locally)

---

## Performance

| Bundle | Gzipped |
|--------|---------|
| App JS | ~28 KB |
| Recharts | ~149 KB |
| CSS | ~5 KB |
| **Total** | **~182 KB** |

Target Lighthouse scores: Performance >85, PWA >90, Accessibility >85, Best Practices >90
