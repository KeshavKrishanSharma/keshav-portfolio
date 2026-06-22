import { ImageResponse } from 'next/og';
import { profile } from '@/lib/data';

export const runtime = 'edge';

export const alt = `${profile.name} — Solutions Architect & Technical Lead`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Auto-generated social share image (no static og.png file required).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #0b0e14 0%, #1b1240 55%, #3a1340 100%)',
          color: '#fafaf7',
          fontFamily: 'sans-serif'
        }}
      >
        {/* Top accent bar (Satori-safe linear gradient) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: 'linear-gradient(90deg, #6d5ef8, #db2777, #22d3ee)'
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #6d5ef8, #db2777)'
            }}
          >
            KK
          </div>
          <div style={{ fontSize: 26, color: '#b9b9d0', letterSpacing: 2 }}>
            PORTFOLIO
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              background: 'linear-gradient(90deg, #818cf8, #f472b6, #22d3ee)',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Solutions Architect · Technical Lead
          </div>
          <div style={{ fontSize: 26, color: '#b9b9d0', maxWidth: 900, marginTop: 8 }}>
            Multi-tenant, audit-grade enterprise platforms — from database schema to React UI.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, fontSize: 22, color: '#9a9ab8' }}>
          <span>Yii2</span><span>·</span>
          <span>React / TypeScript</span><span>·</span>
          <span>Multi-tenant SaaS</span><span>·</span>
          <span>RBAC</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
