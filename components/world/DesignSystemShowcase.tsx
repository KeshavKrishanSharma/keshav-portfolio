'use client';

import { motion } from 'framer-motion';

/**
 * DesignSystemShowcase — the Designer world's "I think in systems, not screens"
 * panel. Renders live tokens (colour, type scale, radius) straight from the
 * world's CSS variables, so it always matches the active persona theme.
 */

const SWATCHES = [
  { name: 'Accent', var: '--accent' },
  { name: 'Secondary', var: '--accent-2' },
  { name: 'Tertiary', var: '--accent-3' },
  { name: 'Surface', var: '--surface' },
  { name: 'Foreground', var: '--fg' }
];

const TYPE = [
  { label: 'Display / 48', cls: 'text-5xl font-bold tracking-tight', sample: 'Aa' },
  { label: 'Heading / 30', cls: 'text-3xl font-semibold tracking-tight', sample: 'Clarity' },
  { label: 'Body / 16', cls: 'text-base', sample: 'Readable at a desk, not a demo.' },
  { label: 'Caption / 12', cls: 'text-xs uppercase tracking-[0.18em] text-muted', sample: 'Operator-first' }
];

export default function DesignSystemShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="section-eyebrow">The system behind the screens</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Design tokens, not one-off styling
      </h2>
      <p className="mt-4 max-w-2xl text-muted">
        Colour, type and shape live as tokens so every screen stays consistent
        and themeable — the same discipline powering this site&apos;s three worlds.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 grid gap-5 lg:grid-cols-3"
      >
        {/* Colour */}
        <div className="glass-strong rounded-3xl p-6">
          <h3 className="font-display text-lg font-semibold">Colour</h3>
          <div className="mt-4 space-y-2.5">
            {SWATCHES.map((s) => (
              <div key={s.var} className="flex items-center gap-3">
                <span
                  className="h-8 w-8 flex-shrink-0 rounded-lg border border-border"
                  style={{ background: `rgb(var(${s.var}))` }}
                />
                <div className="min-w-0">
                  <div className="text-sm text-fg">{s.name}</div>
                  <div className="font-mono-tight text-[11px] text-muted">{s.var}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Type */}
        <div className="glass-strong rounded-3xl p-6">
          <h3 className="font-display text-lg font-semibold">Type scale</h3>
          <div className="mt-4 space-y-4">
            {TYPE.map((t) => (
              <div key={t.label}>
                <div className="text-[11px] uppercase tracking-[0.14em] text-muted">
                  {t.label}
                </div>
                <div className={`mt-0.5 font-display ${t.cls}`}>{t.sample}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Shape & components */}
        <div className="glass-strong rounded-3xl p-6">
          <h3 className="font-display text-lg font-semibold">Shape &amp; components</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-end gap-3">
              {[8, 14, 22].map((r) => (
                <div key={r} className="text-center">
                  <span
                    className="block h-12 w-12 border-2"
                    style={{
                      borderRadius: r,
                      borderColor: 'rgb(var(--accent))',
                      background: 'rgb(var(--accent) / 0.1)'
                    }}
                  />
                  <span className="mt-1 block font-mono-tight text-[11px] text-muted">
                    {r}px
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <span
                className="rounded-full px-4 py-2 text-xs font-semibold text-white"
                style={{ background: 'rgb(var(--accent))' }}
              >
                Primary
              </span>
              <span className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted">
                Secondary
              </span>
              <span
                className="rounded-full px-3 py-2 text-xs font-medium"
                style={{
                  background: 'rgb(var(--accent) / 0.12)',
                  color: 'rgb(var(--accent))'
                }}
              >
                Chip
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
