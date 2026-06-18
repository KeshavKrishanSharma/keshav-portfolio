'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Trophy } from 'lucide-react';
import { education, honors } from '@/lib/data';

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass relative overflow-hidden rounded-3xl p-7 sm:p-9"
        >
          <span className="section-eyebrow">
            <GraduationCap className="h-3 w-3" /> Education
          </span>
          <h3 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
            {education.degree}
          </h3>
          <p className="mt-2 text-muted">{education.school}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="font-mono uppercase tracking-[0.18em] text-accent">
              {education.period}
            </span>
            <span className="h-1 w-1 rounded-full bg-muted/60" />
            <span>{education.result}</span>
          </div>

          {/* Decoration */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full opacity-30 blur-3xl"
            style={{ background: 'rgb(var(--accent))' }}
          />
        </motion.div>

        {/* Honors */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="glass relative overflow-hidden rounded-3xl p-7 sm:p-9"
        >
          <span className="section-eyebrow">
            <Trophy className="h-3 w-3" /> Leadership &amp; Honors
          </span>
          <ul className="mt-5 space-y-3">
            {honors.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span
                  className="mt-1 grid h-4 w-4 flex-shrink-0 place-items-center rounded-full"
                  style={{
                    background:
                      'linear-gradient(135deg, rgb(var(--accent-3) / 0.3), rgb(var(--accent) / 0.3))'
                  }}
                >
                  <Trophy className="h-2 w-2 text-accent3" />
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div
            aria-hidden
            className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full opacity-30 blur-3xl"
            style={{ background: 'rgb(var(--accent-3))' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
