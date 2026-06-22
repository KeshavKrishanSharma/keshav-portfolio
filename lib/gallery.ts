// lib/gallery.ts — the modules & client builds shown across the worlds.
// Content is grounded in the real Samarth source (read-only): features and the
// engineering highlight are taken from the actual modules, not invented.
// Worlds render these as info-first cards; screenshots live behind a click.

export interface Shot {
  src: string;
  caption: string;
}

export interface Gallery {
  id: string;
  name: string;
  /** Short label under the title. */
  tagline: string;
  /** One-liner: what it actually is. */
  whatItIs: string;
  /** Real, code-traceable capabilities. */
  features: string[];
  /** The single engineering fact worth remembering. */
  highlight: string;
  /** Authentic stack. */
  stack: string[];
  /** Screens shown in the carousel (chrome-free crops). */
  shots: Shot[];
  /** Client builds link straight out; modules open the carousel. */
  live?: string;
}

// The enterprise modules built inside the Samarth eGov platform.
export const enterpriseGalleries: Gallery[] = [
  {
    id: 'mpdd',
    name: 'MPDD',
    tagline: 'Material distribution, inventory & dispatch',
    whatItIs:
      'End-to-end kit procurement, inventory and dispatch for university material distribution — rebuilt from the schema up.',
    features: [
      'FIFO inventory with a 4-bucket stock invariant (available / reserved / allocated / in-transit)',
      '11-state allocation lifecycle with an append-only status log',
      'Procurement pipeline: Purchase Request → Purchase Order → Goods Receipt',
      'Bulk allocation, bulk Excel import & multi-warehouse stock transfers',
      'Barcode / QR label & sheet designer'
    ],
    highlight:
      'Every stock change flows through one atomic mutator inside a DB transaction — no double-allocation under high-volume load.',
    stack: ['Yii2 (PHP)', 'React 19 / TS', 'MySQL', 'RBAC'],
    shots: [
      { src: '/images/mpdd/dashboard.png', caption: 'Operations dashboard' },
      { src: '/images/mpdd/inventory.png', caption: 'FIFO inventory · 4-bucket stock model' },
      { src: '/images/mpdd/allocation.png', caption: 'Allocation workflow' },
      { src: '/images/mpdd/purchase-order.png', caption: 'Procurement → purchase order' },
      { src: '/images/mpdd/warehouse.png', caption: 'Multi-warehouse stock' },
      { src: '/images/mpdd/label-designer.png', caption: 'Barcode / QR label designer' }
    ]
  },
  {
    id: 'affiliation',
    name: 'Affiliation',
    tagline: 'Regulatory affiliation lifecycle & statutory reporting',
    whatItIs:
      'The lifecycle for colleges seeking affiliation to a university — applications, committee audits, automatic fees, and statutory reporting. 63 models, 30+ controllers.',
    features: [
      'Automatic fee & billing engine — prices each application from configured fee heads (flat / per-course / per-subject) + date-windowed late fees, emitting an itemized bill',
      'Background job queue for bulk exports — streaming XLSX → S3 with live cron progress',
      'Committee workspace with configurable audit / inspection forms & scoring',
      'Provisional affiliation certificates (A / B)',
      'Per-programme intake-capacity range configuration',
      'Programme→course→subject & discipline→OU→faculty mapping engines',
      'Affiliation summary reporting, by organization or programme, year-ranged'
    ],
    highlight:
      'Streaming Excel→S3 export: 25k rows/sheet, chunked flush, GC + an 85%-memory-threshold guard and retry/backoff — exports hundreds of colleges without OOM.',
    stack: ['Yii2 (PHP)', 'MySQL', 'PhpSpreadsheet', 'AWS S3', 'yii\\queue', 'RBAC'],
    shots: [
      { src: '/images/affiliation/dashboard.png', caption: 'Affiliation dashboard' },
      { src: '/images/affiliation/analytics.png', caption: 'Affiliation summary analytics' },
      { src: '/images/affiliation/application.png', caption: 'Multi-stage application review' },
      { src: '/images/affiliation/document.png', caption: 'Auto-generated affiliation letter' },
      { src: '/images/affiliation/template.png', caption: 'Document template engine' },
      { src: '/images/affiliation/payments.png', caption: 'Fee & payment tracking' }
    ]
  },
  {
    id: 'estate',
    name: 'Estate',
    tagline: 'Physical-infrastructure asset management',
    whatItIs:
      'The university estate as a hierarchical asset register — buildings, floors, rooms, roads and civil works — with cost estimation and analytics.',
    features: [
      'Hierarchical register: building → floor → room → washroom → house → road → block',
      'Scenario-driven 4-step building form (profile → structural → facilities → cost + geo)',
      'Building cost estimation & geo-tagging',
      'ARMO civil-works: abstracts, quotations & repair estimates',
      'C3.js / D3 dashboard analytics over query-builder aggregates',
      '15+ configurable construction type-masters + custom bulk import'
    ],
    highlight:
      'Integrity-enforced active cascade — a room can only be active if its floor and building are, keeping the estate register self-consistent.',
    stack: ['Yii2 (PHP)', 'MySQL', 'C3.js / D3', 'Query Builder'],
    shots: [
      { src: '/images/estate/dashboard.png', caption: 'Estate dashboard' },
      { src: '/images/estate/buildings.png', caption: 'Building summary & distribution' },
      { src: '/images/estate/manage.png', caption: 'Manage estate components' },
      { src: '/images/estate/settings.png', caption: 'Construction type-masters' }
    ]
  },
  {
    id: 'residence',
    name: 'eHousing',
    tagline: 'Employee accommodation allocation',
    whatItIs:
      'Staff register for university quarters and are matched against live housing inventory by preference and eligibility.',
    features: [
      'Preference-based allocation (house type + choice) per employee',
      'Composes the Estate housing register & Employee profiles — true cross-module integration',
      'Vacancy-aware unit status (vacant / allocated / newly-added)',
      'Role-scoped admin vs employee dashboards',
      'Master declarations, eligibility & activity audit log',
      'Bulk import'
    ],
    highlight:
      'Reads Estate\'s Housing register and Employee Profiles directly — modules compose across the platform instead of duplicating data.',
    stack: ['Yii2 (PHP)', 'MySQL', 'RBAC', 'Multi-DB'],
    shots: [
      { src: '/images/residence/dashboard.png', caption: 'Allocation dashboard' },
      { src: '/images/residence/schemes.png', caption: 'Allocation schemes & pay levels' },
      { src: '/images/residence/scheme-builder.png', caption: 'Rule-driven scheme builder' },
      { src: '/images/residence/bulk-allocation.png', caption: 'Bulk allocation engine' },
      { src: '/images/residence/allotment-letter.png', caption: 'Generated allotment letter' }
    ]
  }
];

