<div align="center">

# Keshav Krishan Sharma — Portfolio

**Solutions Architect · Technical Lead · Full-Stack Engineer**

A premium, performance-tuned personal portfolio that presents four national-scale
enterprise modules as real engineering case studies — playful on the surface,
architect-serious underneath.

`Next.js 14` · `React 18` · `TypeScript` · `TailwindCSS` · `Framer Motion` · `React Three Fiber`

</div>

---

## ✨ Highlights

- **Case-study driven** — MPDD, Affiliation, Estate, and Residence Allocation are each
  presented as *Problem → Architecture → Key Decisions → Impact*, not just a screenshot grid.
- **Signature interaction** — an animated allocation **state-machine** that steps through the
  workflow lifecycle on scroll (a live demo of the kind of systems I build).
- **Three themes** — Light · Dark · Creative (aurora glassmorphism), with no flash on load.
- **Playful, performant** — tilt cards, orbital 3D project mode, magnetic motion, custom cursor —
  all degrading gracefully and respecting `prefers-reduced-motion`.
- **SEO-ready** — Open Graph + Twitter cards, JSON-LD `Person` schema, generated
  `sitemap.xml` and `robots.txt`.
- **Single source of truth** — every word of content lives in [`lib/data.ts`](lib/data.ts).

---

## ⚡ Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

> `predev` / `prebuild` run [`scripts/setup-assets.mjs`](scripts/setup-assets.mjs), which copies
> your résumé PDF and certificate PDFs from the project root into `/public` so Next.js can serve
> them. The Aadhaar PDF is **deliberately excluded** — never publish a government ID.

---

## 📁 Project structure

```
app/
  layout.tsx        Root layout · fonts · SEO metadata · JSON-LD · theme bootstrap
  page.tsx          Composes every section in order
  providers.tsx     ThemeProvider (Light / Dark / Creative)
  globals.css       Theme tokens + design-system utilities
  sitemap.ts        Generated /sitemap.xml
  robots.ts         Generated /robots.txt
components/
  Hero · About · Experience · Projects · Architecture · Skills
  Certifications · Education · Contact · Footer · Navbar · ThemeToggle
  Aurora · Cursor · HeroDoodle
lib/
  data.ts           🔑 Single source of truth — edit content here
scripts/
  setup-assets.mjs  Copies PDFs into /public on dev/build
public/
  images/           Portrait, OG image, and case-study screenshots
  certificates/     Auto-populated by setup-assets
```

---

## ✏️ Editing content

**All copy lives in [`lib/data.ts`](lib/data.ts).** Update `profile`, `experience`, `projects`,
`architecture`, `skills`, `certifications`, `education`, and `honors` there — every section reads
from it. Project cards marked `featured: true` render as full case studies; add a `problem`,
`architecture[]`, and `decisions[]` to any project to enrich its modal.

---

## 🖼️ Images

The site references a few images that you add to `public/images/`. **All are optional** — missing
files degrade to tasteful placeholders, so nothing ever looks broken.

| File | Used for | Recommended |
|------|----------|-------------|
| `public/images/portrait.jpg` | About-section headshot | Square, ~600×600, light background |
| `public/og.png` | Social share preview (LinkedIn/WhatsApp/X) | Exactly 1200×630 |
| `public/images/mpdd-dashboard.png` | MPDD case study | ≥1440px wide, light theme |
| `public/images/affiliation-dashboard.png` | Affiliation case study | ≥1440px wide |
| `public/images/estate-dashboard.png` | Estate case study | ≥1440px wide |
| `public/images/ehousing-dashboard.png` | Residence Allocation case study | ≥1440px wide |

> Instagram images **cannot be hot-linked** (blocked + against ToS) — download them and place the
> files here instead. Use sanitized/demo screenshots only for client systems.

---

## 🎨 Theme system

Three themes are driven by CSS custom properties in [`app/globals.css`](app/globals.css):
`[data-theme="light"]`, `[data-theme="dark"]`, `[data-theme="creative"]`. The preference persists
in `localStorage`, and an inline `<head>` script applies it before first paint to prevent flashing.

---

## 🚀 Build & deploy

```bash
npm run build
npm start         # production server on :3000
```

**Recommended host: [Vercel](https://vercel.com)** (free Hobby tier, zero-config for Next.js):

```bash
npx vercel
```

After the first deploy, set the real URL in `profile.siteUrl` ([`lib/data.ts`](lib/data.ts)) so
canonical tags, the sitemap, and OG metadata point to the right place. Also works on Netlify,
Cloudflare Pages, AWS Amplify, or Render.

---

## 📜 License

Personal portfolio code — © Keshav Krishan Sharma. Reuse the structure, not the content.
