# Technical Reference

Complete technical documentation for the Keshav Krishan Sharma portfolio.
This is the single source of truth for **how the site is built** — architecture,
every component, the content model, the animation system, theming, and the
build/deploy pipeline. For day-to-day "how do I change the text" guidance, see
[README.md](README.md).

---

## 1. Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js 14** (App Router) | RSC + client components; static where possible |
| UI | **React 18** + **TypeScript** | strict types; `npx tsc --noEmit` must stay clean |
| Styling | **Tailwind CSS** | utility-first; theme via CSS custom properties |
| Animation | **Framer Motion** | reveals, scroll-linked motion, route transitions |
| Smooth scroll | **Lenis** | momentum scrolling; powers parallax/scrub feel |
| 3D | **React Three Fiber / drei** | only the `/resume` hero (`Hero3D.tsx`) |
| Icons | **lucide-react** | |
| Analytics | **@vercel/analytics** | privacy-friendly, mounted in root layout |
| Fonts | `next/font/google` | Inter (sans), Space Grotesk (display), JetBrains Mono (mono) |
| Hosting | **Vercel** | domain `keshavkrishansharma.com` |

---

## 2. Routes & page composition

```
app/
  layout.tsx              Root: fonts, SEO metadata, JSON-LD, theme bootstrap,
                          <SmoothScroll/>, ThemeProvider, TransitionProvider
  template.tsx            Per-navigation wrapper (enables transition remounts)
  providers.tsx           ThemeProvider (light / dark / creative)
  page.tsx                "/"          → <DoorsLanding/>  (the three-door landing)
  engineer/page.tsx       "/engineer"  → Engineer world
  strategist/page.tsx     "/strategist"→ Strategist world
  designer/page.tsx       "/designer"  → Designer world
  resume/page.tsx         "/resume"    → classic one-page résumé (+ WebGL hero)
  sitemap.ts              /sitemap.xml (generated)
  robots.ts               /robots.txt  (generated)
  opengraph-image.tsx     OG share image for "/"  (edge runtime)
  {world}/opengraph-image.tsx  per-world OG images (edge runtime)
```

Each world page is a thin composition that drops section components into a
`<WorldShell>`. Example (`app/engineer/page.tsx`):

```tsx
<WorldShell worldId="engineer">
  <WorldHero worldId="engineer" />
  <ArchitectureMap />
  <AllocationMachine />     {/* scroll-scrubbed, sticky-pinned */}
  <TechStack />
  <AffiliationEngine />
  <PlatformBand />
  <ProjectShowcase … galleries={enterpriseGalleries} />
  <ContactStrip />
</WorldShell>
```

**Section order per world:**

- **Engineer**: Hero → ArchitectureMap → AllocationMachine → TechStack → AffiliationEngine → PlatformBand → ProjectShowcase → ContactStrip
- **Strategist**: Hero → StatRollup → About → StakeholderMap → CareerArc → Honors → ContactStrip
- **Designer**: Hero → BeforeAfter → DesignProcess → ProjectShowcase → DesignSystemShowcase → ContactStrip

---

## 3. Content model (single source of truth)

All content is data-driven. **Never hard-code copy in components** — add it to
these files instead.

### `lib/data.ts`
The master content file. Exports:

| Export | Shape | Used by |
|--------|-------|---------|
| `profile` | name, shortName, initials, portrait, **currentlyBuilding**, location, email, phone, **resumeUrl / resumeLeadershipUrl**, siteUrl, socials, about[] | everywhere |
| `stats` | array of `{value, label}` | StatRollup |
| `experience` | array of `{company, role, period, bullets[]}` | Experience, CareerArc |
| `projects` | `Project[]` (see type) | Projects, ProjectShowcase |
| `architecture` | `{principles[], workflow{states[]}}` | Architecture, AllocationMachine |
| `skills` | `{jobStack, personalStack}` each with `groups[]` | TechStack, Skills |
| `certifications` | array of `{title, issuer, file?, accent}` | Certifications |
| `education` | `{degree, school, period, result}` | Education |
| `honors` | `string[]` | Honors |

