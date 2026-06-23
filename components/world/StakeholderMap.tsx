'use client';

import { motion } from 'framer-motion';
import { profile } from '@/lib/data';
import { SectionHeading, Parallax } from '@/components/Reveal';

/**
 * StakeholderMap — the Strategist world's "who I work across" graph.
 * Keshav's real portrait sits at the centre of the network; the partners he
 * delivers across orbit around it. Pure SVG, theme-aware, reveals on scroll.
 */

type Partner = { label: string; sub: string; x: number; y: number };

const CENTER = { x: 420, y: 235 };

const PARTNERS: Partner[] = [
  { label: 'Ministry of Education', sub: 'mandate & policy', x: 420, y: 55 },
  { label: '100+ Universities', sub: 'end users & rollout', x: 720, y: 180 },
  { label: 'Regulators', sub: 'compliance & audit', x: 660, y: 410 },
  { label: 'Engineering team', sub: 'mentored & led', x: 180, y: 410 },
  { label: 'University stakeholders', sub: 'requirement discovery', x: 120, y: 180 }
];

export default function StakeholderMap() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow="Who I deliver across"
        title="One architect, many stakeholders"
        blurb="I translate an ambiguous government mandate into shipped software — sitting between policy, regulators, institutions and the engineers who keep it all running."
      />

      <Parallax distance={28} className="glass-strong mt-8 overflow-hidden rounded-3xl p-3 sm:p-5">
        <svg
          viewBox="0 0 840 470"
          className="h-auto w-full"
          role="img"
          aria-label="Network graph: Keshav at the centre connected to the Ministry of Education, universities, regulators, stakeholders and the engineering team"
        >
          <defs>
            <clipPath id="portrait-clip">
              <circle cx={CENTER.x} cy={CENTER.y} r={54} />
            </clipPath>
          </defs>

          {/* edges */}
          {PARTNERS.map((p) => (
            <motion.line
              key={`edge-${p.label}`}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={p.x}
              y2={p.y}
              stroke="rgb(var(--accent))"
              strokeWidth={1.5}
              strokeOpacity={0.35}
              strokeDasharray="5 7"
              animate={{ strokeDashoffset: [0, -24] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            />
          ))}

          {/* centre — portrait */}
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={62}
            fill="rgb(var(--accent) / 0.1)"
            stroke="rgb(var(--accent) / 0.5)"
            strokeWidth={1.5}
          />
          <image
            href={profile.portrait}
            x={CENTER.x - 54}
            y={CENTER.y - 54}
            width={108}
            height={108}
            clipPath="url(#portrait-clip)"
            preserveAspectRatio="xMidYMid slice"
          />
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={54}
            fill="none"
            stroke="rgb(var(--accent))"
            strokeWidth={2.5}
          />
          <text
            x={CENTER.x}
            y={CENTER.y + 86}
            textAnchor="middle"
            className="font-display"
            fontSize="17"
            fontWeight="700"
            fill="rgb(var(--fg))"
          >
            {profile.shortName}
          </text>

          {/* partner nodes */}
          {PARTNERS.map((p) => (
            <g key={p.label}>
              <circle
                cx={p.x}
                cy={p.y}
                r={7}
                fill="rgb(var(--surface))"
                stroke="rgb(var(--accent))"
                strokeWidth={2.5}
              />
              <text
                x={p.x}
                y={p.y - 16}
                textAnchor="middle"
                className="font-display"
                fontSize="16"
                fontWeight="600"
                fill="rgb(var(--fg))"
              >
                {p.label}
              </text>
              <text
                x={p.x}
                y={p.y + 24}
                textAnchor="middle"
                fontSize="12"
                fill="rgb(var(--muted))"
              >
                {p.sub}
              </text>
            </g>
          ))}
        </svg>
      </Parallax>
    </section>
  );
}
