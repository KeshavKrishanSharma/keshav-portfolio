import type { Metadata } from 'next';
import WorldShell from '@/components/world/WorldShell';
import WorldHero from '@/components/world/WorldHero';
import ArchitectureMap from '@/components/world/ArchitectureMap';
import AllocationMachine from '@/components/world/AllocationMachine';
import Showcase from '@/components/world/Showcase';
import { worldById } from '@/lib/worlds';
import { enterpriseGalleries } from '@/lib/gallery';
import { profile } from '@/lib/data';

const world = worldById('engineer')!;

export const metadata: Metadata = {
  title: `${profile.name} — ${world.name}`,
  description: world.hero.sub,
  alternates: { canonical: `${profile.siteUrl}/engineer` }
};

export default function EngineerWorld() {
  return (
    <WorldShell worldId="engineer">
      <WorldHero worldId="engineer" />
      <ArchitectureMap />
      <AllocationMachine />
      <Showcase
        eyebrow="// case studies"
        title="Built and shipped"
        blurb="Real screens from the four modules — sanitised, no institution data. Browse by module."
        galleries={enterpriseGalleries}
      />
    </WorldShell>
  );
}
