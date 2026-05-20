# cla.city — Church LA Website

A static, bilingual (English / Russian) church website built with pure HTML5, CSS3, and vanilla JavaScript. No frameworks, no build tools, no dependencies — just open the browser and it works.

---

## Project Structure

```
cla.city/
├── index.html              # Language gateway — auto-redirects to /en/ or /ru/
├── 404.html                # Custom error page
├── README.md
│
├── en/                     # English pages
│   ├── index.html          # Home
│   ├── about.html          # About — story, pastors, beliefs, stats
│   ├── visit.html          # Visit — schedule, what to expect, FAQ
│   ├── ministries.html     # Ministries — 6 ministry cards + detail sections
│   ├── resources.html      # Resources — Jesus School, Bible plan, downloads
│   ├── media.html          # Media — sermons, gallery, live stream
│   └── give.html           # Give — online giving widget, funds, FAQ
│
├── ru/                     # Russian pages (mirror of /en/)
│   ├── index.html
│   ├── about.html
│   ├── visit.html
│   ├── ministries.html
│   ├── resources.html
│   ├── media.html
│   └── give.html
│
├── assets/
│   ├── css/
│   │   ├── styles.css      # Entry point — @imports all modules
│   │   ├── variables.css   # Design tokens / CSS custom properties
│   │   ├── reset.css       # Browser reset
│   │   ├── typography.css  # Google Fonts + type scale
│   │   ├── layout.css      # Grid & structural patterns
│   │   ├── components.css  # All component styles
│   │   ├── animations.css  # Keyframes + scroll reveal
│   │   ├── utilities.css   # Single-purpose helpers
│   │   └── responsive.css  # Media queries (1024 / 768 / 480px)
│   │
│   ├── js/
│   │   ├── script.js           # ES module entry point
│   │   ├── navigation.js       # Header scroll + mobile menu
│   │   ├── language-switcher.js # Lang detection & switcher
│   │   ├── animations.js       # IntersectionObserver + FAQ accordion
│   │   └── media-player.js     # YouTube embed + lightbox + give amounts
│   │
│   ├── images/
│   │   ├── hero/           # Full-bleed hero images
│   │   ├── ministries/     # Ministry card backgrounds
│   │   ├── pastors/        # Pastor portrait photos
│   │   ├── gallery/        # Photo gallery images
│   │   ├── events/         # Event imagery
│   │   ├── icons/          # UI icons / favicons
│   │   └── logos/          # Church logo variants
│   │
│   ├── videos/             # Self-hosted video files (optional)
│   └── fonts/              # Self-hosted font files (optional)
│
└── data/
    ├── ministries.json     # Ministry data in EN + RU
    ├── events.json         # Service schedule / recurring events
    └── testimonials.json   # Testimonial quotes in EN + RU
```

---

## Language System

### Auto-redirect
The root `index.html` detects the browser language and redirects:
- `navigator.language.startsWith('ru')` → `/ru/`
- All others → `/en/`

A 1500ms timeout and `<noscript>` fallback ensure accessibility without JavaScript.

### Language Switcher
Every page has an `EN | RU` pill in the header. Clicking switches to the exact equivalent page in the other language (e.g. `en/about.html` ↔ `ru/about.html`).

The `initLanguageSwitcher()` function in `assets/js/language-switcher.js` marks the active language button based on the current URL pathname.

### Path Convention
- Pages in `/en/` and `/ru/` reference assets with `../assets/...`
- Cross-language links use `../en/page.html` or `../ru/page.html`

---

## JavaScript Architecture

All JS uses ES Modules (`type="module"`). The entry point `script.js` calls four initializers on `DOMContentLoaded`:

| Module | Responsibility |
|---|---|
| `navigation.js` | Header scroll shadow, mobile hamburger toggle, active nav link |
| `language-switcher.js` | Language detection, active lang button, URL swapping |
| `animations.js` | IntersectionObserver scroll reveals, FAQ accordion |
| `media-player.js` | YouTube embed swap, gallery lightbox, give amount selector |

---

## CSS Architecture

`styles.css` is a pure `@import` aggregator — it contains no styles of its own.

| File | Responsibility |
|---|---|
| `variables.css` | All CSS custom properties (colors, fonts, spacing, radius, shadows) |
| `reset.css` | Browser normalization |
| `typography.css` | Google Fonts import, heading scale, eyebrow, lead |
| `layout.css` | Container, section, all grid patterns |
| `components.css` | Every component: header, hero, cards, footer, etc. |
| `animations.css` | `@keyframes` + `.fade-in` scroll reveal + stagger delays |
| `utilities.css` | Alignment, color, spacing, display helpers |
| `responsive.css` | Media queries at 1024px, 768px, 480px |

---

## Design Tokens

Primary palette defined in `variables.css`:

| Token | Value | Usage |
|---|---|---|
| `--c-primary` | `#C28A5D` | Warm amber — CTAs, accents |
| `--c-dark` | `#1A1C20` | Deep charcoal — hero backgrounds, dark sections |
| `--c-bg` | `#FAF9F6` | Warm cream — page background |
| `--c-bg-alt` | `#F3F1EE` | Slightly darker cream — alternating sections |
| `--c-white` | `#FFFFFF` | |
| `--c-text` | `#2D2F35` | Body text |
| `--c-muted` | `#6B7280` | Secondary text |

Typography: **Playfair Display** (headings) + **Inter** (body) via Google Fonts.

---

## Deployment

This is a zero-build static site. Deploy anywhere that serves HTML:

### Netlify / Vercel (recommended)
1. Connect the repository
2. Set publish directory to `/` (root)
3. No build command needed

### GitHub Pages
```bash
# From the repo root
git add .
git commit -m "deploy"
git push origin main
# Enable Pages in repo Settings → Pages → main branch / root
```

### Local development
```bash
# Any static server works — e.g. with Node.js installed:
npx serve .

# Or with Python:
python3 -m http.server 8080
```

Then open `http://localhost:8080` — the root `index.html` will redirect you based on your browser language.

> **Note:** ES Modules require a server — opening `index.html` directly via `file://` will block JavaScript due to CORS restrictions. Always use a local server.

---

## Adding Images

Drop images into the appropriate subdirectory and update the `src` attributes in the HTML:

- Hero backgrounds → `assets/images/hero/`
- Ministry card backgrounds → `assets/images/ministries/`
- Pastor portraits → `assets/images/pastors/`
- Gallery photos → `assets/images/gallery/`

Recommended sizes:
- Hero images: 1920×1080px minimum, WebP preferred
- Ministry cards: 800×600px
- Pastor photos: 400×400px (square)
- Gallery: 800×600px (wide variants 1200×600px)

---

## Content Updates

All user-facing content lives directly in the HTML files. To update:
- **Text**: Edit the relevant `.html` file in `/en/` or `/ru/`
- **Service times**: Update all `service-block` elements in `visit.html` for both languages
- **Staff**: Update pastor cards in `about.html` for both languages
- **Sermons**: Add new `video-card` elements in `media.html`, set `data-video-id` to the YouTube video ID

The JSON files in `/data/` are available for future dynamic rendering but are not currently consumed by the JS layer.

---

## Browser Support

Targets all modern browsers (Chrome, Firefox, Safari, Edge). Uses:
- CSS custom properties
- CSS Grid + Flexbox
- IntersectionObserver API
- ES Modules

No IE support. No polyfills.

---

&copy; 2026 Church LA · cla.city
