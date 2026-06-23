'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skills } from '@/lib/data';

/**
 * TechStack — Engineer world's skills grid.
 * Shows job-stack groups (what ships to production) then the learning frontier.
 */
export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="font-mono-tight text-sm" style={{ color: 'rgb(var(--accent))' }}>
        {'// stack · what I ship'}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {skills.jobStack.title}
      </h2>
      <p className="mt-2 text-sm text-muted">{skills.jobStack.subtitle}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.jobStack.groups.map((group, gi) => (
          <motion.div
            key={group.name}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 + gi * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-2xl p-5"
          >
            <p
              className="mb-3 font-mono-tight text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: 'rgb(var(--accent))' }}
            >
              {group.name}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border px-2.5 py-1 text-xs font-medium"
                  style={{
                    borderColor: 'rgb(var(--border))',
                    background: 'rgb(var(--surface) / 0.7)',
                    color: 'rgb(var(--fg))'
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Learning frontier */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 rounded-2xl border border-dashed p-5"
        style={{ borderColor: 'rgb(var(--accent) / 0.35)', background: 'rgb(var(--accent) / 0.04)' }}
      >
        <p
          className="mb-3 font-mono-tight text-[10px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: 'rgb(var(--accent))' }}
        >
          {skills.personalStack.title} — {skills.personalStack.subtitle}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {skills.personalStack.groups.flatMap((g) => g.items).map((item) => (
            <span
              key={item}
              className="rounded-full px-2.5 py-1 text-xs font-medium"
              style={{
                background: 'rgb(var(--accent) / 0.12)',
                color: 'rgb(var(--accent))',
                border: '1px solid rgb(var(--accent) / 0.25)'
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
