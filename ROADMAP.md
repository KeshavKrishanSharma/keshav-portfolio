# Portfolio — Build Roadmap & Status

_Last updated: 2026-06-22. Canonical working dir: `C:\Users\Admin\Downloads\new resume site` (NOT the Desktop copy)._

## Run it
```
npm run dev   →   http://localhost:3000
```
- `/` — the "three doors" landing
- `/engineer` · `/strategist` · `/designer` — the persona worlds
- `/resume` — classic one-page résumé (recruiter fast-path)

---

## 🆕 Session update (2026-06-23b)
- **Career timeline corrected**: `lib/data.ts` experience now has 3 real entries — `Software Developer C` (Jan 2025–present), `Junior Software Developer` (Jan 2023–Jan 2025), `Intern` (Jan–Jun 2022). Accurate dates, titles, and bullets (promotion narrative, bulk import in all modules, cross-module integration details).
- **Projects fixed in `lib/data.ts`**: Affiliation rewritten (auto fee engine, job queue, 63 models), Estate corrected (physical-infrastructure asset register, NOT conflict detection), eHousing updated (employee accommodation, cross-module composition).
- **`lib/worlds.ts` enriched**: Engineer kicker → "Software Developer C · full-stack & systems architect", proof includes "3.5+ yrs · promoted Jan 2025". Strategist headline → "Intern. Jr Developer. Software Developer C. A title that still undersells what I own.", vibe updated, PM+GenAI trajectory in sub. Designer kicker lists certifications (Simplilearn · Accenture · Le Wagon · CPD).
- **`PlatformBand.tsx` built** — 4 count-up stat cards (20+ modules · 4 payment gateways · 2M+ records · 100+ universities) + payment gateway chips (Razorpay · SBI Collect · PayGov · GETEPAY). Wired into both Engineer (after AffiliationEngine) and Strategist (after StatRollup).
- **`CareerArc.tsx` built** — Strategist world visual growth narrative: Intern → Jr Dev → Software Developer C (NOW badge, gold highlight) → "What's Next" fork (Product Manager · Solutions Architect · Gen AI Engineer) with real copy per role. Wired into Strategist between StakeholderMap and Timeline.
- **`DesignProcess.tsx` built** — Designer world 4-phase process grid (Discover / Define / Design / Validate) each with a real module example (MPDD 12-click discovery, Estate schema/language split, Affiliation bulk import error redesign, eHousing zero-training-calls metric). Wired into Designer after BeforeAfter.
- `tsc --noEmit` clean. All 3 worlds verified in preview.

**Next:** (1) Fun/doodle layer — scroll mascot per world. (2) Animation pass. (3) Copy punch-up + "Now" card. (4) Deploy to Vercel.

## 🆕 Session update (2026-06-22c)
- Read the REAL Samarth modules (`C:\wamp64\www\samarth\submodule` — **READ-ONLY, never edit**) and rewrote module content from the actual code → `lib/gallery.ts`: Affiliation auto-fee/late-fee engine + committee audit scoring + Excel→S3 export (85% memory guard); **Estate corrected** to physical-infrastructure asset management; eHousing = employee accommodation with cross-module integration (reads Estate `Housing` + Employee `Profile`); MPDD polished.
- **Project UX rebuilt** → `components/world/ProjectShowcase.tsx`: information-first cards (real features + an engineering-highlight pull-quote + authentic stack); module cards open a screen **carousel**, client builds (`live` set) link straight to the site. Replaced the old inline `Showcase` in Engineer + Designer worlds.
- **Strategist AI image dropped** → animated gold **trajectory bar chart** (`StrategistGraphic` in `WorldHero.tsx`); floating chips hidden for Strategist. Engineer keeps `developer-avatar`; Designer keeps `designer-scene` (per Keshav).
- `tsc --noEmit` clean; verified in preview.
- **Affiliation signature engine** built (`components/world/AffiliationEngine.tsx`, wired into Engineer after the allocation machine): an animated automatic fee → bill derivation (`afm_application_bill` · fee-head bases flat/per-course/per-committee · date-windowed late fee · `grand_total` count-up · AUTO badge) + a background-job-queue strip (`yii\queue` → streaming XLSX → S3 · 85% mem-guard · cron progress). Grounded in the real fee/bill/queue models.

