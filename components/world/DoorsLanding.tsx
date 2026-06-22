'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroDoodle from '@/components/HeroDoodle';
import { worlds } from '@/lib/worlds';
import { profile } from '@/lib/data';
import { worldIcon } from './icons';
import { useWorldTransition } from './TransitionProvider';

/**
 * The entry experience — "What brings you here?".
 * Three doors, each morphing the whole site into a persona world, plus a
 * recruiter fast-path for anyone who just wants the résumé.
 */
export default function DoorsLanding() {
  const { navigate } = useWorldTransition();

  // 1 / 2 / 3 jump straight through a door.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const w = worlds.find((x) => String(x.num) === e.key);
      if (w) navigate(`/${w.id}`, w.accent);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  return (
    <div className="door-canvas flex flex-col">
      {/* Top bar — monogram */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-2.5">
          <span
            className="monogram grid h-9 w-9 place-items-center rounded-xl text-sm text-white shadow-lg"
            style={{
              background:
                'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-3)))'
            }}
          >
            KKS
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            {profile.name}
          </span>
        </div>
        <span className="hidden text-xs uppercase tracking-[0.22em] text-muted sm:inline">
          Portfolio · choose a lens
        </span>
      </div>

      {/* Centre stage */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 py-10 text-center sm:px-8">
        {/* Animated SVG mascot — always crisp, theme-reactive */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.22, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute -top-2 right-0 hidden h-52 w-52 opacity-90 lg:block xl:h-60 xl:w-60"
          aria-hidden
        >
          <HeroDoodle />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="chip-accent mb-6 flex items-center gap-2.5"
        >
          <img
            src={profile.portrait}
            alt=""
            aria-hidden
            className="h-7 w-7 rounded-full object-cover ring-2 ring-accent/60"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          👋 Hi, I&apos;m {profile.shortName}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          What brings you <span className="text-gradient">here?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg"
        >
          Full-stack engineer. 3.5 years shipping production systems for India&apos;s
          national university platform. Same person — three lenses. Pick yours.
        </motion.p>

        {/* The three doors */}
        <div className="mt-12 grid w-full gap-5 sm:grid-cols-3 sm:gap-6">
          {worlds.map((w, i) => {
            const Icon = worldIcon[w.id];
            return (
            <motion.button
              key={w.id}
              onClick={(e) =>
                navigate(`/${w.id}`, w.accent, { x: e.clientX, y: e.clientY })
              }
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="door-card group relative flex flex-col items-center overflow-hidden rounded-3xl p-7 text-center sm:p-8"
              style={{
                background: 'rgb(var(--glass) / 0.6)',
                border: '1px solid rgb(var(--border))',
                backdropFilter: 'blur(16px)'
              }}
            >
              {/* accent glow on hover */}
              <span
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  boxShadow: `inset 0 0 0 1.5px ${w.accent}, 0 30px 80px -28px ${w.accent}`,
                  background: `radial-gradient(120% 80% at 50% 0%, ${w.accent}1a, transparent 70%)`
                }}
              />
              <span className="text-xs font-semibold tracking-[0.18em] text-muted">
                DOOR {w.num}
              </span>
              <span
                className="mt-4 grid h-16 w-16 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${w.accent}1f`, border: `1px solid ${w.accent}55`, color: w.accent }}
              >
                <Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden />
              </span>
              <h2 className="relative z-10 mt-5 font-display text-2xl font-bold tracking-tight">
                {w.doorTitle}
              </h2>
              <p className="relative z-10 mt-2 text-sm text-muted">{w.doorNeed}</p>
              <p
                className="relative z-10 mt-4 text-[11px] uppercase tracking-[0.14em]"
                style={{ color: w.accent }}
              >
                {w.vibe}
              </p>
              <span
                className="relative z-10 mt-6 inline-flex items-center gap-1.5 text-sm font-medium opacity-70 transition-all group-hover:gap-2.5 group-hover:opacity-100"
                style={{ color: w.accent }}
              >
                Enter the {w.name}
                <ArrowRight className="h-4 w-4" />
              </span>
            </motion.button>
            );
          })}
        </div>

        {/* Recruiter fast-path */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12 flex flex-col items-center gap-1"
        >
          <button
            onClick={(e) => navigate('/resume', '#6366f1', { x: e.clientX, y: e.clientY })}
            className="text-sm text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
          >
            In a hurry? Skip the play — see the full résumé →
          </button>
          <span className="text-[11px] text-muted/70">
            tip: press 1 · 2 · 3 to walk straight through a door
          </span>
        </motion.div>
      </div>
    </div>
  );
}
