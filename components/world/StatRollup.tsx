'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { worldById } from '@/lib/worlds';

/**
 * StatRollup — the Strategist world's proof points, counting up when scrolled
 * into view. Parses each value into prefix / number / suffix so "100+", "45%"
 * and "4+" all animate the numeric part while keeping their decoration.
 * Respects prefers-reduced-motion (renders final values immediately).
 */
function parse(value: string) {
  const m = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { prefix: value, target: null as number | null, suffix: '' };
  return { prefix: m[1], target: parseFloat(m[2]), suffix: m[3] };
}

function Counter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const { prefix, target, suffix } = parse(value);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (target === null) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setN(target);
      return;
    }
    if (!inView) return;
    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  const display =
    target === null
      ? value
      : `${prefix}${Number.isInteger(target) ? Math.round(n) : n.toFixed(0)}${suffix}`;

  return (
    <div
      ref={ref}
      className="glass-strong rounded-3xl px-6 py-8 text-center"
    >
      <div
        className="font-display text-5xl font-bold tracking-tight tabular-nums sm:text-6xl"
        style={{ color: 'rgb(var(--accent))' }}
      >
        {display}
      </div>
      <div className="mt-3 text-sm text-muted">{label}</div>
    </div>
  );
}

export default function StatRollup() {
  const world = worldById('strategist')!;
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="section-eyebrow">Impact in numbers</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Outcomes, not output
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
        {world.proof.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Counter value={p.value} label={p.label} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
