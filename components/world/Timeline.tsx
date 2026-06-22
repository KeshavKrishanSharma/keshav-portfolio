'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { experience, education } from '@/lib/data';

/**
 * Timeline — the Strategist world's career narrative. A single vertical spine
 * with experience entries (newest first) and education at the base. Each entry
 * reveals on scroll. Theme-aware via CSS vars.
 */

type Entry = {
  period: string;
  title: string;
  org: string;
  bullets: string[];
  icon: 'work' | 'edu';
};

const entries: Entry[] = [
  ...experience.map((e) => ({
    period: e.period,
    title: e.role,
    org: e.company,
    bullets: e.bullets,
    icon: 'work' as const
  })),
  {
    period: education.period,
    title: education.degree,
    org: `${education.school} · ${education.result}`,
    bullets: [],
    icon: 'edu' as const
  }
];

export default function Timeline() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="section-eyebrow">The path</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Career timeline
      </h2>

      <div className="relative mt-10 pl-8 sm:pl-10">
        {/* spine */}
        <span
          className="absolute bottom-2 left-[11px] top-2 w-px sm:left-[15px]"
          style={{ background: 'rgb(var(--border))' }}
          aria-hidden
        />

        <div className="space-y-10">
          {entries.map((e, i) => (
            <motion.div
              key={`${e.org}-${e.period}`}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* node */}
              <span
                className="absolute -left-8 top-1 grid h-6 w-6 place-items-center rounded-full sm:-left-10"
                style={{
                  background: 'rgb(var(--surface))',
                  border: '2px solid rgb(var(--accent))',
                  color: 'rgb(var(--accent))'
                }}
              >
                {e.icon === 'work' ? (
                  <Briefcase className="h-3 w-3" />
                ) : (
                  <GraduationCap className="h-3 w-3" />
                )}
              </span>

              <span
                className="font-mono-tight text-xs uppercase tracking-[0.16em]"
                style={{ color: 'rgb(var(--accent))' }}
              >
                {e.period}
              </span>
              <h3 className="mt-1 font-display text-lg font-semibold leading-snug sm:text-xl">
                {e.title}
              </h3>
              <p className="mt-0.5 text-sm text-muted">{e.org}</p>

              {e.bullets.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ background: 'rgb(var(--accent) / 0.7)' }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
