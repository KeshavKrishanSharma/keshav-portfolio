import type { Metadata } from 'next';
import WorldShell from '@/components/world/WorldShell';
import WorldHero from '@/components/world/WorldHero';
import GenAILab from '@/components/world/GenAILab';
import ContactStrip from '@/components/world/ContactStrip';
import { worldById } from '@/lib/worlds';
import { profile } from '@/lib/data';

const world = worldById('lab')!;

export const metadata: Metadata = {
  title: `${profile.name} — ${world.name}`,
  description: world.hero.sub,
  alternates: { canonical: `${profile.siteUrl}/lab` }
};

export default function LabWorld() {
  return (
    <WorldShell worldId="lab">
      <WorldHero worldId="lab" />
      <GenAILab />
      <ContactStrip />
    </WorldShell>
  );
}
