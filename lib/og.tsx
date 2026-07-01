import { ImageResponse } from 'next/og';
import { worldById, type WorldId } from '@/lib/worlds';
import { profile } from '@/lib/data';

// Per-world OG palette (mirrors the [data-world] CSS themes, but as flat hex
// because Satori has no CSS variables). Each world's share card is recoloured
// to its own world so a link to /engineer previews differently from /designer.
const PALETTE: Record<
  WorldId,
  { bg: string; fg: string; sub: string; accent: string; chip: string }
> = {
  engineer: {
    bg: 'linear-gradient(135deg, #070a0e 0%, #0c1a16 60%, #0a1420 100%)',
    fg: '#def0ea',
    sub: '#7a8e96',
    accent: '#34d399',
    chip: 'rgba(52,211,153,0.14)'
  },
  strategist: {
    bg: 'linear-gradient(135deg, #090e1c 0%, #101a32 60%, #0c1430 100%)',
    fg: '#eceffa',
    sub: '#96a2c0',
    accent: '#d4af5f',
    chip: 'rgba(212,175,95,0.16)'
  },
  designer: {
    bg: 'linear-gradient(135deg, #fdf6ee 0%, #fdeee4 55%, #fbe7ec 100%)',
    fg: '#2a1d18',
    sub: '#7e6a60',
    accent: '#f47250',
    chip: 'rgba(244,114,80,0.14)'
  },
  lab: {
    bg: 'linear-gradient(135deg, #0a0814 0%, #16112b 60%, #0d1a2b 100%)',
    fg: '#ece9f7',
    sub: '#9791b8',
    accent: '#a78bfa',
    chip: 'rgba(167,139,250,0.16)'
  }
};

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

export function worldOgAlt(worldId: WorldId) {
  const w = worldById(worldId)!;
  return `${profile.name} — ${w.name}`;
}

export function buildWorldOg(worldId: WorldId) {
  const w = worldById(worldId)!;
  const p = PALETTE[worldId];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: p.bg,
          color: p.fg,
          fontFamily: 'sans-serif'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: p.accent
          }}
        />

        {/* Top row: monogram + persona label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
              color: '#fff',
              background: p.accent
            }}
          >
            KKS
          </div>
          <div style={{ fontSize: 26, color: p.sub, letterSpacing: 3 }}>
            {w.name.toUpperCase()}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 30, fontWeight: 600, color: p.accent }}>
            {profile.name}
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 1000
            }}
          >
            {w.hero.headline}
          </div>
        </div>

        {/* Proof chips */}
        <div style={{ display: 'flex', gap: 16 }}>
          {w.proof.map((pr) => (
            <div
              key={pr.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                padding: '18px 24px',
                borderRadius: 16,
                background: p.chip,
                border: `1px solid ${p.accent}55`
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 800, color: p.accent }}>
                {pr.value}
              </div>
              <div style={{ fontSize: 20, color: p.sub }}>{pr.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
