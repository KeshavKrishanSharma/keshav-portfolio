'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Network, ArrowRight } from 'lucide-react';
import { architecture } from '@/lib/data';

export default function Architecture() {
  return (
    <section id="architecture" className="section">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 max-w-2xl"
      >
        <span className="section-eyebrow">
          <Network className="h-3 w-3" /> Architecture &amp; Engineering
        </span>
        <h2 className="heading">
          How I think about <span className="text-gradient">systems</span>.
        </h2>
        <p className="mt-4 text-base text-muted sm:text-lg">
          The principles behind every module I build — the difference between code that
          works once and a platform that holds up at national scale.
        </p>
      </motion.div>

      {/* Principles grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {architecture.principles.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="glass group relative overflow-hidden rounded-3xl p-6 transition-all hover:-translate-y-1 hover:border-accent/40"
            data-cursor="hover"
          >
            <div className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</div>
            <h3 className="mt-2 font-display text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
          </motion.div>
        ))}
      </div>

      {/* Signature: allocation state machine */}
      <StateMachine />
    </section>
  );
}

/* ============================================================
   Animated workflow — steps through the lifecycle on a timer
   ============================================================ */
function StateMachine() {
  const { title, caption, states } = architecture.workflow;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-20% 0px' });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setActive(states.length - 1);
      return;
    }
    if (!inView) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % states.length),
      1100
    );
    return () => clearInterval(id);
  }, [inView, states.length]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass mt-6 overflow-hidden rounded-3xl p-6 sm:p-8"
    >
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          live workflow engine
        </span>
      </div>

      {/* Flow */}
      <div className="flex flex-wrap items-center gap-y-3">
        {states.map((s, i) => {
          const on = i <= active;
          const isCurrent = i === active;
          return (
            <div key={s} className="flex items-center">
              <div
                className={`relative rounded-xl border px-3 py-2 text-xs font-medium transition-all duration-500 sm:text-sm ${
                  on ? 'text-white' : 'text-muted'
                }`}
                style={{
                  background: on
                    ? 'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-3)))'
                    : 'rgb(var(--surface) / 0.6)',
                  borderColor: on ? 'transparent' : 'rgb(var(--border))',
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
                  className={`mx-1 h-4 w-4 flex-shrink-0 transition-colors duration-500 sm:mx-2 ${
                    i < active ? 'text-accent' : 'text-border'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-muted">{caption}</p>
    </motion.div>
  );
}
