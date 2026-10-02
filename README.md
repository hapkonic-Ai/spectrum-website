# Spectrum Tution Point — Website

A modern, heavily animated single-page website for **Spectrum Tution Point, Vellore** — a coaching centre for **Classes 6–10** across **CBSE, ICSE and Tamil Nadu State Board** curricula.

The site is a front-end concept/demo: every statistic, name, score, review and price is **inflated illustrative data**, and photography is stock. All content lives in one file (`src/lib/data.ts`) so it can be swapped for real data in minutes.

---

## Table of Contents

- [Overview](#overview)
- [Page Sections](#page-sections)
- [Animation & Interaction Inventory](#animation--interaction-inventory)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Editing Content](#editing-content)
- [Getting Started](#getting-started)
- [Customizing](#customizing)
- [Deployment](#deployment)
- [Disclaimer](#disclaimer)

---

## Overview

**Design language:** light editorial theme — cream canvas, massive Anton display type, royal-blue brand accents, white "pill" cards, giant rounded photo cards on dark contrast sections, floating sticker-style UI elements, and a signature teal→blue gradient reserved for accent words.

**Motion philosophy:** everything either reveals on scroll, floats on a loop, or reacts to the pointer. Nothing on the page is static.

| | |
|---|---|
| **Type** | Single-page marketing site (SPA) |
| **Framework** | React 19 + TypeScript (strict) |
| **Bundler** | Vite 8 |
| **Styling** | Tailwind CSS 3.4 + custom design tokens |
| **Animation** | Framer Motion 13 + CSS keyframes |
| **Scrolling** | Lenis inertia smooth-scroll |
| **Icons** | lucide-react |

---

## Page Sections

The page is a vertical stack of 14 sections, wired together in `src/App.tsx`:

| # | Section | Anchor | Highlights |
|---|---------|--------|-----------|
| 1 | **Hero** | `#home` | Massive 4-line headline with per-line masked reveal, illustrated background (gradient pyramid mark, hex lattice, dashed flight path), student cut-out PNG, floating subject pills, pop-in stat card, doodles and sparkles with looping fade in/out, handwritten Caveat note |
| 2 | **Why Spectrum** (dark) | `#why` | Three giant rounded photo cards with floating pill tags and hover zoom, giant outlined subject marquee below |
| 3 | **Stats** | `#stats` | Six animated count-up metrics (35+ years, 12,500+ students, 98.6% …) with gradient hover cross-fade |
| 4 | **Why Parents Choose Us** | `#parents` | Seven white cards with icon tiles and floating pill tags |
| 5 | **Subjects** | `#subjects` | Interactive tab switcher (Maths / Physics / Chemistry / Bio) with sliding `layoutId` pill, per-subject tinted photo panel, staggered topic chips |
| 6 | **Boards** | `#boards` | CBSE / ICSE / State Board cards with accent-colored hovers and a bilingual-medium strip (தமிழ் · English) |
| 7 | **Courses** | `#courses` | Six image-header program cards with tags, feature lists, strike-through pricing and circular arrow CTAs |
| 8 | **Faculty** | `#faculty` | Seamless auto-scrolling mentor marquee (pause on hover) with portrait cards, subject ring colors, hover lift/tilt |
| 9 | **Results** (dark) | `#results` | Dual counter-scrolling topper carousels with portrait cards and amber score badges |
| 10 | **Testimonials** | `#reviews` | Infinite review marquee with alternating tilts that straighten on hover |
| 11 | **Study Materials** | `#resources` | Bento grid of learning resources with gradient icon tiles |
| 12 | **Admissions** (dark) | `#contact` | Live countdown timer (flip digits), three perk rows, sticky enrollment form with animated success state |
| 13 | **FAQ** | `#faq` | Animated one-at-a-time accordion with rotating plus icons |
| 14 | **Footer** (dark) | — | Brand, explore/subject/contact columns, back-to-top |

Global chrome: animated **preloader** (CSS-driven exit — never sticks in background tabs), **custom dual cursor** (dot + spring ring, fine-pointer devices only), **fixed navbar** with gradient scroll-progress bar and slide-in mobile drawer, film-grain noise overlay, and Lenis smooth scrolling with anchor-link interception.

---

## Animation & Interaction Inventory

| Technique | Where |
|-----------|-------|
| Masked line/word reveals (`overflow-hidden` + `y: 110% → 0`) | Hero headline, nav, headings |
| Spring pop-ins (`scale 0.3 → 1`) | Hero pills, stat card, doodles |
| Looping fade in/out (`opacity [0.5, 1, 0.5]`, `repeat: Infinity`) | Lightbulb, paper plane, handwriting, dashed path, pyramid mark, circles |
| Twinkle loops (opacity + scale + rotate) | Hero sparkles |
| CSS float loops (`animate-float` with per-element `--rot` / delay) | All hero floaters, stat card |
| Scroll-linked parallax (`useScroll` + `useTransform`) | Hero content fade, earlier iterations |
| Scroll-triggered reveals (`whileInView` + stagger variants) | Every section |
| Marquees (`animate-marquee`, `-reverse`, `-slow`; pause on hover) | Hero ticker, subject marquee, faculty, toppers, testimonials |
| Sliding pill (`layoutId` shared layout animation) | Subject tabs |
| `AnimatePresence` transitions | Subject panel swaps, FAQ height animations, form → success swap, mobile drawer |
| Count-ups (`animate()` driven by `useInView`) | Stats band |
| Flip digits (`AnimatePresence popLayout`) | Admissions countdown |
| Spotlight hover (`--mx/--my` CSS vars + radial gradient) | Dark-section cards |
| Gradient text cross-fade on hover | Stats numbers |
| Custom cursor + magnetic hover states | Global |
| Smooth inertia scroll (Lenis) | Global, with anchor interception at −76 px offset |

Shared animation primitives live in `src/lib/anim.ts` (`fadeUp`, `fadeIn`, `scaleIn`, `stagger`, `viewport`) and the section header component in `src/components/ui.tsx`.

---

## Tech Stack

| Package | Version | Role |
|---------|---------|------|
| `react` / `react-dom` | ^19.2 | UI runtime |
| `typescript` | ~6.0 | strict type-checking (`tsc -b` in build) |
| `vite` | ^8.3 | dev server + production build |
| `@vitejs/plugin-react` | ^6.1 | React fast-refresh |
| `tailwindcss` | ^3.4 | utility styling (`tailwind.config.js`, PostCSS) |
| `framer-motion` | ^13.5 | all JS-driven animation |
| `lenis` | ^1.3 | inertia smooth scrolling |
| `lucide-react` | ^1.49 | icon set |
| `oxlint` | ^1.81 | linting (`npm run lint`) |

GSAP is installed but currently unused — it's there if you want timeline-based scroll scenes.

---

## Project Structure

```
├── public/
│   ├── spectrum-logo.png      # official brand logo (navbar, footer, preloader, favicon)
│   └── hero-students.png      # transparent student cut-out used in the hero
├── src/
│   ├── main.tsx               # React entry
│   ├── App.tsx                # section stack + Lenis setup + preloader state
│   ├── index.css              # fonts, design tokens, utilities, keyframes
│   ├── lib/
│   │   ├── data.ts            # ★ ALL site content (410 lines of demo data)
│   │   └── anim.ts            # shared Framer Motion variants
│   └── components/
│       ├── ui.tsx             # SectionHeading + Reveal primitives
│       ├── Logo.tsx           # brand logo
│       ├── Preloader.tsx      # loading screen (CSS-driven exit)
│       ├── Cursor.tsx         # custom dual cursor
│       ├── Navbar.tsx         # fixed nav, progress bar, mobile drawer
│       ├── Hero.tsx           # hero + illustrated bg + floaters
│       ├── Pillars.tsx        # why-spectrum dark photo cards
│       ├── Stats.tsx          # count-up metrics
│       ├── Parents.tsx        # parent-reason cards
│       ├── Subjects.tsx       # tabbed subjects
│       ├── Boards.tsx         # board cards
│       ├── Courses.tsx        # program cards
│       ├── Faculty.tsx        # mentor marquee
│       ├── Toppers.tsx        # results carousels
│       ├── Testimonials.tsx   # reviews marquee
│       ├── Resources.tsx      # study-materials bento
│       ├── Admissions.tsx     # countdown + enrollment form
│       ├── Faq.tsx            # accordion
│       ├── Footer.tsx         # footer
│       └── WhySpectrum.tsx    # (legacy alt layout, not mounted)
├── tailwind.config.js         # colors, fonts, shadows, keyframes, marquee/float loops
├── postcss.config.js
└── index.html
```

---

## Design System

Defined in `tailwind.config.js` + `src/index.css`:

**Colors**

| Token | Value | Use |
|-------|-------|-----|
| `cream` | `#f2f1ec` | Page background |
| `paper` | `#ffffff` | Cards, pills |
| `ink` | `#101014` | Primary text / dark sections |
| `coal` | `#17171c` | Dark-section card surfaces |
| `mute` | `#71717a` | Secondary text |
| brand blue | `#1d4ed8` / `#1e3a8a` | CTAs, logo, gradient words |
| gradient | `#35c99b → #2e7cf6` | Accent words, icon tiles (CSS var `--cta`) |

**Fonts** — `Anton` (display, uppercase headlines), `Inter` (UI/body), `Playfair Display` (editorial accents), `Caveat` (handwritten notes). Loaded via Google Fonts in `index.css`.

**Signature utilities** (in `index.css`): `.container-x`, `.pill-tag`, `.btn-cta` (+ `.arrow-disc`), `.btn-ghost-dark`, `.section-dark`, `.eyebrow` / `.eyebrow-dark`, `.text-image` (background-clip text), `.hex-bg` / `.hex-bg-light`, `.spotlight-card`, `.noise`.

---

## Editing Content

**Everything textual/numeric lives in `src/lib/data.ts`** — nav links, ticker, stats, features, subjects, boards, courses, parent reasons, faculty, toppers, testimonials, resources, FAQs, contact info, photography URLs.

```ts
// Example — swap a topper for a real student
{ name: 'Aditi Raman', score: 99.2, board: 'CBSE', year: 2026,
  note: 'School topper, Class 10',
  photo: 'https://randomuser.me/api/portraits/women/33.jpg' }
```

- **Faculty / topper photos** are placeholder portraits from randomuser.me — replace the `photo` URLs with real images (drop files in `public/` and reference `/your-photo.jpg`).
- **Contact details** (phone, WhatsApp, email, address, hours) are in the `contact` export.
- **Countdown target** is hard-coded in `src/components/Admissions.tsx` (`new Date('2026-11-15T09:00:00+05:30')`).
- **Preloader duration** (~1.9 s) is in `src/components/Preloader.tsx`.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Production build (type-check + bundle → dist/)
npm run build

# 4. Preview the production build locally
npm run preview

# 5. Lint
npm run lint
```

Requires Node 18+ (developed on Node 25). No environment variables or backend needed — it's a fully static site.

---

## Customizing

- **Brand color** — search `#1d4ed8` (CTA blue) and `--cta` (gradient) in `src/index.css` / `tailwind.config.js`.
- **Fonts** — change the Google Fonts URL at the top of `src/index.css`, then update `fontFamily` in `tailwind.config.js`.
- **Add/remove a section** — drop the component in `src/components/`, import it in `src/App.tsx`, and (optionally) add its anchor to `navLinks` in `src/lib/data.ts`.
- **Animation feel** — global marquee/float speeds are the `animation` values in `tailwind.config.js`; entrance easings are the shared variants in `src/lib/anim.ts`.

---

## Deployment

Static build — host `dist/` anywhere:

- **Vercel / Netlify** — import the repo, build command `npm run build`, output dir `dist`. No framework preset needed beyond Vite.
- **GitHub Pages** — `npm run build`, then publish `dist/` (e.g. with `gh-pages` or an Actions workflow).
- **Any static server** — `npm run preview` or serve `dist/` with nginx/S3/Cloudflare.

---

## Disclaimer

This is a **concept demo**, not the production site. All statistics (98.6% distinction rate, 12,500+ students, scores, reviews, faculty profiles, prices) are **fabricated for demonstration purposes**. Photography is stock (Unsplash / randomuser.me) or the supplied brand asset. "Tution Point" spelling follows the client-provided logo.
