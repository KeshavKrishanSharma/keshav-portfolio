// lib/data.ts — single source of truth for portfolio content.
// Edit this file to update the site; everything else reads from here.

export const profile = {
  name: 'Keshav Krishan Sharma',
  shortName: 'Keshav',
  initials: 'KKS',
  portrait: '/images/persona/my_dp.jpeg',
  doodlePortrait: '/images/persona/portrait-doodle.jpg',
  currentlyBuilding: 'Gen AI side projects + agentic systems',
  resumeLeadershipUrl: '/resume-leadership.pdf',
  titleRotator: [
    'Full-Stack Engineer',
    'Solutions Architect',
    'Technical Lead',
    'Aspiring Product Manager',
    'Gen-AI Explorer',
    'Systems Architect'
  ],
  tagline:
    'I write the schema, design the API, and ship the React UI — 3.5 years building the production systems running higher education across India.',
  location: 'New Delhi, India',
  email: 'keshavkrishansharmaofficial@gmail.com',
  phone: '+91-9911220507',
  resumeUrl: '/resume.pdf',
  // Canonical site URL — update once deployed (e.g. https://keshav.vercel.app)
  siteUrl: 'https://keshavkrishansharma.com',
  socials: {
    linkedin: 'https://linkedin.com/in/keshav-krishan',
    github: 'https://github.com/KeshavKrishanSharma'
  },
  about: [
    "Full-stack engineer, 3.5 years. I build the systems that run higher education across India — four enterprise modules on Samarth, the Ministry of Education's national university platform, owned end to end from PHP/Yii2 backends and MySQL to the React UI that university staff use every day.",
    "My work is the full stack: I gather requirements directly from institutions, translate complex rules into clean data models and state machines, then ship the UI. Multi-tenant from day one, RBAC-secured, audit-grade by design — one codebase, zero forks, every university.",
    "Now I'm growing. I want to move into Product Management — I've spent 3.5 years at the intersection of user needs, engineering tradeoffs, and real deployment; I'm ready to own the product, not just the code. I'm also diving into Gen AI and LLMs as a beginner, and I'm completely fine with that — I learn by building, breaking, and going again. Eat, sleep, learn, repeat. And rest. The path never ends."
  ]
};

export const stats = [
  { value: '4', label: 'Enterprise Modules' },
  { value: '3.5+', label: 'Years Experience' },
  { value: '11', label: 'State Workflow Engine' },
  { value: '14', label: 'RBAC Permission Verbs' }
];

export const experience = [
  {
    company: 'Samarth eGov × Ministry of Education (Samarth)',
    role: 'Software Developer C · Full-Stack & Systems Architecture',
    period: 'Jan 2025 – Present · 1.5 yrs',
    bullets: [
      'Promoted to Software Developer C — a title that still undersells the scope: sole end-to-end architect on 4 of the platform\'s 20+ enterprise modules, owning everything from blank schema to production.',
      'Designed the Affiliation automatic fee & billing engine — fee heads configured once per affiliation-type × institution × programme-type; the engine resolves programmes→courses→subjects, prices by basis (flat / per-course / per-subject), applies date-windowed late fees, and emits a fully itemized bill without human intervention.',
      'Engineered a streaming Excel→S3 background export queue (yii\\queue + PhpSpreadsheet, 25k rows/sheet, GC + 85% memory-threshold guard, S3 retry/backoff, live cron progress) — hundreds of colleges export without OOM.',
      'Translated Ministry of Education mandates directly into data models and shipped them — no PM layer, just engineer to stakeholder to production.',
      'Set architecture, code-review, and documentation standards; mentored junior engineers across all modules.'
    ]
  },
  {
    company: 'Samarth eGov × Ministry of Education (Samarth)',
    role: 'Junior Software Developer · Full-Stack',
    period: 'Jan 2023 – Jan 2025 · 2 yrs',
    bullets: [
      'Built MPDD from scratch: FIFO inventory (4-bucket stock invariant, single atomic mutator, 200+ daily issues), 11-state allocation engine with append-only audit log, procurement pipeline (PR→PO→GRN), barcode/QR label designer, and bulk Excel import.',
      'Built the Estate module: hierarchical asset register (building→floor→room→washroom), scenario-driven 4-step building form, ARMO civil-works quotations & repair estimates, C3.js/D3 analytics dashboard, bulk import.',
      'Built eHousing: employee accommodation allocation composing Estate\'s housing register and Employee profiles — true cross-module integration without data duplication; bulk import.',
      'Designed the platform\'s multi-tenant foundation — institution-scoped data isolation so one codebase serves every university with zero cross-tenant leakage.',
      'Led v1→v2 re-architecture — removed years of technical debt, standardised UX for non-technical operators, unified API patterns and bulk-import patterns across all modules.'
    ]
  },
  {
    company: 'Samarth eGov',
    role: 'Software Engineering Intern · Backend',
    period: 'Jan – Jun 2022 · 6 months',
    bullets: [
      'Developed backend modules in PHP/Yii2 and optimised complex SQL queries — improved API response times by ~30%.',
      'Collaborated with the product team to design RESTful endpoints powering real-time institutional dashboards.'
    ]
  }
];

