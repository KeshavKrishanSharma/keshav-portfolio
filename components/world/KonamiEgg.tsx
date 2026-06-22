'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/**
 * KonamiEgg — a quiet bit of delight. Enter ↑↑↓↓←→←→ B A and a short burst of
 * accent confetti rains down with a wink. Decorative only, dismisses itself,
 * and stays silent for anyone with prefers-reduced-motion. Mounted globally.
 */
const SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

const COLORS = [
  'rgb(var(--accent))',
  'rgb(var(--accent-2))',
  'rgb(var(--accent-3))'
];

export default function KonamiEgg() {
  const reduce = useReducedMotion();
  const [fire, setFire] = useState(false);

  useEffect(() => {
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) {
        i = 0;
        return;
      }
      const want = SEQUENCE[i];
      if (e.key === want || e.key.toLowerCase() === want) {
        i += 1;
        if (i === SEQUENCE.length) {
          i = 0;
          setFire(true);
          setTimeout(() => setFire(false), 2600);
        }
      } else {
        i = e.key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (reduce) return null;

  const pieces = Array.from({ length: 80 }, (_, k) => k);

  return (
    <AnimatePresence>
      {fire && (
        <div className="pointer-events-none fixed inset-0 z-[9995] overflow-hidden" aria-hidden>
          {pieces.map((k) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 0.5;
            const duration = 1.6 + Math.random() * 1.2;
            const size = 6 + Math.random() * 8;
            const rotate = Math.random() * 360;
            return (
              <motion.span
                key={k}
                initial={{ y: -40, opacity: 0, rotate }}
                animate={{ y: '105vh', opacity: [0, 1, 1, 0], rotate: rotate + 360 }}
                transition={{ duration, delay, ease: 'easeIn' }}
                style={{
                  position: 'absolute',
                  left: `${left}%`,
                  width: size,
                  height: size * 0.6,
                  borderRadius: 2,
                  background: COLORS[k % COLORS.length]
                }}
              />
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl px-6 py-4 text-center shadow-2xl"
          >
            <p className="font-display text-lg font-bold">You found the cheat code.</p>
            <p className="mt-1 text-sm text-muted">
              Curiosity like that is exactly what I hire for. Press{' '}
              <kbd className="rounded border border-border px-1.5 py-0.5 text-xs">⌘K</kbd>{' '}
              and say hi.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
