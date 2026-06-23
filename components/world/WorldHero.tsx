'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import Terminal from './Terminal';
import { worldById, type World, type WorldId } from '@/lib/worlds';

function parseStat(value: string) {
  const m = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { prefix: value, target: null as number | null, suffix: '' };
  return { prefix: m[1], target: parseFloat(m[2]), suffix: m[3] };
}

function ProofCounter({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  const { prefix, target, suffix } = parseStat(value);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (target === null) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setN(target); return; }
    if (!inView) return;
    const duration = 900;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  const display =
    target === null
      ? value
      : `${prefix}${Number.isInteger(target) ? Math.round(n) : n.toFixed(1)}${suffix}`;

  return <div ref={ref} className="tabular-nums">{display}</div>;
}

const fadeUp = (d: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] as const }
});

const EXPLORE: Record<WorldId, string[]> = {
  engineer:   ['Architecture map', 'Allocation state-machine', 'Case studies'],
  strategist: ['Impact in numbers', 'Stakeholder map', 'Career timeline'],
  designer:   ['Before / after', 'UI gallery', 'Design system']
};

const WORLD_PORTRAIT: Record<WorldId, string> = {
  engineer:   '/images/persona/my_dp.jpeg',
  strategist: '/images/persona/my_dp.jpeg',
  designer:   '/images/persona/designer-scene.jpg',
};

function WordReveal({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block whitespace-pre"
        >
          {word}{i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </>
  );
}

export default function WorldHero({ worldId }: { worldId: WorldId }) {
  const world = worldById(worldId)!;
  const isEngineer = worldId === 'engineer';

  return (
    <section className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 sm:pt-32">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_360px] lg:gap-14 xl:grid-cols-[1fr_400px]">

        {/* ── LEFT: all text ─────────────────────────────────────────── */}
        <div>
          <motion.p
            {...fadeUp(0)}
            className={isEngineer ? 'font-mono-tight text-sm text-accent' : 'section-eyebrow'}
          >
            {world.hero.kicker}
          </motion.p>

          <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl xl:text-6xl">
            <WordReveal text={world.hero.headline} />
          </h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {world.hero.sub}
          </motion.p>

          {/* Proof chips — staggered */}
          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
            {world.proof.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.24 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-2xl px-4 py-5"
              >
                <div
                  className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
                  style={{ color: 'rgb(var(--accent))' }}
                >
                  <ProofCounter value={p.value} />
                </div>
                <div className="mt-1.5 text-xs leading-snug text-muted">{p.label}</div>
              </motion.div>
            ))}
          </div>

          {/* World-specific flourish */}
          <motion.div {...fadeUp(0.32)} className="mt-10">
            {worldId === 'engineer'   && <Terminal />}
            {worldId === 'strategist' && <PrincipleStrip />}
            {worldId === 'designer'   && <StudioCard />}
          </motion.div>

          {/* "In this world" chips — staggered */}
          <motion.div {...fadeUp(0.4)} className="mb-8 mt-12">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">In this world</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {EXPLORE[worldId].map((label, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="chip"
                >
                  {label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: portrait with floating stat chips ───────────────── */}
        <WorldPortrait worldId={worldId} world={world} />
      </div>
    </section>
  );
}

