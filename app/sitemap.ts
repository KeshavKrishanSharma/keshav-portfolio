import type { MetadataRoute } from 'next';
import { profile } from '@/lib/data';
import { WORLD_IDS } from '@/lib/worlds';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = profile.siteUrl.replace(/\/$/, '');

  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${base}/resume`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9
    },
    ...WORLD_IDS.map((id) => ({
      url: `${base}/${id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8
    }))
  ];
}