// ── Projects / Case Studies ──────────────────────────────────────────────
// `featured: true` → rendered as a full case study (Problem → Architecture →
// Decisions → Impact). Optional `image` points at public/images/<file> and is
// shown with a scroll-zoom; if the file is missing the card shows a tasteful
// placeholder, so the site never looks broken before screenshots are added.
export type Project = {
  title: string;
  role: string;
  category?: string;
  featured?: boolean;
  summary: string;
  problem?: string;
  architecture?: string[];
  decisions?: string[];
  impact: string[];
  tags: string[];
  image?: string;
  accent: string;
  href?: string;
};

export const projects: Project[] = [
  {
    title: 'MPDD — Material Distribution Platform',
    role: 'Solutions Architect · National University Platform',
    category: 'Enterprise · Multi-tenant SaaS',
    featured: true,
    summary:
      'End-to-end university kit procurement, inventory, allocation, and dispatch — rebuilt from the schema up as a multi-tenant platform for institutions across India.',
    problem:
      'The legacy system carried years of technical debt: a 12-click allocation flow, developer jargon in the UI, and an inventory model that could drift out of sync under load. Operators are often non-technical staff working high-volume admission weeks (200+ issues a day).',
    architecture: [
      'Yii2 (PHP) + React 19 / TypeScript SPA on MySQL 8, with a strict Controller → Service → DTO → Model → Mutator layering.',
      'Multi-tenant by design — every table is institution-scoped and auto-isolated, so one deployment safely serves many universities.',
      'FIFO inventory with a 4-bucket quantity model (available / reserved / allocated / in-transit) that always satisfies sum = total, mutated only through a single atomic chokepoint.',
      '11-state allocation state machine with an append-only status log and time-boxed, idempotent reservations that survive retries and double-clicks.',
      'Procurement pipeline: Purchase Request → Purchase Order → Goods Receipt, with auto-numbered documents and a label / sheet print designer (barcode + QR).'
    ],
    decisions: [
      'A dynamic property registry lets new goods attributes appear across every form with zero UI changes — configurable, not hard-coded.',
      'Adopted the platform\'s native RBAC over a custom one for host-compatibility, exposed as a 14-verb permission matrix with cloneable roles and a permission audit trail.',
      'Operator-first UX: 15px minimum type, plain-language terminology, drawer-based CRUD, and errors that always say what / why / what-to-do.'
    ],
    impact: ['Built from scratch', 'Multi-tenant · national scale', 'Audit-grade workflows', '200+ daily issues'],
    tags: ['Yii2', 'React 19', 'TypeScript', 'MySQL', 'RBAC', 'Multi-tenant'],
    image: '/images/mpdd/dashboard.png',
    accent: 'from-violet-500 to-fuchsia-500'
  },
  {
    title: 'Affiliation & Compliance Platform',
    role: 'Solutions Architect · Regulatory Workflow Automation',
    category: 'Enterprise · Regulatory Compliance',
    featured: true,
    summary:
      'Regulatory affiliation lifecycle for colleges seeking university affiliation — automatic fee & billing engine, committee inspection workspaces, statutory reporting, and a streaming Excel→S3 export queue. 63 models, 30+ controllers.',
    problem:
      'Affiliation involves dense per-institution regulations, multi-party committee inspections, and complex fee structures historically handled over email — no audit trail, slow turnaround, and manual billing that introduced errors.',
    architecture: [
      'Automatic fee & billing engine: fee heads configured once per affiliation-type × institution × programme-type with a basis (flat / per-course / per-subject); the engine resolves programmes→courses→subjects, prices each head, applies date-windowed late fees, and emits an itemized afm_application_bill with grand_total — zero manual entry.',
      'Background job queue (yii\\queue): streaming PhpSpreadsheet XLSX export, 25k rows/sheet, chunked flush, GC + 85%-memory-threshold guard, S3 retry/backoff, live cron progress tracker.',
      'Committee workspace: configurable audit/inspection forms, scoring, provisional certificates (A/B).',
      'Programme→course→subject & discipline→OU→faculty mapping engines; per-programme intake-capacity configuration.',
      'Bulk import pipeline across all master entities; affiliation summary reporting year-ranged by organisation or programme.'
    ],
    decisions: [
      'Fee heads are configured data, not code — a policy change is an admin action, not a deployment.',
      'Export runs off the request thread: job queue means no user waits for a multi-MB download, and the 85% memory guard prevents OOM on large institution data sets.'
    ],
    impact: ['Automatic billing — zero manual fee entry', '100+ universities', 'Streaming XLSX→S3, OOM-free', 'Full audit trail'],
    tags: ['Yii2', 'PHP', 'MySQL', 'PhpSpreadsheet', 'AWS S3', 'yii\\queue', 'RBAC'],
    image: '/images/affiliation/dashboard.png',
    accent: 'from-cyan-500 to-blue-500'
  },
  {
    title: 'Estate Management System',
    role: 'Full-Stack Architect · Physical Infrastructure',
    category: 'Enterprise · Asset Register',
    featured: false,
    summary:
      'University physical-infrastructure asset register — buildings, floors, rooms, roads, and civil works — with cost estimation, ARMO repair workflows, C3.js/D3 analytics, and bulk import.',
    problem:
      'University estates span hundreds of buildings, roads, and civil assets with no single source of truth — maintenance was untracked, cost estimates were manual, and the asset hierarchy was inconsistently maintained with no active-state integrity.',
    architecture: [
      'Hierarchical register: building→floor→room→washroom→house→road→block with integrity-enforced active cascade — a room can only be active if its floor and building are, keeping the register self-consistent.',
      'Scenario-driven 4-step building form: profile → structural → facilities → cost + geo-tagging.',
      'ARMO civil-works: abstracts, quotations, repair estimates per work order.',
      'C3.js/D3 dashboard analytics over MySQL query-builder aggregates; 15+ configurable construction type-masters.',
      'Bulk import pipeline with row-level validation and error reporting.'
    ],
    decisions: [
      'Active-cascade enforced at the model layer, not the application layer — the register is always self-consistent regardless of interface.',
      'Bulk import with row-level validation and an error report — admins fix and re-upload without re-entering valid rows.'
    ],
    impact: ['Self-consistent asset register', 'ARMO civil-works tracking', 'D3 analytics dashboard', 'Bulk import'],
    tags: ['Yii2', 'PHP', 'MySQL', 'C3.js / D3', 'RBAC'],
    image: '/images/estate/dashboard.png',
    accent: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'eHousing — Employee Accommodation',
    role: 'Full-Stack Architect · Cross-Module Integration',
    category: 'Enterprise · Allocation Engine',
    featured: false,
    summary:
      'University employee quarters allocation — preference-based matching against live housing inventory, with cross-module integration into Estate\'s housing register and the Employee profile system.',
    problem:
      'Staff accommodation was allocated manually each cycle: eligibility rules, unit preferences, and vacancy status were tracked in spreadsheets, causing errors, disputes, and no audit of who was allocated what and why.',
    architecture: [
      'Composes Estate\'s Housing register and Employee Profiles directly — true cross-module integration, no data duplication.',
      'Preference-based allocation: house type + choice per employee, matched against vacancy-aware unit status (vacant / allocated / newly-added).',
      'Rule-driven eligibility, scheme builder, and pay-level tiers; role-scoped admin vs employee dashboards.',
      'Bulk import, master declarations, eligibility rules, and full activity audit log.'
    ],
    decisions: [
      'Reads Estate and Employee data rather than copying it — modules compose across the platform instead of forking data and diverging.'
    ],
    impact: ['Cross-module composition', 'Preference-based allocation', 'Vacancy-aware inventory', 'Auditable decisions'],
    tags: ['Yii2', 'PHP', 'MySQL', 'RBAC', 'Multi-DB'],
    image: '/images/residence/dashboard.png',
    accent: 'from-amber-500 to-orange-500'
  },
  {
    title: 'Multi-Modal Evidence Review',
    role: 'AI Engineer · HackerRank Orchestrate',
    category: 'AI · Computer Vision',
    featured: true,
    summary:
      'An AI system that verifies insurance damage claims by reasoning over submitted photos, the claim conversation, and user history — deciding whether the image evidence supports, contradicts, or is insufficient for the claim, and classifying the damage type, part, severity, and fraud/quality risks.',
    problem:
      'Claims arrive as messy multimodal bundles: several photos of uneven quality, a free-text chat, and a user risk history. A reviewer has to decide whether the images actually prove the stated damage, resist prompt-injection text hidden inside images, and stay consistent and auditable across thousands of cases.',
    architecture: [
      'Typed ingestion layer with null-safe joins across claims, user history, and a minimum evidence-requirements checklist.',
      'An OpenCV quality gate runs first and spends zero tokens — rejecting blurry, cropped, or low-light images before any model call.',
      'A single Claude vision call per row at temperature 0 returns strict JSON — the model "reports what it sees, it does not decide".',
      'A deterministic, injection-proof decision engine makes the verdict: it matches the claim against evidence rules, unions the risk flags, and resolves supported / contradicted / not_enough_information.',
      'An output layer emits the exact 14-column schema, enum-snapped and validated, to output.csv.'
    ],
    decisions: [
      'Separated perception from judgement so the LLM never owns the verdict — the rule engine is authoritative and resistant to text injected inside images.',
      'Disk-cached model calls + temperature 0 make runs reproducible and cheap to re-execute; retries with backoff and a TPM/RPM semaphore keep it inside rate limits.',
      'Evaluated on the labelled sample set with precision / recall, plus a token, cost, and latency analysis, before scoring the blind test set.'
    ],
    impact: [
      'Vision-LLM + deterministic engine',
      'One cached call per row',
      '14-field structured output',
      'Eval: precision / recall'
    ],
    tags: ['Python', 'Claude Vision (VLM)', 'OpenCV', 'Rule Engine', 'Evaluation', 'Injection-safe'],
    image: '/images/hackathon-pipeline.svg',
    accent: 'from-emerald-500 to-cyan-500',
    href: 'https://github.com/KeshavKrishanSharma/hackerRankContest'
  },
  {
    title: 'MavenEstate.in — Real Estate Platform',
    role: 'Freelance · Full Stack',
    category: 'Client Work',
    featured: false,
    summary:
      'Premium real-estate site delivered for a freelance client — property listings, lead capture, and a responsive landing experience tuned for conversions.',
    impact: ['Live in production', 'Mobile-first'],
    tags: ['React', 'Tailwind', 'Node.js'],
    image: '/images/maven/home.png',
    accent: 'from-rose-500 to-pink-500',
    href: 'https://mavenestate.in'
  },
  {
    title: 'Social Posting App',
    role: 'Frontend · Personal Build',
    category: 'Frontend · Firebase',
    featured: false,
    summary:
      'A social posting app with authentication and realtime data — create, view, and manage posts backed by Firebase.',
    impact: ['Live', 'Realtime data'],
    tags: ['React', 'Firebase', 'Firestore'],
    accent: 'from-indigo-500 to-violet-500',
    href: 'https://posting-app-73b02.web.app/'
  },
  {
    title: 'Car Rental Site',
    role: 'Frontend · Assessment',
    category: 'Frontend Build',
    featured: false,
    summary:
      'Car-rental booking interface — vehicle listings, filtering, and a clean responsive booking flow.',
    impact: ['Live', 'Responsive'],
    tags: ['React', 'Firebase', 'CSS'],
    image: '/images/carrental/home.png',
    accent: 'from-sky-500 to-cyan-500',
    href: 'https://car-rental-site-5150e.web.app/'
  },
  {
    title: 'Airbnb Landing Clone',
    role: 'Frontend · Assessment',
    category: 'UI Replication',
    featured: false,
    summary:
      'A pixel-faithful, fully responsive clone of the Airbnb landing experience — an exercise in precise layout and component fidelity.',
    impact: ['Live', 'Pixel-accurate'],
    tags: ['React', 'Tailwind', 'Responsive'],
    image: '/images/airbnb/home.png',
    accent: 'from-rose-500 to-orange-500',
    href: 'https://airbnbsinglepageclone.web.app/'
  }
];

