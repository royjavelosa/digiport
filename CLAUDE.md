# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server with HMR
npm run build     # production build → dist/
npm run preview   # serve the dist/ build locally
npm run lint      # run ESLint
```

Deploying to Heroku requires a production build first (`npm run build`), then push to the Heroku remote. There are no tests in this project.

## Architecture

This is a single-page personal portfolio built with React 19 + Vite + Tailwind CSS. All application logic lives in two files:

**`src/App.jsx`** — the entire portfolio UI as one `Portfolio` component. It owns all state:
- `activeTab` — controls which section renders (`journey`, `impact`, `ventures`, `education`, `projects`)
- `showModal` — toggles the Projects modal overlay
- `focusedEdu` — tracks hover state on education cards to reveal the radar chart

The tab bar is a sticky nav at the top. Each tab renders a different section inline (no routing). The Projects tab is a special case — it sets both `activeTab` and `showModal`, rendering content inside a fullscreen modal rather than the main content area.

**`src/BackgroundCharts.jsx`** — all animated Recharts visualizations, exported as named components: `HeroChart`, `JourneyChart`, `ImpactChart`, `VenturesChart`, `InlineRadarChart`. Each chart runs its own `setInterval` via `useEffect` to animate data using a random-walk algorithm (`rw` / `initSeries` helpers at the top of the file). `InlineRadarChart` is different — it's static (no animation), used on hover inside the Education cards.

## Preferences

- Do not add `Co-Authored-By` trailers to commit messages. Authorship is already visible from the Claude Code session.
- Only commit when explicitly asked.

## Styling conventions

- Tailwind utility classes throughout; no CSS modules or styled-components
- Dark theme base: `bg-slate-950` / `bg-blue-950` gradients
- Accent palette: `cyan-400`/`cyan-500` (primary), `blue-400` (secondary), `red-400` (MIT), `green-400` (availability badge)
- Responsive breakpoints use standard Tailwind (`md:`, `lg:`) — mobile-first
- Animations use Tailwind's `animate-pulse` and custom `transition-all duration-500` for the radar chart reveal
