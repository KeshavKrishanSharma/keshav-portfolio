'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/**
 * PlatformBand — the scale of the Samarth platform Keshav contributes to.
 * A dark full-bleed strip with 4 count-up stats and the 4 payment gateway chips.
 * Used in both the Engineer and Strategist worlds.
 */

const STATS = [
  { value: 20, suffix: '+', label: 'Modules on the platform', sub: 'affiliation · mpdd · estate · ehousing · payroll · hostel · …' },
  { value: 4, suffix: '', label: 'Payment gateways integrated', sub: 'Razorpay · SBI Collect · PayGov · GETEPAY' },
  { value: 2, suffix: 'M+', label: 'Records under management', sub: 'universities · applications · allocations · assets' },
  { value: 100, suffix: '+', label: 'Universities on the platform', sub: 'Ministry of Education · national scale' }
];

function CountUp({ value, suffix, run }: { value: number; suffix: string; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const dur = 1000;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return <>{n}{suffix}</>;
}

export default function PlatformBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'rgb(var(--surface) / 0.6)' }}
    >
      {/* accent line top */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgb(var(--accent) / 0.4), transparent)' }}
      />

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono-tight text-xs uppercase tracking-[0.2em]"
          style={{ color: 'rgb(var(--accent))' }}
        >
          {'// the platform · samarth eGov × Ministry of Education'}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2 max-w-2xl text-sm text-muted"
        >
          Keshav contributes 4 modules to a 20+ module national platform. Here&apos;s the scale of what those modules run inside.
        </motion.p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl px-5 py-5"
            >
              <div
                className="font-display text-4xl font-bold tabular-nums sm:text-5xl"
                style={{ color: 'rgb(var(--accent))' }}
              >
                <CountUp value={s.value} suffix={s.suffix} run={inView} />
              </div>
              <div className="mt-1.5 text-sm font-medium text-fg/90">{s.label}</div>
              <div className="mt-1 text-[11px] leading-snug text-muted">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Gateway chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-6 flex flex-wrap items-center gap-2"
        >
          <span className="text-xs text-muted">Payment gateways:</span>
          {['Razorpay', 'SBI Collect', 'PayGov', 'GETEPAY'].map((g) => (
            <span
              key={g}
              className="rounded-full border px-3 py-1 text-xs font-medium"
              style={{
                borderColor: 'rgb(var(--accent) / 0.3)',
                color: 'rgb(var(--accent))',
                background: 'rgb(var(--accent) / 0.06)'
              }}
            >
              {g}
            </span>
          ))}
        </motion.div>
      </div>

      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgb(var(--accent) / 0.4), transparent)' }}
      />
    </section>
  );
}
