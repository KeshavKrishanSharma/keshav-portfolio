'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/lib/data';

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setTitleIdx((i) => (i + 1) % profile.titleRotator.length),
      2200
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden pt-28 sm:pt-32"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 sm:px-8 md:gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left — copy */}
        <div className="relative z-10 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 inline-flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Available for collaborations
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[42px] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-[68px]"
          >
            Hi, I&apos;m <span className="text-gradient">Keshav</span>.
            <br />
            I build things that{' '}
            <span className="relative inline-block">
              <span className="text-gradient">scale</span>
              <svg
                aria-hidden
                className="absolute -bottom-1 left-0 h-3 w-full"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 6 Q 50 0, 100 6 T 198 6"
                  stroke="rgb(var(--accent-3))"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.9, duration: 1, ease: 'easeInOut' }}
                />
              </svg>
            </span>
            .
          </motion.h1>

          {/* Rotating role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex h-9 items-center gap-3 font-mono text-base text-muted sm:text-lg"
          >
            <span className="text-fg/60">{'>'}</span>
            <div className="relative h-7 overflow-hidden">
              {profile.titleRotator.map((t, i) => (
                <motion.span
                  key={t}
                  className="absolute inset-x-0 whitespace-nowrap font-medium text-fg"
                  animate={{
                    y:
                      titleIdx === i
                        ? 0
                        : titleIdx === (i + 1) % profile.titleRotator.length
                          ? -28
                          : 28,
                    opacity: titleIdx === i ? 1 : 0
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#projects" className="btn-primary" data-cursor="hover">
              View Projects <ArrowDown className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn" data-cursor="hover">
              <Mail className="h-4 w-4" /> Get in touch
            </a>
            <div className="ml-1 flex items-center gap-1">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-fg/70 transition-colors hover:border-accent hover:text-accent"
                aria-label="GitHub"
                data-cursor="hover"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-fg/70 transition-colors hover:border-accent hover:text-accent"
                aria-label="LinkedIn"
                data-cursor="hover"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right — playful doodle (replaces the heavy 3D scene) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 mx-auto w-full max-w-[520px] lg:order-2 lg:max-w-none"
        >
          <div className="relative flex aspect-square w-full items-center justify-center sm:aspect-[1.1/1] lg:aspect-square">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.doodlePortrait}
              alt=""
              aria-hidden
              className="h-full w-full object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium uppercase tracking-[0.2em] text-muted"
        aria-label="Scroll to about"
      >
        <span className="block animate-float">↓ Scroll</span>
      </motion.a>
    </section>
  );
}
