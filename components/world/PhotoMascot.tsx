'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { profile } from '@/lib/data';

export default function PhotoMascot() {
  const [visible, setVisible] = useState(false);
  const rawScroll = useMotionValue(0);
  const tiltAngle = useTransform(rawScroll, [-1, 1], [-5, 5]);
  const tilt = useSpring(tiltAngle, { stiffness: 70, damping: 22 });

  useEffect(() => {
    let lastY = window.scrollY;
    let resetTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - lastY;
      lastY = current;
      if (current > 220) setVisible(true);
      rawScroll.set(Math.max(-1, Math.min(1, delta / 18)));
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => rawScroll.set(0), 250);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(resetTimer); };
  }, [rawScroll]);

  return (
    <motion.div
      className="pointer-events-none fixed bottom-5 right-5 z-30 hidden lg:block xl:bottom-7 xl:right-7"
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.8 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="overflow-hidden rounded-full shadow-2xl xl:h-20 xl:w-20"
          style={{
            rotate: tilt,
            height: '64px',
            width: '64px',
            border: '2px solid rgb(var(--accent) / 0.6)',
            transformOrigin: 'bottom center'
          }}
        >
          <img
            src={profile.portrait}
            alt=""
            className="h-full w-full object-cover object-top"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
