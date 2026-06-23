'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skills } from '@/lib/data';
import { SectionHeading, Stagger, StaggerItem } from '@/components/Reveal';

/**
 * TechStack — Engineer world's skills grid.
 * Shows job-stack groups (what ships to production) then the learning frontier.
 */
export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow={'// stack · what I ship'}
        eyebrowClassName="font-mono-tight text-sm text-accent"
        title={skills.jobStack.title}
        blurb={skills.jobStack.subtitle}
        blurbClassName="mt-2 text-sm text-muted"
      />

      <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {skills.jobStack.groups.map((group) => (
          <StaggerItem key={group.name} className="glass rounded-2xl p-5">
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
          </StaggerItem>
        ))}
      </Stagger>

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
