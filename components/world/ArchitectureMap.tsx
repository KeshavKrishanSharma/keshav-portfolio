'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ArchitectureMap — interactive system diagram for the Engineer world.
 * Four enterprise modules orbit a shared "Samarth platform" core; selecting a
 * node highlights its link to the core and reveals what it adds on top of the
 * shared foundation (multi-tenant · RBAC · audit log · rule engine).
 * Pure inline SVG, theme-aware via CSS vars, keyboard-operable.
 */

type Node = {
  id: string;
  name: string;
  blurb: string;
  // position on the 1000×620 viewBox
  x: number;
  y: number;
};

const NODES: Node[] = [
  {
    id: 'mpdd',
    name: 'MPDD',
    blurb:
      'Material distribution: FIFO inventory with a 4-bucket stock invariant and an 11-state allocation engine.',
    x: 250,
    y: 130
  },
  {
    id: 'affiliation',
    name: 'Affiliation',
    blurb:
      'Regulatory compliance: per-institution rule engine driving multi-stage, fully audited approval workflows.',
    x: 750,
    y: 130
  },
  {
    id: 'estate',
    name: 'Estate',
    blurb:
      'Resource management: a central registry with availability windows and conflict detection at allocation time.',
    x: 250,
    y: 490
  },
  {
    id: 'residence',
    name: 'Residence',
    blurb:
      'Housing allocation: configurable eligibility schemes and a bulk, session-aware, auditable assignment engine.',
    x: 750,
    y: 490
  }
];

const FOUNDATION = ['Multi-tenant', 'RBAC', 'Audit log', 'Rule engine'];
const CORE = { x: 500, y: 310 };

export default function ArchitectureMap() {
  const [active, setActive] = useState<string | null>(null);
  const current = NODES.find((n) => n.id === active);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="font-mono-tight text-sm text-accent">{'// one platform, four modules'}</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Architecture map
      </h2>
      <p className="mt-4 max-w-2xl text-muted">
        Four modules, built largely from scratch, sharing one multi-tenant core.
        Hover or tap a module to see what it adds on top of the foundation.
      </p>

      <div className="glass-strong mt-8 overflow-hidden rounded-3xl p-3 sm:p-5">
        <svg
          viewBox="0 0 1000 620"
          className="h-auto w-full"
          role="img"
          aria-label="System diagram: MPDD, Affiliation, Estate and Residence modules around a shared Samarth platform core"
        >
          {/* Connectors */}
          {NODES.map((n) => {
            const on = active === n.id;
            return (
              <motion.line
                key={`link-${n.id}`}
                x1={CORE.x}
                y1={CORE.y}
                x2={n.x}
                y2={n.y}
                stroke="rgb(var(--accent))"
                strokeWidth={on ? 3 : 1.5}
                strokeOpacity={active ? (on ? 0.9 : 0.15) : 0.4}
                strokeDasharray="6 7"
                animate={{ strokeDashoffset: [0, -26] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
              />
            );
          })}

          {/* Core */}
          <g>
            <circle
              cx={CORE.x}
              cy={CORE.y}
              r={108}
              fill="rgb(var(--accent) / 0.08)"
              stroke="rgb(var(--accent) / 0.5)"
              strokeWidth={1.5}
            />
            <circle
              cx={CORE.x}
              cy={CORE.y}
              r={78}
              fill="rgb(var(--surface))"
              stroke="rgb(var(--accent))"
              strokeWidth={2}
            />
            <text
              x={CORE.x}
              y={CORE.y - 8}
              textAnchor="middle"
              className="font-display"
              fontSize="22"
              fontWeight="700"
              fill="rgb(var(--fg))"
            >
              Samarth
            </text>
            <text
              x={CORE.x}
              y={CORE.y + 16}
              textAnchor="middle"
              fontSize="13"
              fill="rgb(var(--muted))"
            >
              shared platform
            </text>
          </g>

          {/* Module nodes */}
          {NODES.map((n) => {
            const on = active === n.id;
            return (
              <g
                key={n.id}
                tabIndex={0}
                role="button"
                aria-label={`${n.name} module`}
                aria-pressed={on}
                style={{ cursor: 'pointer', outline: 'none' }}
                onMouseEnter={() => setActive(n.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(n.id)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(on ? null : n.id)}
              >
                <motion.rect
                  x={n.x - 110}
                  y={n.y - 42}
                  width={220}
                  height={84}
                  rx={18}
                  fill="rgb(var(--surface))"
                  stroke={on ? 'rgb(var(--accent))' : 'rgb(var(--border))'}
                  strokeWidth={on ? 2.5 : 1.5}
                  animate={{ scale: on ? 1.04 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                />
                <text
                  x={n.x}
                  y={n.y - 6}
                  textAnchor="middle"
                  className="font-display"
                  fontSize="20"
                  fontWeight="700"
                  fill="rgb(var(--fg))"
                >
                  {n.name}
                </text>
                <text
                  x={n.x}
                  y={n.y + 18}
                  textAnchor="middle"
                  fontSize="12"
                  fill={on ? 'rgb(var(--accent))' : 'rgb(var(--muted))'}
                >
                  {on ? 'selected' : 'enterprise module'}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Foundation chips + detail */}
        <div className="grid gap-4 border-t border-border px-2 pt-5 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-6">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs uppercase tracking-[0.16em] text-muted">Foundation</span>
            {FOUNDATION.map((f) => (
              <span
                key={f}
                className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                style={{
                  background: 'rgb(var(--accent) / 0.12)',
                  border: '1px solid rgb(var(--accent) / 0.35)',
                  color: 'rgb(var(--accent))'
                }}
              >
                {f}
              </span>
            ))}
          </div>
          <p className="min-h-[2.5rem] text-sm text-muted">
            {current ? (
              <>
                <span className="font-semibold text-fg">{current.name} — </span>
                {current.blurb}
              </>
            ) : (
              'Every module inherits the foundation, then layers its own domain logic on top — one codebase, many institutions.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
