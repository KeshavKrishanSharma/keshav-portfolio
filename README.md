<div align="center">

# Keshav Krishan Sharma — Portfolio

**Full-Stack Engineer · Systems Architect · Product-minded**

An interactive personal portfolio built around a "three doors" idea: the same
person presented through three lenses — **Engineer**, **Strategist**, and
**Designer** — plus a classic one-page résumé for anyone in a hurry.

Live → **[keshavkrishansharma.com](https://keshavkrishansharma.com)**

`Next.js 14` · `React 18` · `TypeScript` · `Tailwind CSS` · `Framer Motion` · `Lenis`

</div>

---

## What this site is

Most portfolios are a single scrolling page. This one asks **"What brings you
here?"** on the landing screen and lets the visitor choose the version of the
story that matters to them:

| Door | For | What it shows |
|------|-----|---------------|
| 🛠️ **Engineer** | Hiring managers / tech leads | Architecture maps, a live state-machine, the real engines behind 4 national-scale modules, the full tech stack |
| 📊 **Strategist** | Recruiters / leadership | Impact in numbers, who I deliver across, the career arc, recognition |
| 🎨 **Designer** | Design-minded teams | Before/after redesigns, the design process, a live design-token system |

There's also a **`/resume`** route — a fast, classic one-pager for recruiters
who'd rather just read.

Everything is one real person, one codebase, one source of truth for content.

---

## Quick start

```bash
npm install
npm run dev      # → http://localhost:3000
```

That's it. The dev server has hot reload, so edits show up instantly.

> **Note:** `predev` and `prebuild` automatically run
> [`scripts/setup-assets.mjs`](scripts/setup-assets.mjs), which copies the
> résumé and certificate PDFs from the project root into `/public` so the site
> can serve them. You don't need to run anything by hand.

---

## How to update the content

**You almost never need to touch component code to change what the site says.**
All wording lives in two files:

- **[`lib/data.ts`](lib/data.ts)** — your profile, experience, projects, skills,
  certifications, education, and honors. Edit the text here and every page
  updates.
- **[`lib/worlds.ts`](lib/worlds.ts)** — the headline, sub-text, and "proof"
  numbers shown at the top of each of the three worlds.

A few common edits:

| I want to… | Edit |
|------------|------|
| Change my name, tagline, email, location, socials | `profile` in `lib/data.ts` |
| Update a job, add a bullet point | `experience` in `lib/data.ts` |
| Add or edit a project / case study | `projects` in `lib/data.ts` |
| Change the headline on the Engineer page | `worlds[0].hero` in `lib/worlds.ts` |
| Swap my photo | replace `public/images/persona/my_dp.jpeg` (keep the name) |
| Change the résumé PDF | replace `resume.pdf` (and `resume-leadership.pdf`) in the project root |

---

## Pictures

The site is designed to **never look broken** if an image is missing — it falls
back to a tasteful placeholder. Images live in `public/images/`. The main one is
your portrait at `public/images/persona/my_dp.jpeg`.

---

## Build & deploy

```bash
npm run build
npm start        # serve the production build locally on :3000
```

The site is hosted on **[Vercel](https://vercel.com)**. To ship an update:

```bash
git push origin main      # if the project is connected to Vercel, this auto-deploys
# or, to deploy manually:
vercel --prod
```

If you ever move to a new domain, update `profile.siteUrl` in
[`lib/data.ts`](lib/data.ts) so the share previews and sitemap point to the
right place.

---

## Want the full technical picture?

Everything about how the site is built — the architecture, every component, the
animation system, the theming, and the deploy pipeline — is documented in
**[TECHNICAL.md](TECHNICAL.md)**.

---

© Keshav Krishan Sharma. The structure is reusable; the content is mine.
