'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Mail, Linkedin, Github, FileDown, ChevronDown } from 'lucide-react';
import { worlds, type World } from '@/lib/worlds';
import { profile } from '@/lib/data';
import { worldIcon } from './icons';
import { useWorldTransition } from './TransitionProvider';

type NavigateFn = ReturnType<typeof useWorldTransition>['navigate'];

/* ── Door card ──────────────────────────────────────────────────────────── */
function DoorCard({ w, i, navigate }: { w: World; i: number; navigate: NavigateFn }) {
  const Icon = worldIcon[w.id];
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 28 });
  const springY = useSpring(y, { stiffness: 220, damping: 28 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.button
        onClick={(e) => navigate(`/${w.id}`, w.accent, { x: e.clientX, y: e.clientY })}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - rect.left - rect.width / 2) * 0.13);
          y.set((e.clientY - rect.top - rect.height / 2) * 0.13);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className="door-card group relative flex w-full flex-col items-center overflow-hidden rounded-3xl p-7 text-center sm:p-8"
        style={{
          x: springX,
          y: springY,
          background: 'rgb(var(--glass) / 0.6)',
          border: '1px solid rgb(var(--border))',
          backdropFilter: 'blur(16px)',
        }}
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-25 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 0 1.5px ${w.accent}, 0 30px 80px -28px ${w.accent}`,
            background: `radial-gradient(120% 80% at 50% 0%, ${w.accent}1a, transparent 70%)`
          }}
        />
        <span className="text-xs font-semibold tracking-[0.18em] text-muted">DOOR {w.num}</span>
        <span
          className="mt-4 grid h-16 w-16 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${w.accent}1f`, border: `1px solid ${w.accent}55`, color: w.accent }}
        >
          <Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden />
        </span>
        <h2 className="relative z-10 mt-5 font-display text-2xl font-bold tracking-tight">{w.doorTitle}</h2>
        <p className="relative z-10 mt-2 text-sm text-muted">{w.doorNeed}</p>
        <p className="relative z-10 mt-4 text-[11px] uppercase tracking-[0.14em]" style={{ color: w.accent }}>
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
    </motion.div>
  );
}

