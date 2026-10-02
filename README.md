# spectrum-website

A modern, heavily animated demo site for **Spectrum Tution Point, Vellore** — board-specific coaching for Classes 6–10 (CBSE, ICSE & State Board).

Built as a single-page experience with a light editorial design language: massive display typography, floating pill cards, marquee carousels, scroll-driven reveals and a fully animated hero.

## Stack

- **Vite + React 18 + TypeScript** (strict)
- **Tailwind CSS 3.4** — custom design tokens & keyframes
- **Framer Motion** — entrances, marquees, loops, AnimatePresence transitions
- **Lenis** — inertia smooth scrolling
- **lucide-react** — icons

## Run it

```bash
npm install
npm run dev        # hot-reload dev server
npm run build      # type-check + production bundle
npm run preview    # serve the production build
```

## Notes

- All content (names, scores, reviews, stats) is **inflated demo data** — edit `src/lib/data.ts` to swap in real content.
- Brand assets live in `public/` (`spectrum-logo.png`, `hero-students.png`).