// ── Engineering principles + the signature allocation state machine ───────
// Rendered by components/Architecture.tsx. The state machine is pure SVG/motion
// (no images needed) and doubles as proof of what Keshav builds.
export const architecture = {
  principles: [
    {
      title: 'Multi-tenant by default',
      body: 'Every table is institution-scoped and auto-isolated. One codebase serves many universities with zero cross-tenant leakage — scale without forking.'
    },
    {
      title: 'Atomic, never corrupt',
      body: 'All stock changes flow through a single mutator inside DB transactions, holding a strict invariant. Idempotency keys make retries and double-clicks safe.'
    },
    {
      title: 'Configurable, not hard-coded',
      body: 'A dynamic property registry and per-institution rule engines mean new fields and policies ship without code changes or redeploys.'
    },
    {
      title: 'Audit-grade by design',
      body: 'State transitions are explicit and append-only logged. Every approval, dispatch, and permission change is attributable and inspection-ready.'
    },
    {
      title: 'RBAC you can reason about',
      body: 'A 14-verb permission matrix with cloneable role templates and a "view-as-role" inspector — institutions customise access without touching code.'
    },
    {
      title: 'Built for real operators',
      body: 'Designed for non-technical staff on low-res screens: plain language, readable type, drawer-based flows, and errors that explain what to do next.'
    }
  ],
  // The allocation lifecycle — animated step-through on scroll.
  workflow: {
    title: 'Allocation lifecycle',
    caption: 'An 11-state machine with audit logging at every transition — simplified to the happy path here.',
    states: ['Reserved', 'Label Generated', 'Confirmed', 'Pending Dispatch', 'Dispatched', 'Delivered']
  }
};

