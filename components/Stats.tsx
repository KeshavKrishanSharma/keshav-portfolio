'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { stats } from '@/lib/data';

function CountUp({ to }: { to: string }) {
  // Parse "3+", "100+", "5K+", "99.9%"
  const match = to.match(/^([\d.]+)(K)?(\+|%)?$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [val, setVal] = useState(0);

  const target = match ? parseFloat(match[1]) : 0;
  const isK = !!match?.[2];
  const suffix = match?.[3] || '';

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  const display =
    target === 99.9 ? val.toFixed(1) : isK ? Math.round(val) : Math.round(val);
  return (
    <span ref={ref}>
      {display}
      {isK ? 'K' : ''}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="section !py-12 sm:!py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4"
        style={{ background: 'rgb(var(--border) / 0.5)' }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="group relative bg-bg/80 p-6 text-center transition-colors hover:bg-bg sm:p-8"
          >
            <div className="font-display text-3xl font-bold sm:text-5xl">
              <span className="text-gradient">
                <CountUp to={s.value} />
              </span>
            </div>
            <div className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
