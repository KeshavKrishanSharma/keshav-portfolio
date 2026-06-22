'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Gallery } from '@/lib/gallery';

/**
 * Showcase — real product screenshots, presented properly.
 * Module tabs → one large featured screen + a thumbnail strip + a click-to-zoom
 * lightbox (keyboard + arrows). Screens are pre-cropped to the app UI (no
 * browser chrome). `tilted` adds a playful lean for the Designer world.
 */
export default function Showcase({
  eyebrow,
  title,
  blurb,
  galleries,
  tilted = false
}: {
  eyebrow: string;
  title: string;
  blurb?: string;
  galleries: Gallery[];
  tilted?: boolean;
}) {
  const [g, setG] = useState(0);
  const [s, setS] = useState(0);
  const [zoom, setZoom] = useState(false);

  const group = galleries[g];
  const shots = group.shots;
  const shot = shots[s];

  const selectGroup = (i: number) => {
    setG(i);
    setS(0);
  };
  const next = useCallback(() => setS((i) => (i + 1) % shots.length), [shots.length]);
  const prev = useCallback(() => setS((i) => (i - 1 + shots.length) % shots.length), [shots.length]);

  // Lightbox keyboard control + scroll lock
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoom(false);
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [zoom, next, prev]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'rgb(var(--accent))' }}>
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {blurb && <p className="mt-4 max-w-2xl text-muted">{blurb}</p>}
      </motion.div>

      {/* Module tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {galleries.map((gl, i) => {
          const on = i === g;
          return (
            <button
              key={gl.id}
              onClick={() => selectGroup(i)}
              className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
              style={on ? { color: 'rgb(var(--accent))' } : undefined}
            >
              {on && (
                <motion.span
                  layoutId={`showcase-tab-${title}`}
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'rgb(var(--accent) / 0.12)', border: '1px solid rgb(var(--accent) / 0.4)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className={`relative z-10 ${on ? '' : 'text-muted'}`}>{gl.name}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <p className="text-sm text-muted">{group.tagline}</p>
        <p className="font-mono-tight text-xs text-muted">
          {String(s + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}
        </p>
      </div>

      {/* Featured screen */}
      <div className="mt-4">
        <motion.button
          type="button"
          onClick={() => setZoom(true)}
          whileHover={{ y: -4 }}
          style={{ rotate: tilted ? -1 : 0 }}
          className="group relative block w-full overflow-hidden rounded-2xl border shadow-xl"
          aria-label="Enlarge screenshot"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={`${group.id}-${s}`}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={shot.caption}
                loading="lazy"
                className="aspect-[16/9] w-full bg-surface object-cover object-top"
              />
            </motion.span>
          </AnimatePresence>

          {/* caption + zoom hint */}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
            <span className="text-sm font-medium text-white">{shot.caption}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <Maximize2 className="h-3 w-3" /> enlarge
            </span>
          </span>
        </motion.button>

        {/* Thumbnail strip */}
        <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
          {shots.map((sh, i) => (
            <button
              key={sh.src}
              onClick={() => setS(i)}
              className="relative h-14 w-24 flex-shrink-0 overflow-hidden rounded-lg border transition-all sm:h-16 sm:w-28"
              style={{
                borderColor: i === s ? 'rgb(var(--accent))' : 'rgb(var(--border))',
                opacity: i === s ? 1 : 0.55
              }}
              aria-label={sh.caption}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sh.src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4 backdrop-blur-sm sm:p-10"
            onClick={() => setZoom(false)}
          >
            <button
              onClick={() => setZoom(false)}
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
              key={`${group.id}-${s}-lb`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="flex max-h-full max-w-5xl flex-col items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={shot.caption}
                className="max-h-[80vh] w-auto rounded-lg border border-white/10 object-contain shadow-2xl"
              />
              <figcaption className="text-sm text-white/80">
                {group.name} · {shot.caption} &nbsp;—&nbsp; {s + 1} of {shots.length}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
