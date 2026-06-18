'use client';

import { motion } from 'framer-motion';
import { Briefcase, Check } from 'lucide-react';
import { experience } from '@/lib/data';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 max-w-2xl"
      >
        <span className="section-eyebrow">
          <Briefcase className="h-3 w-3" /> Experience
        </span>
        <h2 className="heading">Where I&apos;ve been shipping.</h2>
        <p className="mt-4 text-base text-muted sm:text-lg">
          National-scale platforms, mission-critical systems, and the cross-functional work
          that makes them ship on time.
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline rail */}
        <div
          aria-hidden
          className="absolute left-4 top-2 bottom-2 w-px md:left-1/2 md:-translate-x-1/2"
          style={{
            background:
              'linear-gradient(180deg, transparent, rgb(var(--accent) / 0.5), transparent)'
          }}
        />

        <ul className="space-y-10 md:space-y-16">
          {experience.map((job, i) => (
            <motion.li
              key={job.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`relative grid gap-4 md:grid-cols-2 md:gap-12 ${
                i % 2 === 1 ? 'md:[&>div:first-child]:order-2' : ''
              }`}
            >
              {/* Dot */}
              <span
                aria-hidden
                className="absolute left-4 top-3 grid h-3.5 w-3.5 -translate-x-1/2 place-items-center rounded-full md:left-1/2"
                style={{
                  background:
                    'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-3)))',
                  boxShadow: '0 0 0 4px rgb(var(--bg)), 0 0 24px rgb(var(--accent) / 0.5)'
                }}
              />

              <div className={`pl-10 md:pl-0 ${i % 2 === 1 ? 'md:text-left' : 'md:text-right'}`}>
                <div className="font-mono text-sm uppercase tracking-[0.18em] text-accent">
                  {job.period}
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold">
                  {job.company}
                </h3>
                <div className="mt-1 text-sm text-muted">{job.role}</div>
              </div>

              <div className="pl-10 md:pl-0">
                <div className="glass rounded-3xl p-6 sm:p-7">
                  <ul className="space-y-3">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span
                          className="mt-1 grid h-4 w-4 flex-shrink-0 place-items-center rounded-full"
                          style={{
                            background:
                              'linear-gradient(135deg, rgb(var(--accent) / 0.3), rgb(var(--accent-3) / 0.3))'
                          }}
                        >
                          <Check className="h-2.5 w-2.5 text-accent" />
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
