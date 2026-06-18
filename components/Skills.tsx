'use client';

import { motion } from 'framer-motion';
import { Wrench, Sparkles } from 'lucide-react';
import { skills } from '@/lib/data';

export default function Skills() {
  const stacks = [
    { ...skills.jobStack, icon: Wrench, accentClass: 'from-accent to-accent2' },
    { ...skills.personalStack, icon: Sparkles, accentClass: 'from-accent3 to-accent' }
  ] as const;

  return (
    <section id="skills" className="section">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 max-w-2xl"
      >
        <span className="section-eyebrow">
          <Wrench className="h-3 w-3" /> Skills
        </span>
        <h2 className="heading">
          What I <span className="text-gradient">ship</span> &amp; what I&apos;m{' '}
          <span className="text-gradient">studying</span>.
        </h2>
        <p className="mt-4 text-base text-muted sm:text-lg">
          Honest split: production-tested stack on the left, side-quest stack on the right.
          The list on the right is where I spend my evenings.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {stacks.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8"
            >
              {/* Header */}
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="grid h-9 w-9 place-items-center rounded-xl text-white"
                      style={{
                        background:
                          idx === 0
                            ? 'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-2)))'
                            : 'linear-gradient(135deg, rgb(var(--accent-3)), rgb(var(--accent)))'
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-display text-xl font-semibold sm:text-2xl">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-muted">{s.subtitle}</p>
                </div>
              </div>

              {/* Groups */}
              <div className="space-y-5">
                {s.groups.map((g) => (
                  <div key={g.name}>
                    <div className="mb-2.5 flex items-center gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                        {g.name}
                      </span>
                      <span
                        className="h-px flex-1"
                        style={{
                          background:
                            'linear-gradient(90deg, rgb(var(--border)), transparent)'
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map((item) => (
                        <span
                          key={item}
                          className="chip transition-colors hover:border-accent/50 hover:text-fg"
                          data-cursor="hover"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative corner */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-30 blur-3xl"
                style={{
                  background:
                    idx === 0
                      ? 'rgb(var(--accent))'
                      : 'rgb(var(--accent-3))'
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
