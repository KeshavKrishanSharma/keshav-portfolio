// lib/worlds.ts — single source of truth for the three persona "worlds".
// The landing page ("What brings you here?") and every world route read from
// here. Each world recolors the site by setting `data-world` on a wrapper
// (tokens live in globals.css under [data-world='...']).

export type WorldId = 'engineer' | 'strategist' | 'designer';

// ── Résumé routing ────────────────────────────────────────────────────────
// Engineer + Designer point at the technical résumé. Strategist points at the
// leadership/"stats" résumé (EM / PM / lead). Drop the second PDF at
// public/resume-leadership.pdf; until then it gracefully falls back to the
// technical résumé via setup-assets. See README → Résumés.
export const TECH_RESUME = '/resume.pdf';
export const LEADERSHIP_RESUME = '/resume-leadership.pdf';

export interface World {
  id: WorldId;
  /** 1 / 2 / 3 — used for keyboard switching and door order. */
  num: 1 | 2 | 3;
  /** Display name: "Engineer". */
  name: string;
  /** Door headline: "The Engineer". */
  doorTitle: string;
  /** Door subtext — the visitor's need, in their words. */
  doorNeed: string;
  /** One-word vibe shown under the door icon. */
  vibe: string;
  /** Emoji used as the door glyph / mascot hint. */
  glyph: string;
  /** Hex accent for door previews, glows and the morph transition. */
  accent: string;
  /** Which résumé this world hands a recruiter. */
  resume: string;
  /** Hero copy for the world route. */
  hero: {
    kicker: string;
    headline: string;
    sub: string;
    /** Primary call-to-action label inside the world. */
    cta: string;
  };
  /** Three quick proof points shown in the world hero. */
  proof: { value: string; label: string }[];
}

export const worlds: World[] = [
  {
    id: 'engineer',
    num: 1,
    name: 'Engineer',
    doorTitle: 'The Engineer',
    doorNeed: 'You need full-stack ownership — schema to UI, production-grade.',
    vibe: 'Full-stack · scale · zero shortcuts',
    glyph: '🛠️',
    accent: '#34d399', // emerald
    resume: TECH_RESUME,
    hero: {
      kicker: '// full-stack engineer & architect · 3.5 years',
      headline: 'I own the full stack — PHP/Yii2, REST APIs, and React UI — for systems running 100+ universities.',
      sub: '3.5 years shipping enterprise software end to end: PHP/Yii2 backends, MySQL, REST APIs, and React 19 TypeScript frontends — multi-tenant, audit-grade, built for the systems that run India\'s national university platform.',
      cta: 'Open the terminal'
    },
    proof: [
      { value: '4', label: 'modules, schema to UI' },
      { value: '11', label: 'state allocation engine' },
      { value: '3.5', label: 'years in production' }
    ]
  },
  {
    id: 'strategist',
    num: 2,
    name: 'Strategist',
    doorTitle: 'The Strategist',
    doorNeed: 'You need someone who delivers — not just codes.',
    vibe: 'Ownership · delivery · team',
    glyph: '📊',
    accent: '#d4af5f', // gold
    resume: LEADERSHIP_RESUME,
    hero: {
      kicker: 'Engineering leadership · 3.5 years',
      headline: '3.5 years. Four platforms. One engineer who owned the brief, the architecture, and the ship.',
      sub: 'I partner directly with the Ministry of Education and 100+ universities — gathering real requirements, designing the systems, and mentoring the engineers who keep them running.',
      cta: 'See the impact'
    },
    proof: [
      { value: '100+', label: 'universities served' },
      { value: '45%', label: 'faster turnaround' },
      { value: '4+', label: 'engineers mentored' }
    ]
  },
  {
    id: 'designer',
    num: 3,
    name: 'Designer',
    doorTitle: 'The Designer',
    doorNeed: 'You want software that users actually enjoy using.',
    vibe: 'Craft · clarity · real care',
    glyph: '🎨',
    accent: '#f47250', // coral
    resume: TECH_RESUME,
    hero: {
      kicker: 'Design engineer',
      headline: "Government software doesn't have to feel like government software.",
      sub: 'I design for real operators — non-technical staff who need forms, flows, and dashboards they can finish without a manual. UX measured by adoption, not screenshots.',
      cta: 'Step into the studio'
    },
    proof: [
      { value: '5+', label: 'UX certifications' },
      { value: '4', label: 'enterprise products designed' },
      { value: '100+', label: 'institutions using the UX' }
    ]
  }
];

export const worldById = (id: string): World | undefined =>
  worlds.find((w) => w.id === id);

export const WORLD_IDS: WorldId[] = worlds.map((w) => w.id);
