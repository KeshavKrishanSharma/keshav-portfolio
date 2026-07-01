import { buildWorldOg, worldOgAlt, ogSize, ogContentType } from '@/lib/og';

export const runtime = 'edge';
export const alt = worldOgAlt('lab');
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildWorldOg('lab');
}
