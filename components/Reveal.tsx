'use client';

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Reveal — single element fades + slides in when scrolled into view ───── */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  x = 0,
  scale = 1,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger — orchestrates children to reveal in sequence ───────────────── */
export const STAGGER_ITEM: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-8% 0px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={STAGGER_ITEM}>
      {children}
    </motion.div>
  );
}

/* ── SectionHeading — eyebrow → title → blurb, staggered on scroll-in ────── */
export function SectionHeading({
  eyebrow,
  title,
  blurb,
  eyebrowClassName = 'section-eyebrow',
  titleClassName = 'mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl',
  blurbClassName = 'mt-4 max-w-2xl text-muted',
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  blurb?: ReactNode;
  eyebrowClassName?: string;
  titleClassName?: string;
  blurbClassName?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const item: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  if (reduce) {
    return (
      <div className={className}>
        {eyebrow && <p className={eyebrowClassName}>{eyebrow}</p>}
        <h2 className={titleClassName}>{title}</h2>
        {blurb && <p className={blurbClassName}>{blurb}</p>}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px' }}
    >
      {eyebrow && (
        <motion.p variants={item} className={eyebrowClassName}>
          {eyebrow}
        </motion.p>
      )}
      <motion.h2 variants={item} className={titleClassName}>
        {title}
      </motion.h2>
      {blurb && (
        <motion.p variants={item} className={blurbClassName}>
          {blurb}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ── Parallax — drifts children against scroll for subtle depth ──────────── */
export function Parallax({
  children,
  className,
  distance = 40,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
