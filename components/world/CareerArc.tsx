'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * CareerArc — the Strategist world's growth narrative.
 * Shows the real trajectory: Intern → Jr Dev → Software Developer C → (next).
 * The "What's Next" fork is styled as an aspiration, not a claim.
 */

const PHASES = [
  {
    label: 'Intern',
    period: 'Jan – Jun 2022',
    company: 'Samarth eGov',
    wins: ['Built first PHP/Yii2 backend modules', 'Optimised SQL → ~30% API speedup', 'Learned the Samarth platform from the inside'],
    current: false,
    future: false
  },
  {
    label: 'Junior Software Developer',
    period: 'Jan 2023 – Jan 2025',
    company: 'Samarth eGov × Ministry of Education',
    wins: [
      'Built MPDD end-to-end: FIFO inventory, 11-state allocation engine, procurement pipeline',
      'Built Estate: hierarchical asset register, ARMO civil works, D3 analytics',
      'Built eHousing: cross-module integration composing Estate + Employee data',
      'Designed multi-tenant foundation — zero cross-institution leakage',
      'Led v1→v2 re-architecture across modules'
    ],
    current: false,
    future: false
  },
  {
    label: 'Software Developer C',
    period: 'Jan 2025 – Present',
    company: 'Samarth eGov × Ministry of Education',
    wins: [
      'Promoted — a title that still undersells the scope',
      'Sole architect on 4 of 20+ platform modules',
      'Built Affiliation auto fee & billing engine + streaming export queue',
      'Translating Ministry mandates directly to production systems',
      'Setting architecture & documentation standards across the team'
    ],
    current: true,
    future: false
  },
  {
    label: 'What\'s Next',
    period: 'Open to opportunities',
    company: '',
    wins: [],
    current: false,
    future: true
  }
];

const NEXT_ROLES = [
  {
    title: 'Product Manager',
    body: '3.5 years at the intersection of user needs, engineering trade-offs, and real deployment. I\'ve been the unofficial PM on every module I built — now I want the title.',
    icon: '📋'
  },
  {
    title: 'Solutions Architect',
    body: 'Already doing it. Multi-tenant design, state machines, cross-module composition, national-scale data models — I want to formalise what I\'ve been building.',
    icon: '🏗️'
  },
  {
    title: 'Gen AI Engineer',
    body: 'Beginner — completely fine with that. I learn by building and breaking. Already shipped a multi-modal evidence review system. Eat, sleep, build, repeat.',
    icon: '🤖'
  }
];

export default function CareerArc() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="section-eyebrow">The arc</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Where I&apos;ve been. Where I&apos;m going.
      </h2>
      <p className="mt-4 max-w-2xl text-muted">
        Two promotions in 3.5 years — not by waiting, by building things that matter at national scale.
        The next step isn&apos;t a secret.
      </p>

      {/* Timeline arc */}
      <div className="relative mt-12">
        {/* connector spine */}
        <div
          className="absolute left-5 top-6 hidden h-[calc(100%-3rem)] w-px sm:block"
          style={{ background: 'linear-gradient(to bottom, rgb(var(--accent) / 0.6), rgb(var(--accent) / 0.1) 85%, transparent)' }}
          aria-hidden
        />

        <div className="space-y-5 sm:pl-14">
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.label}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-2xl p-5 sm:p-6 ${
                phase.future
                  ? 'border-dashed'
                  : phase.current
                  ? 'glass-strong'
                  : 'glass'
              }`}
              style={
                phase.future
                  ? { border: '1.5px dashed rgb(var(--accent) / 0.35)', background: 'rgb(var(--accent) / 0.04)' }
                  : phase.current
                  ? { border: '1.5px solid rgb(var(--accent) / 0.5)' }
                  : {}
              }
            >
              {/* node dot on spine (hidden on mobile) */}
              <span
                className="absolute -left-[2.85rem] top-6 hidden h-4 w-4 rounded-full border-2 sm:block"
                style={{
                  background: phase.current ? 'rgb(var(--accent))' : phase.future ? 'transparent' : 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--accent))',
                  borderStyle: phase.future ? 'dashed' : 'solid'
                }}
              />

              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3
                      className="font-display text-lg font-semibold sm:text-xl"
                      style={phase.current ? { color: 'rgb(var(--accent))' } : {}}
                    >
                      {phase.label}
                    </h3>
                    {phase.current && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                        style={{ background: 'rgb(var(--accent) / 0.15)', color: 'rgb(var(--accent))' }}
                      >
                        now
                      </span>
                    )}
                    {phase.future && (
                      <Sparkles className="h-4 w-4" style={{ color: 'rgb(var(--accent))' }} />
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted">
                    {phase.period}{phase.company ? ` · ${phase.company}` : ''}
                  </p>
                </div>
              </div>

              {phase.wins.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {phase.wins.map((w) => (
                    <li key={w} className="flex items-start gap-2 text-sm text-muted">
                      <ArrowRight
                        className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                        style={{ color: 'rgb(var(--accent) / 0.7)' }}
                      />
                      {w}
                    </li>
                  ))}
                </ul>
              )}

              {/* Future fork — the 3 target roles */}
              {phase.future && (
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {NEXT_ROLES.map((r, ri) => (
                    <motion.div
                      key={r.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.55 + ri * 0.1, duration: 0.45 }}
                      className="rounded-xl border p-4"
                      style={{ borderColor: 'rgb(var(--accent) / 0.25)', background: 'rgb(var(--surface) / 0.6)' }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{r.icon}</span>
                        <span className="font-display text-sm font-semibold">{r.title}</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted">{r.body}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
