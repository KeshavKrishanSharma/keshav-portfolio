import type { Metadata } from 'next';
import DoorsLanding from '@/components/world/DoorsLanding';
import { profile } from '@/lib/data';

export const metadata: Metadata = {
  title: `${profile.name} — Engineer · Strategist · Designer`,
  description:
    'Same person, three lenses. Choose a door to tour Keshav as an Engineer, a Strategist, or a Designer — or skip to the full résumé.',
  alternates: { canonical: profile.siteUrl }
};

export default function Home() {
  return <DoorsLanding />;
}