The `Project` type supports `featured`, `problem`, `architecture[]`,
`decisions[]`, `impact[]`, `tags[]`, `image`, `accent`, `href`. `featured: true`
projects render as full case studies.

### `lib/worlds.ts`
Defines the three persona "worlds". Each `World` has:
`id`, `num` (1/2/3 for keyboard nav), `name`, `doorTitle`, `doorNeed`, `vibe`,
`accent` (hex — drives glows and the route-morph color), `resume` (which PDF
this world hands a recruiter), `hero{kicker, headline, sub, cta}`, and `proof[]`
(three quick stat chips).

`TECH_RESUME` → `/resume.pdf`; `LEADERSHIP_RESUME` → `/resume-leadership.pdf`.
Engineer + Designer hand out the technical résumé; Strategist hands out the
leadership one.

### `lib/gallery.ts`
`enterpriseGalleries` and `clientGalleries` — screenshot carousels for
`ProjectShowcase`. Enterprise cards open an in-page lightbox; client builds
(`live` set) link straight to the deployed site.

---

## 4. The world shell & navigation chrome

`components/world/WorldShell.tsx` is the frame shared by all three worlds. It:

- sets `data-world={worldId}` so scoped CSS tokens recolor the subtree,
- paints the full-bleed background (`<Aurora/>`),
- renders the fixed top bar (monogram → back to doors, ⌘K button, résumé button),
- renders the always-on chrome listed below,
- wraps page sections in `<main>`.

**Global chrome mounted in WorldShell:**

| Component | Role |
|-----------|------|
| `PersonaPill` | bottom-center world switcher (keys `1/2/3`, `0`/`H` → home) |
| `PhotoMascot` | scroll-following circular portrait (replaced the old doodle) |
| `Cursor` | custom cursor dot/ring (desktop) |
| `ScrollProgress` | 3px accent gradient bar at the top, tracks page scroll |
| `SocialSidebar` | fixed left-edge social links + résumé download (desktop) |
| `SectionNav` | fixed right-edge dot navigation (desktop) |
| `SectionDim` | dims sections as they scroll past the top of the viewport |

**Route transitions** — `components/world/TransitionProvider.tsx` (mounted in the
root layout) provides `useWorldTransition().navigate(href, accentHex, origin)`.
It animates a colored circle expanding from the click origin, swaps the route
mid-cover, then reveals. It also hosts the `CommandPalette` (⌘K) and the
`KonamiEgg`. Reduced-motion users get an instant `router.push`.

---

## 5. Animation system

The animation layer was built to be **consistent and reusable** rather than
hand-rolled per section. Everything respects `prefers-reduced-motion`.

### 5.1 Smooth scroll — `components/SmoothScroll.tsx`
Initializes **Lenis** site-wide (mounted once in `app/layout.tsx`). Runs the
Lenis RAF loop and exposes the instance on `window.__lenis` so `SectionNav` can
scroll-to programmatically. Disabled entirely under reduced motion.

`app/globals.css` hands scroll control to Lenis when active:
```css
.lenis.lenis-smooth { scroll-behavior: auto !important; }
html.lenis, html.lenis body { height: auto; }
```
Native `scroll-behavior: smooth` remains as the no-JS / reduced-motion fallback.

### 5.2 Reveal primitives — `components/Reveal.tsx`
The shared vocabulary. All are reduced-motion aware (render static when reduced).

| Export | What it does |
|--------|--------------|
| `<Reveal>` | fades + slides a single element in on scroll-in (`y`, `x`, `scale`, `delay` props) |
| `<Stagger>` / `<StaggerItem>` | parent orchestrates children to reveal in sequence; items also scale-in (`STAGGER_ITEM` variant) |
| `<SectionHeading>` | eyebrow → title → blurb, staggered. **Used by nearly every section header** so headers animate consistently |
| `<Parallax>` | drifts children against scroll for subtle depth (`distance` prop) |

`SectionHeading` accepts `eyebrowClassName` so mono-styled engineer eyebrows
(`font-mono-tight text-sm text-accent`) and the default `section-eyebrow` both
work.