// Job stack = what I ship at work. Personal stack = what I learn / use on the side.
export const skills = {
  jobStack: {
    title: 'At Work',
    subtitle: 'What I architect and ship in production',
    groups: [
      {
        name: 'Architecture & Leadership',
        items: [
          'System Design',
          'Multi-tenant SaaS',
          'RBAC & Access Control',
          'State Machines & Workflows',
          'Requirement Discovery',
          'Client & Stakeholder Delivery'
        ]
      },
      {
        name: 'Backend',
        items: ['PHP (Yii2)', 'Node.js / Express', 'REST APIs', 'MySQL / PostgreSQL', 'Redis', 'Service / DTO layering']
      },
      {
        name: 'Frontend',
        items: ['React 19', 'TypeScript', 'Next.js', 'TailwindCSS', 'HTML5 / CSS3']
      },
      {
        name: 'Cloud & DevOps',
        items: ['AWS (EC2, RDS, S3)', 'Docker', 'Jenkins CI/CD', 'Git / GitHub Actions', 'Vite']
      },
      {
        name: 'Methodology',
        items: ['Agile / Scrum', 'Technical Roadmapping', 'Code Review', 'Architecture Decision Records']
      }
    ]
  },
  personalStack: {
    title: 'Personal & Always Learning',
    subtitle: "Side projects, certifications, and what's next",
    groups: [
      {
        name: 'Gen AI & Prompt Engineering',
        items: ['Prompt Engineering', 'LLM App Design', 'Evals & Iteration', 'RAG patterns']
      },
      {
        name: 'Agentic AI · learning now',
        items: ['Tool-using agents', 'Multi-step orchestration', 'MCP', 'Agent evals']
      },
      {
        name: 'Creative Frontend',
        items: ['Three.js / R3F', 'Framer Motion', 'GSAP', 'WebGL basics']
      },
      {
        name: 'Design & UX',
        items: ['UI/UX Design', 'Product Design Fundamentals', 'Design Thinking']
      }
    ]
  }
};

