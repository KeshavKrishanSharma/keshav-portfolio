// lib/gallery.ts — manifest of the real product screenshots, grouped by module.
// Worlds read from here (Engineer case studies, Designer gallery). Captions are
// sanitized — no institution names or PII, just what the screen demonstrates.

export interface Shot {
  src: string;
  caption: string;
}

export interface Gallery {
  id: string;
  name: string;
  tagline: string;
  shots: Shot[];
}

// The four enterprise modules built inside the Samarth eGov platform.
export const enterpriseGalleries: Gallery[] = [
  {
    id: 'mpdd',
    name: 'MPDD',
    tagline: 'Material distribution, inventory & dispatch',
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
    tagline: 'Regulatory affiliation & compliance workflows',
    shots: [
      { src: '/images/affiliation/dashboard.png', caption: 'Affiliation dashboard' },
      { src: '/images/affiliation/analytics.png', caption: 'Compliance analytics' },
      { src: '/images/affiliation/application.png', caption: 'Multi-stage application review' },
      { src: '/images/affiliation/document.png', caption: 'Auto-generated affiliation letter' },
      { src: '/images/affiliation/template.png', caption: 'Document template engine' },
      { src: '/images/affiliation/payments.png', caption: 'Payment tracking' }
    ]
  },
  {
    id: 'estate',
    name: 'Estate',
    tagline: 'Institutional estate & resource management',
    shots: [
      { src: '/images/estate/dashboard.png', caption: 'Estate dashboard' },
      { src: '/images/estate/buildings.png', caption: 'Building type distribution' },
      { src: '/images/estate/manage.png', caption: 'Estate management' },
      { src: '/images/estate/settings.png', caption: 'Admin configuration' }
    ]
  },
  {
    id: 'residence',
    name: 'Residence',
    tagline: 'Rule-driven residence allocation at scale',
    shots: [
      { src: '/images/residence/dashboard.png', caption: 'Allocation dashboard' },
      { src: '/images/residence/schemes.png', caption: 'Allocation schemes & pay levels' },
      { src: '/images/residence/scheme-builder.png', caption: 'Rule-driven scheme builder' },
      { src: '/images/residence/bulk-allocation.png', caption: 'Bulk allocation engine' },
      { src: '/images/residence/allotment-letter.png', caption: 'Generated allotment letter' }
    ]
  }
];

// Client / personal builds — used in the Designer world gallery.
export const clientGalleries: Gallery[] = [
  {
    id: 'maven',
    name: 'MavenEstate',
    tagline: 'Freelance real-estate platform',
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
    shots: [
      { src: '/images/carrental/home.png', caption: 'Vehicle browsing' },
      { src: '/images/carrental/booking.png', caption: 'Booking flow' }
    ]
  },
  {
    id: 'airbnb',
    name: 'Airbnb Clone',
    tagline: 'Pixel-faithful UI replication',
    shots: [
      { src: '/images/airbnb/home.png', caption: 'Landing clone' },
      { src: '/images/airbnb/grid.png', caption: 'Listings grid' }
    ]
  }
];
