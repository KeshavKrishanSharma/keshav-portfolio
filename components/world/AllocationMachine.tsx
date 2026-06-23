'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { architecture } from '@/lib/data';
import { SectionHeading } from '@/components/Reveal';

/**
 * AllocationMachine — the signature Engineer-world piece.
 * Scroll-scrubbed: the section is pinned and you step through the allocation
 * lifecycle (architecture.workflow.states) by scrolling, with an append-only
 * "audit log" that writes a line per transition. Honours prefers-reduced-motion
 * by skipping the pin and showing the final state + full log.
 */
export default function AllocationMachine() {
  const { title, caption, states } = architecture.workflow;
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduce) return;
    const idx = Math.min(states.length - 1, Math.max(0, Math.floor(v * states.length)));
    setActive(idx);
  });

  // Under reduced motion, jump straight to the resolved end state.
  const current = reduce ? states.length - 1 : active;

  return (
    <section
      ref={wrapRef}
      data-no-dim
      className="relative"
      style={reduce ? undefined : { height: `${states.length * 42}vh` }}
    >
      <div className={reduce ? '' : 'sticky top-0 flex min-h-screen flex-col justify-center'}>
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
          <SectionHeading
            eyebrow={'// signature engine'}
            eyebrowClassName="font-mono-tight text-sm text-accent"
            title="The allocation state machine"
            blurb={caption}
          />

          <div className="glass-strong mt-8 grid gap-8 overflow-hidden rounded-3xl p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
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
                  const on = i <= current;
                  const isCurrent = i === current;
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
                          style={{ color: i < current ? 'rgb(var(--accent))' : 'rgb(var(--border))' }}
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
                  const written = i <= current;
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
                      {i === current && (
                        <motion.span
                          className="ml-auto inline-block h-3 w-1.5"
                          style={{ background: 'rgb(var(--accent))' }}
                          animate={{ opacity: [1, 0.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {!reduce && (
            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="flex gap-1.5">
                {states.map((s, i) => (
                  <span
                    key={s}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? 18 : 6,
                      background: i <= current ? 'rgb(var(--accent))' : 'rgb(var(--border))'
                    }}
                  />
                ))}
              </div>
              <span className="font-mono-tight text-[11px] uppercase tracking-[0.18em] text-muted">
                scroll to step ▾
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
