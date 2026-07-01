// lib/worlds.ts — single source of truth for the three persona "worlds".
// The landing page ("What brings you here?") and every world route read from
// here. Each world recolors the site by setting `data-world` on a wrapper
// (tokens live in globals.css under [data-world='...']).

export type WorldId = 'engineer' | 'strategist' | 'designer' | 'lab';

// ── Résumé routing ────────────────────────────────────────────────────────
// Engineer + Designer point at the technical résumé. Strategist points at the
// leadership/"stats" résumé (EM / PM / lead). Drop the second PDF at
// public/resume-leadership.pdf; until then it gracefully falls back to the
// technical résumé via setup-assets. See README → Résumés.
export const TECH_RESUME = '/resume.pdf';
export const LEADERSHIP_RESUME = '/resume-leadership.pdf';

export interface World {
  id: WorldId;
  /** 1 / 2 / 3 / 4 — used for keyboard switching and door order. */
  num: 1 | 2 | 3 | 4;
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
      kicker: '// Software Developer C · full-stack & systems architect',
      headline: 'I own the full stack — schema to React UI — for systems running 100+ universities.',
      sub: 'Promoted to Software Developer C, Jan 2025. Sole architect on 4 enterprise modules of Samarth, the Ministry of Education\'s national platform: PHP/Yii2, MySQL, REST APIs, React 19 TypeScript — multi-tenant, audit-grade, built for national scale.',
      cta: 'Open the terminal'
    },
    proof: [
      { value: '4', label: 'modules, schema to UI' },
      { value: '11', label: 'state allocation engine' },
      { value: '3.5+', label: 'yrs · promoted Jan 2025' }
    ]
  },
  {
    id: 'strategist',
    num: 2,
    name: 'Strategist',
    doorTitle: 'The Strategist',
    doorNeed: 'You need someone who delivers — not just codes.',
    vibe: 'Ownership · delivery · trajectory',
    glyph: '📊',
    accent: '#d4af5f', // gold
    resume: LEADERSHIP_RESUME,
    hero: {
      kicker: 'Software Developer C · architect in the making · aspiring PM',
      headline: 'Intern. Jr Developer. Software Developer C. A title that still undersells what I own.',
      sub: 'Jan 2023 to now — sole full-stack architect on 4 of 20+ modules on a national government platform, translating Ministry of Education mandates directly into production systems. Growing toward Product Management and Gen AI engineering.',
      cta: 'See the trajectory'
    },
    proof: [
      { value: '2', label: 'promotions in 3.5 yrs' },
      { value: '100+', label: 'universities served' },
      { value: '4', label: 'modules owned end to end' }
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
      kicker: 'Design engineer · operator-first UX · 5+ certifications',
      headline: "Government software doesn't have to feel like government software.",
      sub: 'I design for real operators — non-technical staff navigating these systems every day. UX grounded in direct requirement discovery, not assumptions. Certified in product design, UX, and design thinking (Simplilearn, Accenture, Le Wagon, CPD).',
      cta: 'Step into the studio'
    },
    proof: [
      { value: '5+', label: 'UX certifications' },
      { value: '4', label: 'enterprise products designed' },
      { value: '3', label: 'client projects shipped' }
    ]
  },
  {
    id: 'lab',
    num: 4,
    name: 'Lab',
    doorTitle: 'Gen AI / Agentic Lab',
    doorNeed: 'You want to see what I\'m building with generative AI and autonomous agents.',
    vibe: 'Gen AI · Agents · Shipping in public',
    glyph: '🧪',
    accent: '#a78bfa', // violet
    resume: TECH_RESUME,
    hero: {
      kicker: '// generative AI & agentic engineering — shipping in public',
      headline: '3.5 years of full-stack. Now I\'m building with the models, not just around them.',
      sub: 'A working lab, not a highlight reel. Each project here is a real Gen AI or agent build — React/Next.js on the front, Python where the model and agent logic lives — deployed under this domain as it ships. Nothing here is vaporware: it\'s either live or clearly marked "building".',
      cta: 'Enter the Lab'
    },
    proof: [
      { value: '2', label: 'tracks: Gen AI + agents' },
      { value: '3.5+', label: 'yrs full-stack, now + AI' },
      { value: '1', label: 'domain — every project lives here' }
    ]
  }
];

export const worldById = (id: string): World | undefined =>
  worlds.find((w) => w.id === id);

export const WORLD_IDS: WorldId[] = worlds.map((w) => w.id);