/* ── Portrait column ────────────────────────────────────────────────────── */
function WorldPortrait({ worldId, world }: { worldId: WorldId; world: World }) {
  const [p0, p1] = world.proof;
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 700], [0, -70]);
  const parallaxY = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.95, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      style={{ y: parallaxY }}
      className="relative hidden pt-10 lg:block"
    >
      {/* Accent glow blob */}
      <div
        className="pointer-events-none absolute -inset-8 rounded-full opacity-20 blur-3xl"
        style={{ background: 'rgb(var(--accent))' }}
      />

      {/* Portrait — all worlds use real photo; strategist also gets the trajectory chart below */}
      <div
        className="relative overflow-hidden rounded-3xl border"
        style={{ borderColor: 'rgb(var(--accent) / 0.4)' }}
      >
        <img
          src={WORLD_PORTRAIT[worldId]}
          alt={`Keshav — ${world.name}`}
          className="aspect-[3/4] w-full object-cover object-top"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{ background: 'linear-gradient(to top, rgb(var(--bg)), transparent)' }}
        />
      </div>
      {worldId === 'strategist' && (
        <div className="mt-4">
          <StrategistGraphic />
        </div>
      )}

      <>
      {/* Floating chip — top-left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.55, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-6 top-20"
      >
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="glass-strong rounded-2xl px-5 py-4 shadow-2xl"
          style={{ borderColor: 'rgb(var(--accent) / 0.3)' }}
        >
          <div
            className="font-display text-2xl font-bold"
            style={{ color: 'rgb(var(--accent))' }}
          >
            {p0.value}
          </div>
          <div className="mt-0.5 text-xs text-muted">{p0.label}</div>
        </motion.div>
      </motion.div>

      {/* Floating chip — bottom-right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -right-6 bottom-28"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="glass-strong rounded-2xl px-5 py-4 shadow-2xl"
          style={{ borderColor: 'rgb(var(--accent) / 0.3)' }}
        >
          <div
            className="font-display text-2xl font-bold"
            style={{ color: 'rgb(var(--accent))' }}
          >
            {p1.value}
          </div>
          <div className="mt-0.5 text-xs text-muted">{p1.label}</div>
        </motion.div>
      </motion.div>
      </>
    </motion.div>
  );
}

/* ── Strategist: a "trajectory" growth chart (replaces the photo) ───────── */
function StrategistGraphic() {
  const steps = [
    { y: '22', h: 26 },
    { y: '23', h: 46 },
    { y: '24', h: 66 },
    { y: '25', h: 84 },
    { y: '26', h: 100 }
  ];
  return (
    <div
      className="relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-3xl border bg-surface p-6"
      style={{ borderColor: 'rgb(var(--accent) / 0.4)' }}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'rgb(var(--accent))' }}>
          Trajectory
        </p>
        <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: 'rgb(var(--accent))' }} />
      </div>
      <p className="mt-1.5 font-display text-lg font-bold leading-tight">
        Intern → Solutions Architect
      </p>

      <div className="mt-6 flex flex-1 flex-col">
        <div className="relative flex-1">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="strat-bar" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="rgb(var(--accent) / 0.35)" />
                <stop offset="100%" stopColor="rgb(var(--accent))" />
              </linearGradient>
            </defs>
            {steps.map((s, i) => {
              const slot = 100 / steps.length;
              const bw = 9;
              const x = slot * i + (slot - bw) / 2;
              return (
                <motion.rect
                  key={s.y}
                  x={x}
                  width={bw}
                  rx={1.2}
                  fill="url(#strat-bar)"
                  initial={{ height: 0, y: 100 }}
                  animate={{ height: s.h, y: 100 - s.h }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
              );
            })}
          </svg>
        </div>
        <div className="mt-2 flex">
          {steps.map((s) => (
            <span key={s.y} className="flex-1 text-center text-[10px] text-muted">
              &apos;{s.y}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t pt-3" style={{ borderColor: 'rgb(var(--border))' }}>
        <p className="text-xs leading-snug text-muted">
          3.5 yrs · sole architect on 4 of a 20+ module national platform
        </p>
      </div>
    </div>
  );
}

/* ── Strategist: operating principle strip ──────────────────────────────── */
function PrincipleStrip() {
  return (
    <div
      className="glass-strong rounded-2xl px-6 py-6 sm:px-8"
      style={{ borderColor: 'rgb(var(--accent) / 0.25)' }}
    >
      <p
        className="text-xs uppercase tracking-[0.2em]"
        style={{ color: 'rgb(var(--accent))' }}
      >
        How I operate
      </p>
      <p className="mt-3 font-display text-xl leading-snug sm:text-2xl">
        &quot;Give me an ambiguous mandate and a deadline. I&apos;ll return a shipped
        platform, a maintainable codebase, and a team that can run it without me.&quot;
      </p>
    </div>
  );
}

/* ── Designer: editorial studio card ────────────────────────────────────── */
function StudioCard() {
  return (
    <div
      className="glass-strong -rotate-1 rounded-3xl px-7 py-8 shadow-xl sm:px-10 sm:py-10"
      style={{ borderColor: 'rgb(var(--accent) / 0.35)' }}
    >
      <p className="font-display text-2xl font-semibold leading-snug sm:text-3xl">
        Good architecture is invisible.{' '}
        <br className="hidden sm:block" />
        Bad UX isn&apos;t.
      </p>
      <p className="mt-4 max-w-md text-muted">
        I design the parts people touch &mdash; forms, flows, and dashboards that
        non-technical operators finish without a manual.
      </p>
    </div>
  );
}