**Next:** (1) **Platform-at-a-glance band** (20+ modules · 4 payment gateways — Razorpay/SBI/PayGov/GETEPAY · 2M+ records) — confirmed, not built yet. (2) **Sync the `/resume` content** — `lib/data.ts` `projects` still shows the OLD, factually WRONG Estate ("conflict detection"); rewrite the 4 enterprise projects to match `lib/gallery.ts`. Then: fun/doodle, animation pass, copy punch-up, ship (below).

## ✅ Done
- Three-door landing, circle-reveal morph between worlds, always-on persona pill (keys `1/2/3`, `0`/`H` = home), `Ctrl/Cmd+K` command palette.
- **Engineer**: interactive Terminal, ArchitectureMap, 11-state AllocationMachine, case-study Showcase.
- **Strategist**: StatRollup, StakeholderMap, Timeline.
- **Designer**: BeforeAfter slider, tilted Showcase, DesignSystemShowcase.
- Résumés wired — `/resume` + Engineer/Designer → full-stack PDF; Strategist → management PDF.
- Hackathon project **Multi-Modal Evidence Review** featured in projects (links to GitHub) with a custom SVG pipeline diagram.
- **Gallery fixed** — every screenshot cropped clean of browser chrome + Windows taskbar; viewer rebuilt to featured image + thumbnail strip + counter + click-to-zoom lightbox.
- Design skills installed: `ui-ux-pro-max`, `ui-styling`, `design-system` — use them while building.

---

## 🔜 Remaining — priority order

### 1. Wire the persona photos  ← files now in `public/images/persona/`
| File | What it is | Use |
|---|---|---|
| `developer-avatar.jpg` | Pixar-3D dev avatar, **clean (no garbled text)** | Primary friendly portrait — Engineer hero + About + landing |
| `engineer-work.jpg` | Realistic "coding in office" photo | Engineer atmospheric band |
| `strategist-scene.jpg` | AI boardroom scene — **has garbled AI text** | Strategist hero, as a **darkened low-opacity backdrop** (gradient overlay so the fake text isn't readable) |
| `designer-scene.jpg` | AI studio scene — **has garbled AI text** | Designer hero backdrop, same treatment |

**Missing** (ask Keshav to drop into `public/images/persona/` if wanted): a clean realistic headshot, the profile shot, and the real plaid candid — the ones pasted earlier were never saved as files.

### 2. Fun / doodle layer
Scroll-following mascot per world (changes per persona), hand-drawn annotations, playful micro-copy, an easter egg (e.g. a doodle canvas in the Designer world).

### 3. Animation pass
Number **count-ups** (StatRollup / proof stats), scroll-linked staggered reveals, parallax on hero media, magnetic buttons, animated SVG draw-ins. All `prefers-reduced-motion` safe.

### 4. Copy punch-up
Remove remaining blandness; add a playful **"Now"** card (currently building / learning / fun fact); stronger voice throughout.

### 5. Polish & ship (Phase 4)
Per-world OG share images, print stylesheet for `/resume`, privacy-friendly analytics, deploy to Vercel (then set `profile.siteUrl`).

---

## ⏳ Pending — Keshav (manual; the agent is blocked on these)
- Install 21st.dev Magic MCP: `claude mcp add magic --scope user --env API_KEY=… -- npx -y @21st-dev/magic@latest`
- Delete the stale `C:\Users\Admin\Desktop\new resume site` copy.
- **Rotate** the 21st.dev API key (it was pasted in chat).

## Notes for whoever builds next
- Screenshots are re-derivable from `C:\Users\Admin\Pictures\Screenshots`; crop with Pillow (Python 3.14 + Pillow 12.2 installed).
- `/resume` has a WebGL 3D hero that hangs the headless screenshot tool — verify the **worlds** via screenshot, `/resume` via DOM/fetch.
- Open question: "the section at pic not good at all" — never clarified which section; ask.
