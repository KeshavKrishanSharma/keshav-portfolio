'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * DesignProcess — the Designer world's "how I work" section.
 * Four phases, each with a real example from the enterprise modules.
 * No stock-art fluffy UX process — grounded in actual operator-context design.
 */

const PHASES = [
  {
    num: '01',
    title: 'Shadow the operator',
    principle: 'Before opening a design tool, I sit with the people using the system.',
    example:
      'For MPDD, I paired with store-room staff during a high-volume allocation week — 200+ daily issues. They were using 12 clicks per allocation and reading jargon (DB field names, not what they call things). That discovery drove the entire v2 UX.',
    tag: 'Discover'
  },
  {
    num: '02',
    title: 'Map the model to the mental model',
    principle: 'What the schema calls it and what the user calls it are usually different. Both need to be correct.',
    example:
      'The Estate module has a strict hierarchy: building→floor→room. University admins call them "blocks", "levels", and "units". The DB stays normalised; the UI speaks their language. I maintain both in the same component layer.',
    tag: 'Define'
  },
  {
    num: '03',
    title: 'Design for real constraints',
    principle: 'Minimum 15px type. Drawer-based CRUD. Errors that say what to do, not just what went wrong.',
    example:
      'For Affiliation\'s bulk import, the original design showed a generic "row 47 failed" message. I redesigned it to show the exact column, the value, and the fix (e.g. "Programme code \'CS-01\' not found — check your masters list"). Support tickets dropped visibly.',
    tag: 'Design'
  },
  {
    num: '04',
    title: 'Measure by adoption, not screenshots',
    principle: 'The test is: can a non-technical operator finish the task without asking anyone?',
    example:
      'For the eHousing module, the success metric was zero training-support calls in the first week after rollout. The allocation flow was redesigned twice based on shadowing sessions until that bar was cleared.',
    tag: 'Validate'
  }
];

export default function DesignProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="section-eyebrow">Process · operator-first UX</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Good design is invisible to the operator
      </h2>
      <p className="mt-4 max-w-2xl text-muted">
        I design enterprise software for people who never chose to use software —
        university registrars, estate managers, hostel admins.
        If they need training, the design failed.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {PHASES.map((p, i) => (
          <motion.div
            key={p.num}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong rounded-2xl p-6"
          >
            <div className="flex items-start justify-between">
              <span
                className="font-mono-tight text-4xl font-bold leading-none opacity-20"
                style={{ color: 'rgb(var(--accent))' }}
              >
                {p.num}
              </span>
              <span
                className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]"
                style={{ background: 'rgb(var(--accent) / 0.12)', color: 'rgb(var(--accent))' }}
              >
                {p.tag}
              </span>
            </div>

            <h3 className="mt-3 font-display text-xl font-semibold leading-snug">{p.title}</h3>
            <p className="mt-2 text-sm font-medium text-fg/80">{p.principle}</p>

            <div
              className="mt-4 rounded-xl p-4 text-sm leading-relaxed text-muted"
              style={{ background: 'rgb(var(--accent) / 0.05)', borderLeft: '2px solid rgb(var(--accent) / 0.4)' }}
            >
              <span
                className="mb-1.5 block font-mono-tight text-[10px] uppercase tracking-[0.15em]"
                style={{ color: 'rgb(var(--accent))' }}
              >
                Real example ↓
              </span>
              {p.example}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
