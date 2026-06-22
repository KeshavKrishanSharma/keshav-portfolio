'use client';

import { motion } from 'framer-motion';

/**
 * HeroBackdrop — a muted, cinematic photo behind a world hero.
 * The image is held at low opacity under two theme-coloured gradients so (a)
 * hero text stays readable and (b) any AI-garbled text in the source becomes
 * unreadable atmospheric texture. `focus` is a CSS object-position.
 */
export default function HeroBackdrop({
  src,
  focus = 'center'
}: {
  src: string;
  focus?: string;
}) {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={src}
        alt=""
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full object-cover"
        style={{ objectPosition: focus }}
      />
      {/* horizontal scrim — keeps the text side legible, mutes garbled text */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgb(var(--bg)) 0%, rgb(var(--bg) / 0.85) 42%, rgb(var(--bg) / 0.4) 100%)'
        }}
      />
      {/* bottom fade into the page */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, transparent 38%, rgb(var(--bg)) 97%)' }}
      />
    </div>
  );
}
