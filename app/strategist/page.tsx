import type { Metadata } from 'next';
import WorldShell from '@/components/world/WorldShell';
import WorldHero from '@/components/world/WorldHero';
import StatRollup from '@/components/world/StatRollup';
import About from '@/components/About';
import StakeholderMap from '@/components/world/StakeholderMap';
import CareerArc from '@/components/world/CareerArc';
import PlatformBand from '@/components/world/PlatformBand';
import Timeline from '@/components/world/Timeline';
import ContactStrip from '@/components/world/ContactStrip';
import { worldById } from '@/lib/worlds';
import { profile } from '@/lib/data';

const world = worldById('strategist')!;

export const metadata: Metadata = {
  title: `${profile.name} — ${world.name}`,
  description: world.hero.sub,
  alternates: { canonical: `${profile.siteUrl}/strategist` }
};

export default function StrategistWorld() {
  return (
    <WorldShell worldId="strategist">
      <WorldHero worldId="strategist" />
      <StatRollup />
      <About />
      <PlatformBand />
      <StakeholderMap />
      <CareerArc />
      <Timeline />
      <ContactStrip />
    </WorldShell>
  );
}
