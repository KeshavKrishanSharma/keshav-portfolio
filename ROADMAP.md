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