export const certifications = [
  {
    title: 'AI Certificate',
    issuer: 'Self-paced learning track',
    file: '/certificates/ai-certificate.pdf',
    accent: 'from-violet-500 to-indigo-500'
  },
  {
    title: 'Prompt Engineering',
    issuer: 'Specialization certificate',
    file: '/certificates/prompt-engineering.pdf',
    accent: 'from-fuchsia-500 to-pink-500'
  },
  {
    title: 'Clean Code · Udemy',
    issuer: 'Udemy',
    file: '/certificates/udemy-clean-code.pdf',
    accent: 'from-cyan-500 to-blue-500'
  },
  {
    title: 'Clean Code — Control Structures',
    issuer: 'Self-paced summary',
    file: '/certificates/clean-code-control-structures.pdf',
    accent: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Clean Code — Objects',
    issuer: 'Self-paced summary',
    file: '/certificates/clean-code-objects.pdf',
    accent: 'from-amber-500 to-orange-500'
  },
  {
    title: 'Clean Code — Checklist',
    issuer: 'Self-paced reference',
    file: '/certificates/clean-code-checklist.pdf',
    accent: 'from-rose-500 to-red-500'
  },
  {
    title: 'Additional Certificate',
    issuer: 'Issued credential',
    file: '/certificates/certificate-additional.pdf',
    accent: 'from-sky-500 to-cyan-500'
  },
  {
    title: 'CIR Certificate',
    issuer: 'Issued credential',
    file: '/certificates/cir1.pdf',
    accent: 'from-lime-500 to-emerald-500'
  },
  // Listed-only (not in folder yet — add the file then uncomment `file:`)
  {
    title: 'Graphic Design & UI/UX',
    issuer: 'Simplilearn — Product Design Fundamentals',
    accent: 'from-purple-500 to-violet-500'
  },
  {
    title: 'Digital Skills: User Experience',
    issuer: 'Accenture · FutureLearn',
    accent: 'from-blue-500 to-indigo-500'
  },
  {
    title: 'CPD Certified Professional',
    issuer: 'The CPD Certification Service',
    accent: 'from-teal-500 to-cyan-500'
  },
  {
    title: 'UI/UX Design Intensive',
    issuer: 'Le Wagon — Product-centric Design Thinking',
    accent: 'from-pink-500 to-fuchsia-500'
  },
  {
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'Self-paced',
    accent: 'from-orange-500 to-amber-500'
  }
];

export const education = {
  degree: 'B.Tech, Computer Science & Engineering',
  school: 'Krishna Engineering College, Ghaziabad (AKTU University)',
  period: '2018 – 2022',
  result: 'First Division with Honors'
};

export const honors = [
  'Winner — Inter College Innovative Idea Competition (Smart Campus solution)',
  'Core Member — IEEE IDC Initiative · led tech workshops for 200+ students',
  'Technical Presenter — IIT Varanasi TechFest (GovTech research track)',
  'Outstanding Technical Contribution Award — Samarth eGov (Q2 2024)'
];
