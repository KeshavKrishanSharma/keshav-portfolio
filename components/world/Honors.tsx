'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trophy } from 'lucide-react';
import { honors } from '@/lib/data';

/**
 * Honors — recognition strip for the Strategist world.
 * Shows awards, presentations, and contributions that don't fit a bullet point.
 */
export default function Honors() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-5 pb-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong overflow-hidden rounded-2xl"
        style={{ borderColor: 'rgb(var(--accent) / 0.25)' }}
      >
        <div className="flex items-center gap-3 border-b px-6 py-4" style={{ borderColor: 'rgb(var(--border))' }}>
          <Trophy className="h-4 w-4 flex-shrink-0" style={{ color: 'rgb(var(--accent))' }} />
          <span
            className="text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: 'rgb(var(--accent))' }}
          >
            Recognition
          </span>
        </div>
        <ul className="divide-y" style={{ borderColor: 'rgb(var(--border) / 0.5)' }}>
          {honors.map((h, i) => (
            <motion.li
              key={h}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-3 px-6 py-4 text-sm"
            >
              <span
                className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: 'rgb(var(--accent))' }}
              />
              <span className="text-muted">{h}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
