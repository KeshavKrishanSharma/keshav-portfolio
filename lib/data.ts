// lib/data.ts — single source of truth for portfolio content.
// Edit this file to update the site; everything else reads from here.

export const profile = {
  name: 'Keshav Krishan Sharma',
  shortName: 'Keshav',
  initials: 'KK',
  portrait: '/images/persona/portrait-real.jpg',
  doodlePortrait: '/images/persona/developer-avatar.jpg',
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
  location: 'Ghaziabad, India',
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
    company: 'Smarth eGov × Ministry of Education (Samarth)',
    role: 'Full-Stack Engineer & Solutions Architect · Growing into Product & Gen AI',
    period: '2023 – Present · 3 years',
    bullets: [
      'Built four enterprise modules end to end (schema, API, React UI) from scratch — MPDD, Affiliation, Estate, and Residence Allocation — for India\'s national university platform, owning every layer from requirement discovery to production.',
      'Designed a multi-tenant foundation (institution-scoped data isolation) so a single codebase serves universities across India with zero cross-institution data leakage.',
      'Built a FIFO inventory engine with a 4-bucket stock invariant routed through a single atomic mutator — eliminating stock corruption and double-allocation under high-volume load (200+ daily issues).',
      'Engineered an 11-state allocation workflow with append-only audit logging and idempotent, time-boxed reservations; designed a 14-verb RBAC system with cloneable role templates and a "view-as-role" inspector.',
      'Drove direct client & stakeholder requirement-gathering, then led a v1→v2 re-architecture that removed years of technical debt and standardised UX for non-technical operators.',
      'Mentored junior engineers, ran code reviews, and set documentation and architecture-decision standards across modules.'
    ]
  },
  {
    company: 'Smarth eGov',
    role: 'Software Engineering Intern · Backend',
    period: 'Jan – Jun 2022 · 6 months',
    bullets: [
      'Developed backend modules in PHP (Yii2) and optimised complex SQL queries — improved API response times by ~30%.',
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
    role: 'Solutions Architect · Governance & Compliance',
    category: 'Enterprise · Workflow Automation',
    featured: true,
    summary:
      'Affiliation lifecycle and regulatory-compliance platform turning complex university statutes into configurable, multi-stage approval workflows with full auditability.',
    problem:
      'University affiliation involves dense, institution-specific regulations, multi-party approvals, and document verification — historically handled over email and spreadsheets, with no audit trail and slow turnaround.',
    architecture: [
      'Configurable rule engine that encodes per-institution regulations without code changes.',
      'Multi-stage approval workflows with role-based routing, document verification, and append-only audit trails that hold up to inspection.',
      'Multi-tenant, RBAC-secured architecture shared with the wider Samarth platform for consistent access control.'
    ],
    decisions: [
      'Modelled approvals as explicit, logged state transitions rather than ad-hoc status flags — every action is attributable and reversible.',
      'Standardised the API envelope and validation so the same patterns scale across modules.'
    ],
    impact: ['100+ universities', 'Faster approvals', 'Full audit trail'],
    tags: ['Yii2', 'React', 'PostgreSQL', 'RBAC', 'Workflow Engine'],
    image: '/images/affiliation/dashboard.png',
    accent: 'from-cyan-500 to-blue-500'
  },
  {
    title: 'Estate & Resource Management',
    role: 'Full-Stack Architect',
    category: 'Enterprise · Resource Allocation',
    featured: false,
    summary:
      'Institutional estate and resource-allocation engine with automated conflict detection — managing physical assets and bookings across departments.',
    problem:
      'Institutions juggle rooms, equipment, and shared resources with overlapping requests and no single source of truth, causing double-bookings and manual reconciliation.',
    architecture: [
      'Centralised resource registry with availability windows and automated conflict detection.',
      'Role-based allocation flows with approvals and a clear audit of who reserved what, when.'
    ],
    decisions: [
      'Treated conflict detection as a first-class constraint at allocation time rather than a post-hoc report.'
    ],
    impact: ['Conflict auto-detection', 'Faster allocation'],
    tags: ['React', 'Next.js', 'Yii2', 'MySQL'],
    image: '/images/estate/dashboard.png',
    accent: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Residence Allocation (eHousing)',
    role: 'Full-Stack Architect',
    category: 'Enterprise · Allocation Engine',
    featured: false,
    summary:
      'Hostel and residence allocation system — eligibility, room inventory, and rule-driven assignment for university housing at scale.',
    problem:
      'Manual hostel allocation is error-prone and contested: eligibility rules, room capacities, and preferences must be reconciled fairly and transparently each session.',
    architecture: [
      'Room/bed inventory model with eligibility rules and session-aware allocation.',
      'Rule-driven assignment with auditable decisions and RBAC-secured operator actions.'
    ],
    decisions: [
      'Made allocation rules configurable per institution so policy changes don\'t require redeployment.'
    ],
    impact: ['Rule-driven', 'Session-aware', 'Auditable'],
    tags: ['React', 'Yii2', 'MySQL', 'RBAC'],
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
  'Outstanding Technical Contribution Award — Smarth eGov (Q2 2024)'
];
