import type { Metadata } from 'next';
import WorldShell from '@/components/world/WorldShell';
import WorldHero from '@/components/world/WorldHero';
import BeforeAfter from '@/components/world/BeforeAfter';
import DesignProcess from '@/components/world/DesignProcess';
import ProjectShowcase from '@/components/world/ProjectShowcase';
import DesignSystemShowcase from '@/components/world/DesignSystemShowcase';
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
      <DesignProcess />
      <ProjectShowcase
        eyebrow="The gallery"
        title="Things I've shipped"
        blurb="Enterprise modules open a screen carousel; client builds link straight to the live site."
        galleries={[...enterpriseGalleries, ...clientGalleries]}
      />
      <DesignSystemShowcase />
    </WorldShell>
  );
}
