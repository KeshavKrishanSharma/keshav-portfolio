import type { Metadata } from 'next';
import WorldShell from '@/components/world/WorldShell';
import WorldHero from '@/components/world/WorldHero';
import ArchitectureMap from '@/components/world/ArchitectureMap';
import AllocationMachine from '@/components/world/AllocationMachine';
import AffiliationEngine from '@/components/world/AffiliationEngine';
import ProjectShowcase from '@/components/world/ProjectShowcase';
import PlatformBand from '@/components/world/PlatformBand';
import ContactStrip from '@/components/world/ContactStrip';
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
      <AffiliationEngine />
      <PlatformBand />
      <ProjectShowcase
        eyebrow="// case studies"
        title="Built and shipped"
        blurb="Four enterprise modules, built largely solo inside a 20+ module national platform. Open any card for the screens."
        galleries={enterpriseGalleries}
      />
      <ContactStrip />
    </WorldShell>
  );
}
