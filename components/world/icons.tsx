// components/world/icons.tsx — SVG icons for each persona world.
// Replaces emoji glyphs (🛠️ 📊 🎨) per the design review: emojis render
// inconsistently across platforms and can't be themed via CSS. Lucide icons
// inherit `currentColor`, so they recolour with each world's accent for free.

import { Blocks, LineChart, Palette, Bot, type LucideIcon } from 'lucide-react';
import type { WorldId } from '@/lib/worlds';

export const worldIcon: Record<WorldId, LucideIcon> = {
  engineer: Blocks,
  strategist: LineChart,
  designer: Palette,
  lab: Bot
};
