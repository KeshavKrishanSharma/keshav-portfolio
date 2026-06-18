'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  FolderGit2,
  Sparkles,
  X,
  Layers,
  Box,
  Cpu,
  Lightbulb,
  ImageIcon,
  Star
} from 'lucide-react';
import { projects } from '@/lib/data';

type Mode = 'grid' | '3d';

export default function Projects() {
  const [mode, setMode] = useState<Mode>('grid');
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="projects" className="section">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 flex flex-wrap items-end justify-between gap-6"
      >
        <div className="max-w-2xl">
          <span className="section-eyebrow">
            <FolderGit2 className="h-3 w-3" /> Case Studies
          </span>
          <h2 className="heading">
            Systems I&apos;ve <span className="text-gradient">architected</span>.
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Four enterprise modules built from the schema up for a national university
            platform — plus client work. Each one is a problem, an architecture, and a
            decision trail. Tap any card for the full story.
          </p>
        </div>

        {/* Mode toggle */}
        <div className="glass inline-flex rounded-full p-1">
          <button
            onClick={() => setMode('grid')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              mode === 'grid' ? 'bg-fg text-bg' : 'text-muted hover:text-fg'
            }`}
            data-cursor="hover"
          >
            <Layers className="h-3.5 w-3.5" /> Grid
          </button>
          <button
            onClick={() => setMode('3d')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              mode === '3d' ? 'bg-fg text-bg' : 'text-muted hover:text-fg'
            }`}
            data-cursor="hover"
          >
            <Box className="h-3.5 w-3.5" /> Playful
          </button>
        </div>
      </motion.div>

      {mode === 'grid' ? (
        <ProjectsGrid onOpen={setActive} />
      ) : (
        <ProjectsPlayful onOpen={setActive} />
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {active !== null && (
          <ProjectModal index={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ============================================================
   Case-study screenshot — graceful placeholder if file missing
   ============================================================ */
function CaseImage({
  src,
  accent,
  className = ''
}: {
  src?: string;
  accent: string;
  className?: string;
}) {
  const [ok, setOk] = useState(true);
  if (src && ok) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={() => setOk(false)}
        className={`h-full w-full object-cover object-top ${className}`}
      />
    );
  }
  return (
    <div
      aria-hidden
      className={`grid h-full w-full place-items-center bg-gradient-to-br ${accent} ${className}`}
    >
      <div className="flex flex-col items-center gap-1.5 text-white/85">
        <ImageIcon className="h-6 w-6" />
        <span className="text-[10px] font-medium uppercase tracking-[0.18em]">
          Preview coming soon
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   GRID layout — tilt-on-hover cards (featured first)
   ============================================================ */
function ProjectsGrid({ onOpen }: { onOpen: (i: number) => void }) {
  // Stable order: featured case studies first, keep original index for the modal.
  const order = projects
    .map((p, i) => ({ p, i }))
    .sort((a, b) => Number(!!b.p.featured) - Number(!!a.p.featured));

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {order.map(({ i }, pos) => (
        <TiltCard key={projects[i].title} index={i} pos={pos} onOpen={onOpen} />
      ))}
    </div>
  );
}

function TiltCard({
  index,
  pos,
  onOpen
}: {
  index: number;
  pos: number;
  onOpen: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const p = projects[index];

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
    el.style.transform = `perspective(1000px) rotateX(${(-y * 6).toFixed(
      2
    )}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-2px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => onOpen(index)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay: pos * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="glass group relative cursor-pointer overflow-hidden rounded-3xl transition-[transform,border-color] duration-200 will-change-transform hover:border-accent/40"
      style={{ transformStyle: 'preserve-3d' }}
      data-cursor="hover"
    >
      {/* Screenshot header (scroll-zoom into focus) — only for case studies */}
      {p.image && (
        <div className="relative h-44 w-full overflow-hidden sm:h-52">
          <motion.div
            initial={{ scale: 1.12, opacity: 0.6 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full"
          >
            <CaseImage src={p.image} accent={p.accent} />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" />
          {p.featured && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
              <Star className="h-3 w-3" /> Flagship
            </span>
          )}
        </div>
      )}

      <div className="relative p-6 sm:p-8">
        {/* Spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(220px circle at var(--mx) var(--my), rgb(var(--accent) / 0.18), transparent 60%)'
          }}
        />
        {!p.image && (
          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${p.accent}`} />
        )}

        <div className="relative">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {p.category ?? p.role}
          </div>
          <h3 className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-[26px]">
            {p.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{p.summary}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {p.impact.map((imp) => (
              <span key={imp} className="chip-accent">
                <Sparkles className="h-3 w-3" /> {imp}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs text-muted">
              {p.featured ? 'Read the case study →' : 'Tap for details →'}
            </span>
            {p.href && (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
              >
                Visit live <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   PLAYFUL layout — orbital 3D cards (CSS 3D transforms)
   ============================================================ */
function ProjectsPlayful({ onOpen }: { onOpen: (i: number) => void }) {
  const [angle, setAngle] = useState(0);
  const [paused, setPaused] = useState(false);
  const last = useRef(performance.now());

  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      const dt = now - last.current;
      last.current = now;
      if (!paused) setAngle((a) => a + dt * 0.012);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const radius = 320;
  const step = 360 / projects.length;

  return (
    <div
      className="glass relative mx-auto h-[480px] w-full overflow-hidden rounded-3xl sm:h-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 grid place-items-center text-xs uppercase tracking-[0.2em] text-muted">
        <span>{paused ? 'paused — click a card' : 'orbiting · hover to pause'}</span>
      </div>

      <div
        className="relative h-full w-full"
        style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translate(-50%, -50%) rotateX(-12deg) rotateY(${angle}deg)`
          }}
        >
          {projects.map((p, i) => {
            const theta = step * i;
            return (
              <button
                key={p.title}
                onClick={() => onOpen(i)}
                className="group absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  transform: `rotateY(${theta}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d'
                }}
                data-cursor="hover"
              >
                <div
                  className={`glass h-44 w-64 rounded-2xl p-5 text-left transition-transform group-hover:scale-105 sm:h-52 sm:w-72 sm:p-6`}
                  style={{
                    background: 'rgb(var(--surface) / 0.85)',
                    boxShadow: '0 20px 60px -20px rgb(0 0 0 / 0.6)'
                  }}
                >
                  <div className={`mb-3 h-1 w-12 rounded-full bg-gradient-to-r ${p.accent}`} />
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {(p.category ?? p.role).split('·')[0].trim()}
                  </div>
                  <h4 className="mt-1.5 font-display text-base font-semibold leading-tight">
                    {p.title}
                  </h4>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">
                    {p.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {p.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Modal — full case study
   ============================================================ */
function ProjectModal({ index, onClose }: { index: number; onClose: () => void }) {
  const p = projects[index];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="glass-strong relative max-h-[88vh] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        {p.image ? (
          <div className="relative h-48 w-full overflow-hidden sm:h-60">
            <CaseImage src={p.image} accent={p.accent} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
          </div>
        ) : (
          <div className={`h-2 w-full bg-gradient-to-r ${p.accent}`} />
        )}

        <div className="p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-border bg-bg/60 backdrop-blur hover:border-accent"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {p.category ?? p.role}
          </div>
          <h3 className="mt-2 font-display text-3xl font-semibold leading-tight">
            {p.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            {p.summary}
          </p>

          {p.problem && (
            <Block label="The problem">
              <p className="text-sm leading-relaxed text-muted">{p.problem}</p>
            </Block>
          )}

          {p.architecture && (
            <Block label="Architecture" icon={<Cpu className="h-3.5 w-3.5" />}>
              <ul className="space-y-2">
                {p.architecture.map((a) => (
                  <li key={a} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {p.decisions && (
            <Block label="Key decisions" icon={<Lightbulb className="h-3.5 w-3.5" />}>
              <ul className="space-y-2">
                {p.decisions.map((d) => (
                  <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent3" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <Block label="Impact">
            <div className="flex flex-wrap gap-2">
              {p.impact.map((imp) => (
                <span key={imp} className="chip-accent">
                  <Sparkles className="h-3 w-3" /> {imp}
                </span>
              ))}
            </div>
          </Block>

          <Block label="Stack">
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </Block>

          {p.href && (
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-7"
            >
              Visit live <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Block({
  label,
  icon,
  children
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-muted">
        {icon}
        {label}
      </div>
      {children}
    </div>
  );
}