### 5.3 Signature scroll-linked moments
- **AllocationMachine** (`components/world/AllocationMachine.tsx`) — the hero
  interaction. The section is ~`states.length × 42vh` tall with a
  `sticky top-0` inner panel. `useScroll` on the section maps progress →
  active state index via `useMotionValueEvent`, so you **scroll to step** the
  11-state allocation lifecycle. The audit log writes a line per state. Marked
  `data-no-dim` so `SectionDim` skips it (it's pinned, not leaving). Reduced
  motion → no pin, jumps to the final resolved state.
- **ArchitectureMap connectors** — the four module connector lines animate their
  `x2/y2` outward from the core into each node on scroll-in (staggered), while
  the marching-ants `strokeDashoffset` loop continues (per-property transitions).
- **Parallax** — applied to the ArchitectureMap and StakeholderMap diagram cards.
- **WordReveal** (in `WorldHero.tsx`) — the hero headline reveals word-by-word.
  Uses `whitespace-pre` + trailing spaces so `textContent` keeps spaces (matters
  for the auto-generated `SectionNav` labels).
- **Count-ups** — `StatRollup`, `PlatformBand`, `AffiliationEngine` animate
  numbers when they enter view.

### 5.4 Navigation & cinematic helpers
- `SectionNav` — auto-discovers `<section>` elements inside `<main>`, assigns
  ids (`sec-N`), derives labels from each section's first `h1/h2`, tracks the
  active section with an `IntersectionObserver` (`-45% 0px -45% 0px` root
  margin), and scrolls via Lenis (`window.__lenis.scrollTo`). Desktop only;
  hides if fewer than two sections.
- `SectionDim` — a single rAF-throttled scroll handler sets `opacity` on each
  section as its top passes above the viewport (floors at 0.4). Skips
  `[data-no-dim]`. Cleans up on unmount.

---

## 6. Theming

Two orthogonal theming systems, both driven by CSS custom properties in
`app/globals.css`:

1. **Color mode** — `[data-theme="light" | "dark" | "creative"]`. Managed by
   `app/providers.tsx`, persisted in `localStorage`, and applied by an inline
   `<head>` script **before first paint** to prevent a flash.
2. **Persona world** — `[data-world="engineer" | "strategist" | "designer"]`.
   Each world overrides `--accent`, `--accent-2`, `--accent-3`, etc., so every
   `glass`/`chip`/`btn` utility and any `rgb(var(--accent))` recolors for that
   subtree. Set by `WorldShell`.

Components reference tokens as `rgb(var(--accent) / <alpha>)`, never hard-coded
hex (except `world.accent`, which is intentionally a literal used in inline glow
gradients and the route-morph).

---

## 7. Assets & the setup script

`scripts/setup-assets.mjs` runs on `predev` and `prebuild`. It copies the résumé
and certificate PDFs from the project root into `public/` so Next.js can serve
them. Government ID PDFs are **deliberately excluded** — never publish those.

- Portrait: `public/images/persona/my_dp.jpeg` (the real photo; used in the
  landing hero, Engineer/Strategist hero portraits, the StakeholderMap center,
  and the `PhotoMascot`).
- Résumés: `resume.pdf` (technical) and `resume-leadership.pdf` (leadership) in
  the project root → copied to `/public`.
- Images degrade to placeholders if missing, so the site never looks broken.

> `<img>` is used intentionally in several places (portraits, mascot, doors).
> Next's `@next/next/no-img-element` lint **warnings are expected** and do not
> fail the build.

---

## 8. Build, verify & deploy

```bash
npm run dev      # local dev with HMR (runs setup-assets first)
npm run build    # production build (runs setup-assets first)
npm start        # serve the production build on :3000
npx tsc --noEmit # type-check — must be clean before shipping
```

**Verification checklist before a deploy:**
1. `npx tsc --noEmit` → 0 errors.
2. `npm run build` → succeeds (only `<img>` lint warnings expected).
3. If the dev server is running, it locks `.next`; stop it (or `rm -rf .next`)
   before building to avoid a spurious `PageNotFoundError`.
4. Spot-check in the browser: Lenis active (`html.lenis`), `SectionNav` dots
   track the active section, the AllocationMachine steps as you scroll, no
   console errors.

**Deploy (Vercel):**
```bash
git push origin main     # auto-deploys if the repo is connected
vercel --prod            # or deploy manually (run from Git Bash)
```

---

## 9. Repo conventions & gotchas

- **Content lives in `lib/`** (`data.ts`, `worlds.ts`, `gallery.ts`). Change
  copy there, not in components.
- **Commit hook**: a global `commit-msg` hook validates messages against an
  internal Samarth validator. For this personal repo, bypass it with:
  ```bash
  git -c core.hooksPath=/dev/null commit -m "…"
  ```
- **Vercel CLI** is available in **Git Bash** (not always on the PowerShell
  PATH). Run `vercel --prod` from a bash shell.
- **The Samarth submodule at `C:\wamp64\www\samarth\submodule` is READ-ONLY.**
  It may be read for reference but must never be edited, written, or deleted.
- **Edge runtime** is used by the `opengraph-image` routes (disables static
  generation for those — expected build note).

---

## 10. Component reference

### Global (`components/`)
| File | Role |
|------|------|
| `SmoothScroll.tsx` | Lenis init (layout) |
| `Reveal.tsx` | Reveal / Stagger / StaggerItem / SectionHeading / Parallax |
| `ScrollProgress.tsx` | top scroll-progress bar |
| `SocialSidebar.tsx` | fixed left social + résumé (desktop) |
| `SectionNav.tsx` | right-edge dot nav (desktop) |
| `SectionDim.tsx` | dim-on-exit |
| `Cursor.tsx` | custom cursor |
| `Aurora.tsx` | animated background |
| `Hero3D.tsx` | WebGL hero (resume page only) |

### World chrome (`components/world/`)
| File | Role |
|------|------|
| `WorldShell.tsx` | shared frame + all global chrome |
| `WorldHero.tsx` | per-world hero (word reveal, parallax portrait, proof counters, per-world flourish) |
| `DoorsLanding.tsx` | the "/" landing (sticky photo hero + doors curtain + résumé card) |
| `TransitionProvider.tsx` | circle-morph route transitions + CommandPalette + KonamiEgg |
| `PersonaPill.tsx` | bottom world switcher |
| `PhotoMascot.tsx` | scroll-following portrait |
| `CommandPalette.tsx` | ⌘K palette |
| `KonamiEgg.tsx` | easter egg |
| `icons.tsx` | per-world icon map |

### Engineer sections
`ArchitectureMap` (interactive system diagram, connector draw-in) ·
`AllocationMachine` (scroll-scrubbed 11-state machine) · `TechStack` (skill
groups + learning frontier) · `AffiliationEngine` (auto fee→bill engine +
export queue) · `PlatformBand` (platform-scale count-ups) · `Terminal`
(hero flourish) · `ProjectShowcase` (case-study cards + lightbox).

### Strategist sections
`StatRollup` (impact numbers) · `About` · `StakeholderMap` (network graph with
parallax) · `CareerArc` (Intern → Software Developer C → what's next) · `Honors`.

### Designer sections
`BeforeAfter` (draggable redesign comparison) · `DesignProcess` (4-phase grid) ·
`DesignSystemShowcase` (live design tokens) · `ProjectShowcase`.

### Shared
`ContactStrip` (closing contact section, all worlds) ·
`HeroBackdrop` (atmospheric backdrop).

### Résumé page (`components/`)
`Hero`, `About`, `Experience`, `Projects`, `Architecture`, `Skills`,
`Certifications`, `Education`, `Contact`, `Stats`, `Navbar`, `ThemeToggle`,
`Footer` — the classic one-page `/resume` composition.

### Legacy / unused (safe to remove)
`components/world/DoodleMascot.tsx` (replaced by `PhotoMascot`),
`components/world/Timeline.tsx` (replaced by `CareerArc`),
`components/world/Showcase.tsx` (replaced by `ProjectShowcase`).
Kept in the tree but not imported by any current page.
