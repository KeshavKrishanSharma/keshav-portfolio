import type { Metadata } from 'next';
import WorldShell from '@/components/world/WorldShell';
import WorldHero from '@/components/world/WorldHero';
import BeforeAfter from '@/components/world/BeforeAfter';
import DesignSystemShowcase from '@/components/world/DesignSystemShowcase';
import Showcase from '@/components/world/Showcase';
import { worldById } from '@/lib/worlds';
import { enterpriseGalleries, clientGalleries } from '@/lib/gallery';
import { profile } from '@/lib/data';

const world = worldById('designer')!;

export const metadata: Metadata = {
  title: `${profile.name} — ${world.name}`,
  description: world.hero.sub,
  alternates: { canonical: `${profile.siteUrl}/designer` }
};

export default function DesignerWorld() {
  return (
    <WorldShell worldId="designer">
      <WorldHero worldId="designer" />
      <BeforeAfter />
      <Showcase
        eyebrow="The gallery"
        title="Screens, up close"
        blurb="Enterprise modules and client builds — tap a tab to switch projects."
        galleries={[...enterpriseGalleries, ...clientGalleries]}
        tilted
      />
      <DesignSystemShowcase />
    </WorldShell>
  );
}