// Client / personal builds — these link straight to the live site.
export const clientGalleries: Gallery[] = [
  {
    id: 'maven',
    name: 'MavenEstate.in',
    tagline: 'Freelance real-estate platform',
    whatItIs:
      'A premium real-estate site delivered for a freelance client — listings, lead capture and a conversion-tuned responsive landing.',
    features: ['Property listings & detail pages', 'Lead capture', 'Mobile-first, conversion-tuned'],
    highlight: 'Live in production for a paying client.',
    stack: ['React', 'Tailwind', 'Node.js'],
    live: 'https://mavenestate.in',
    shots: [
      { src: '/images/maven/home.png', caption: 'Landing experience' },
      { src: '/images/maven/listings.png', caption: 'Property listings' },
      { src: '/images/maven/detail.png', caption: 'Listing detail' }
    ]
  },
  {
    id: 'carrental',
    name: 'Car Rental',
    tagline: 'Booking interface',
    whatItIs: 'A car-rental booking flow — vehicle browsing, filtering and a clean responsive booking experience.',
    features: ['Vehicle browsing & filtering', 'Responsive booking flow'],
    highlight: 'Built as a focused front-end assessment.',
    stack: ['React', 'Firebase', 'CSS'],
    live: 'https://car-rental-site-5150e.web.app/',
    shots: [
      { src: '/images/carrental/home.png', caption: 'Vehicle browsing' },
      { src: '/images/carrental/booking.png', caption: 'Booking flow' }
    ]
  },
  {
    id: 'airbnb',
    name: 'Airbnb Clone',
    tagline: 'Pixel-faithful UI replication',
    whatItIs: 'A pixel-faithful, fully responsive clone of the Airbnb landing — an exercise in precise layout fidelity.',
    features: ['Pixel-accurate layout', 'Fully responsive'],
    highlight: 'Component-fidelity exercise.',
    stack: ['React', 'Tailwind', 'Responsive'],
    live: 'https://airbnbsinglepageclone.web.app/',
    shots: [
      { src: '/images/airbnb/home.png', caption: 'Landing clone' },
      { src: '/images/airbnb/grid.png', caption: 'Listings grid' }
    ]
  }
];