/* ── Resume feature card ────────────────────────────────────────────────── */
function ResumeCard({ navigate }: { navigate: NavigateFn }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-8 overflow-hidden rounded-2xl"
      style={{
        background: 'rgb(var(--glass) / 0.5)',
        border: '1px solid rgb(var(--border))',
        backdropFilter: 'blur(16px)'
      }}
    >
      <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
        <div className="flex-1 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Prefer reading?</p>
          <h3 className="mt-1 font-display text-xl font-bold tracking-tight">Full Résumé</h3>
          <p className="mt-1.5 text-sm text-muted">
            Technical &amp; Leadership editions — pick the one that fits your lens.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={(e) => navigate('/resume', '#6366f1', { x: e.clientX, y: e.clientY })}
            className="btn-primary !px-4 !py-2 text-sm"
          >
            View online
          </button>
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm text-muted transition-colors hover:text-fg"
            style={{ borderColor: 'rgb(var(--border))' }}
          >
            <FileDown className="h-3.5 w-3.5" />
            Technical PDF
          </a>
          <a
            href={profile.resumeLeadershipUrl}
            download
            className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm text-muted transition-colors hover:text-fg"
            style={{ borderColor: 'rgb(var(--border))' }}
          >
            <FileDown className="h-3.5 w-3.5" />
            Leadership PDF
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */
export default function DoorsLanding() {
  const { navigate } = useWorldTransition();

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
    <div className="relative" style={{ background: 'rgb(var(--bg))' }}>

      {/* ══ SECTION 1 — sticky hero ════════════════════════════════════════ */}
      <div className="h-screen">
        <div className="sticky top-0 z-0 flex h-screen overflow-hidden">

          {/* Left: full-height portrait — desktop only */}
          <div className="relative hidden w-[45%] flex-shrink-0 lg:block">
            <img
              src={profile.portrait}
              alt="Keshav Krishan Sharma"
              className="h-full w-full object-cover object-top"
            />
            {/* Fade photo into bg at right edge */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: 'linear-gradient(to right, transparent 45%, rgb(var(--bg)) 95%)' }}
            />
            {/* Subtle bottom fade */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
              style={{ background: 'linear-gradient(to top, rgb(var(--bg)), transparent)' }}
            />
          </div>

          {/* Right: content column */}
          <div className="flex flex-1 flex-col justify-center overflow-y-auto px-7 py-12 sm:px-10 lg:pl-10 lg:pr-16 xl:pl-12 xl:pr-24">

            {/* Mobile-only circular avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 block lg:hidden"
            >
              <img
                src={profile.portrait}
                alt=""
                aria-hidden
                className="h-20 w-20 rounded-full object-cover object-top shadow-2xl"
                style={{ border: '2px solid rgb(var(--accent) / 0.5)' }}
              />
            </motion.div>

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-emerald-400">Open to the right opportunity</span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-1 text-sm text-muted"
            >
              👋 Hi, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl"
            >
              Keshav Krishan Sharma
            </motion.h1>

            {/* Identity line */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 max-w-md text-base leading-relaxed text-muted sm:text-lg"
            >
              Full-stack engineer — 3.5 years building production systems
              running higher education across India.
            </motion.p>

            {/* Stat bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm"
            >
              {[
                { val: '3.5', label: 'yrs' },
                { val: '4', label: 'modules built' },
                { val: '40K+', label: 'users' },
              ].map(({ val, label }, i) => (
                <span key={val} className="flex items-baseline gap-1">
                  {i > 0 && <span className="text-muted/40">·</span>}
                  <strong className="font-display font-bold" style={{ color: 'rgb(var(--accent))' }}>{val}</strong>
                  <span className="text-muted">{label}</span>
                </span>
              ))}
              <span className="text-muted/40">·</span>
              <span className="text-xs text-muted">⭐ IIT Varanasi</span>
            </motion.div>

            {/* Attribute chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: 'rgb(var(--accent) / 0.15)', color: 'rgb(var(--accent))', border: '1px solid rgb(var(--accent) / 0.3)' }}
              >
                Product-minded Engineer
              </span>
              <span
                className="rounded-full border px-3 py-1 text-xs font-medium text-muted"
                style={{ borderColor: 'rgb(var(--border))' }}
              >
                Building in AI · Beginner. Intentionally.
              </span>
            </motion.div>

            {/* Currently building */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-3 text-xs text-muted/60"
            >
              ⚡ Currently: {profile.currentlyBuilding}
            </motion.p>

            {/* Social links + resume CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.44 }}
              className="mt-6 flex flex-wrap items-center gap-2.5"
            >
              <a
                href={`mailto:${profile.email}`}
                title="Email"
                className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:text-fg"
                style={{ background: 'rgb(var(--glass) / 0.7)', border: '1px solid rgb(var(--border))' }}
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:text-fg"
                style={{ background: 'rgb(var(--glass) / 0.7)', border: '1px solid rgb(var(--border))' }}
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:text-fg"
                style={{ background: 'rgb(var(--glass) / 0.7)', border: '1px solid rgb(var(--border))' }}
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.resumeUrl}
                download
                className="btn-primary !px-4 !py-2 text-sm"
              >
                <FileDown className="h-4 w-4" />
                Download Résumé
              </a>
            </motion.div>

            {/* Timezone */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-3 text-[11px] text-muted/50"
            >
              📍 New Delhi, India · IST (UTC +5:30)
            </motion.p>

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-10 flex flex-col items-start gap-0.5"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              >
                <ChevronDown className="h-5 w-5 text-muted" />
              </motion.div>
              <span className="text-xs text-muted">scroll to explore</span>
              <span className="text-[10px] text-muted/40">or press ⌘K</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══ SECTION 2 — doors panel, slides over Section 1 ════════════════ */}
      <div
        className="relative z-10 overflow-hidden rounded-t-[28px]"
        style={{
          background: 'rgb(var(--bg))',
          boxShadow: '0 -24px 80px rgba(0,0,0,0.55)'
        }}
      >
        {/* Top bar */}
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span
              className="monogram grid h-9 w-9 place-items-center rounded-xl text-sm text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-3)))' }}
            >
              KKS
            </span>
            <span className="font-display text-sm font-semibold tracking-tight">{profile.name}</span>
          </div>
          <span className="hidden text-xs uppercase tracking-[0.22em] text-muted sm:inline">
            Portfolio · choose a lens
          </span>
        </div>

        {/* Centre stage */}
        <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-4 text-center sm:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            What brings you <span className="text-gradient">here?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg"
          >
            Same person — four lenses. Pick yours.
          </motion.p>

          {/* The doors */}
          <div className="mt-10 grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {worlds.map((w, i) => (
              <DoorCard key={w.id} w={w} i={i} navigate={navigate} />
            ))}
          </div>

          {/* Resume feature card */}
          <ResumeCard navigate={navigate} />

          {/* Recruiter fast-path */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-col items-center gap-1"
          >
            <button
              onClick={(e) => navigate('/resume', '#6366f1', { x: e.clientX, y: e.clientY })}
              className="text-sm text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              In a hurry? Skip the play — see the full résumé →
            </button>
            <span className="text-[11px] text-muted/70">
              tip: press 1 · 2 · 3 · 4 to walk straight through a door
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
