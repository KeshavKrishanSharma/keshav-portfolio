'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Images, X, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import type { Gallery } from '@/lib/gallery';
import { SectionHeading } from '@/components/Reveal';

/**
 * ProjectShowcase — information-first project cards.
 * Module cards open a screenshot carousel; client builds link straight to the
 * live site. No big inline imagery — the screens live behind a click.
 */
export default function ProjectShowcase({
  eyebrow,
  title,
  blurb,
  galleries
}: {
  eyebrow: string;
  title: string;
  blurb?: string;
  galleries: Gallery[];
}) {
  const [open, setOpen] = useState<Gallery | null>(null);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        eyebrow={eyebrow}
        eyebrowClassName="text-xs uppercase tracking-[0.2em] text-accent"
        title={title}
        blurb={blurb}
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {galleries.map((g, i) => (
          <ProjectCard key={g.id} g={g} index={i} onOpen={() => setOpen(g)} />
        ))}
      </div>

      <AnimatePresence>
        {open && <Carousel gallery={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  g,
  index,
  onOpen
}: {
  g: Gallery;
  index: number;
  onOpen: () => void;
}) {
  const isClient = Boolean(g.live);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="glass group flex flex-col rounded-2xl p-6 transition-colors hover:border-accent/40 sm:p-7"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl font-bold tracking-tight">{g.name}</h3>
        <span className="text-[11px] uppercase tracking-[0.14em] text-muted">{g.tagline}</span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">{g.whatItIs}</p>

      {/* Key features */}
      <ul className="mt-4 space-y-1.5">
        {g.features.slice(0, isClient ? 3 : 5).map((f) => (
          <li key={f} className="flex gap-2.5 text-sm leading-snug text-fg/85">
            <span
              className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
              style={{ background: 'rgb(var(--accent))' }}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Engineering highlight */}
      {!isClient && (
        <p
          className="mt-4 border-l-2 pl-3 text-[13px] italic leading-snug text-muted"
          style={{ borderColor: 'rgb(var(--accent) / 0.5)' }}
        >
          <Zap className="mr-1 inline h-3.5 w-3.5 align-[-2px]" style={{ color: 'rgb(var(--accent))' }} />
          {g.highlight}
        </p>
      )}

      {/* Stack */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {g.stack.map((s) => (
          <span key={s} className="chip">{s}</span>
        ))}
      </div>

      {/* Action */}
      <div className="mt-6 flex items-center justify-between pt-1">
        <span className="text-xs text-muted">
          {isClient ? 'Client build' : `${g.shots.length} screens`}
        </span>
        {isClient ? (
          <a
            href={g.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-all hover:gap-2.5"
            style={{ color: 'rgb(var(--accent))' }}
          >
            Visit live <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-all hover:gap-2.5"
            style={{ color: 'rgb(var(--accent))' }}
          >
            <Images className="h-4 w-4" /> View screens
          </button>
        )}
      </div>
    </motion.article>
  );
}

function Carousel({ gallery, onClose }: { gallery: Gallery; onClose: () => void }) {
  const shots = gallery.shots;
  const [i, setI] = useState(0);
  const next = useCallback(() => setI((n) => (n + 1) % shots.length), [shots.length]);
  const prev = useCallback(() => setI((n) => (n - 1 + shots.length) % shots.length), [shots.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [next, prev, onClose]);

  const shot = shots[i];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <motion.figure
        key={i}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="flex max-h-full w-full max-w-5xl flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shot.src}
          alt={shot.caption}
          className="max-h-[78vh] w-auto rounded-lg border border-white/10 object-contain shadow-2xl"
        />
        <figcaption className="text-center text-sm text-white/80">
          <span className="font-semibold text-white">{gallery.name}</span> · {shot.caption}
          <span className="text-white/50"> — {i + 1} / {shots.length}</span>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}
