'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { profile } from '@/lib/data';

/**
 * DoodleMascot — the ink-illustration portrait floats fixed at bottom-right
 * on world pages. Tilts forward when scrolling down, snaps back when stopped.
 * Bobs on a 5s loop. Fades in after the visitor scrolls 220px.
 */
export default function DoodleMascot() {
  const [visible, setVisible] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const rawScroll = useMotionValue(0);

  const tiltAngle = useTransform(rawScroll, [0, 1], [-4, 8]);
  const tilt = useSpring(tiltAngle, { stiffness: 70, damping: 22 });

  useEffect(() => {
    let lastY = window.scrollY;
    let resetTimer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - lastY;
      lastY = current;

      if (current > 220) setVisible(true);

      // Positive = scrolling down → lean forward, negative → lean back
      rawScroll.set(Math.max(-1, Math.min(1, delta / 18)));

      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => rawScroll.set(0), 250);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(resetTimer);
    };
  }, [rawScroll]);

  if (!imgOk) return null;

  return (
    <motion.div
      className="pointer-events-none fixed bottom-5 right-5 z-30 hidden lg:block xl:bottom-7 xl:right-7"
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.8 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden
    >
      {/* Bob loop */}
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Tilt on scroll */}
        <motion.img
          src={profile.doodlePortrait}
          alt=""
          className="w-24 drop-shadow-2xl xl:w-28"
          style={{ rotate: tilt, transformOrigin: 'bottom center' }}
          onError={() => setImgOk(false)}
        />
      </motion.div>
    </motion.div>
  );
}
