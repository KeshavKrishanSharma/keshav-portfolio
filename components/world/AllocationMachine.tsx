'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { architecture } from '@/lib/data';

/**
 * AllocationMachine — the signature Engineer-world piece.
 * Steps through the allocation lifecycle (architecture.workflow.states) on a
 * timer while in view, with an append-only "audit log" that writes a line per
 * transition. Pure SVG/DOM + Framer Motion; theme-aware via CSS vars. Honours
 * prefers-reduced-motion by jumping to the final state and full log.
 */
export default function AllocationMachine() {
  const { title, caption, states } = architecture.workflow;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-20% 0px' });
  const [active, setActive] = useState(0);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce.current) {
      setActive(states.length - 1);
      return;
    }
    if (!inView) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % states.length),
      1400
    );
    return () => clearInterval(id);
  }, [inView, states.length]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="font-mono-tight text-sm text-accent">{'// signature engine'}</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        The allocation state machine
      </h2>
      <p className="mt-4 max-w-2xl text-muted">{caption}</p>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong mt-8 grid gap-8 overflow-hidden rounded-3xl p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]"
      >
        {/* Flow */}
        <div>
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-semibold">{title}</h3>
            <span className="font-mono-tight text-[11px] uppercase tracking-[0.18em] text-muted">
              live workflow engine
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-y-3">
            {states.map((s, i) => {
              const on = i <= active;
              const isCurrent = i === active;
              return (
                <div key={s} className="flex items-center">
                  <div
                    className="relative rounded-xl border px-3 py-2 text-xs font-medium transition-all duration-500 sm:text-sm"
                    style={{
                      background: on
                        ? 'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-3)))'
                        : 'rgb(var(--surface) / 0.6)',
                      borderColor: on ? 'transparent' : 'rgb(var(--border))',
                      color: on ? '#06121a' : 'rgb(var(--muted))',
                      boxShadow: isCurrent
                        ? '0 0 0 4px rgb(var(--accent) / 0.18), 0 10px 30px -10px rgb(var(--accent) / 0.6)'
                        : 'none',
                      transform: isCurrent ? 'translateY(-2px) scale(1.04)' : 'none'
                    }}
                  >
                    {s}
                  </div>
                  {i < states.length - 1 && (
                    <ArrowRight
                      className="mx-1 h-4 w-4 flex-shrink-0 transition-colors duration-500 sm:mx-2"
                      style={{ color: i < active ? 'rgb(var(--accent))' : 'rgb(var(--border))' }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <ul className="mt-6 grid gap-2 text-sm text-muted sm:grid-cols-2">
            {[
              'Append-only status log — every transition is attributable',
              'Idempotent, time-boxed reservations (8h TTL)',
              'Atomic mutator — no double-allocation under load',
              'Safe on retries and double-clicks'
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span
                  className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ background: 'rgb(var(--accent))' }}
                />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Audit log */}
        <div className="rounded-2xl border border-border bg-surface/60 p-4 font-mono-tight text-[12px] leading-relaxed">
          <div className="mb-3 flex items-center gap-2 text-muted">
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="uppercase tracking-[0.16em]">audit_log.append</span>
          </div>
          <div className="space-y-1.5">
            {states.map((s, i) => {
              const written = i <= active;
              return (
                <div
                  key={s}
                  className="flex items-baseline gap-2 transition-opacity duration-500"
                  style={{ opacity: written ? 1 : 0.18 }}
                >
                  <span style={{ color: 'rgb(var(--accent-2))' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-muted">→</span>
                  <span className="text-fg">{s}</span>
                  {i === active && (
                    <span
                      className="ml-auto inline-block h-3 w-1.5 animate-pulse"
                      style={{ background: 'rgb(var(--accent))' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
