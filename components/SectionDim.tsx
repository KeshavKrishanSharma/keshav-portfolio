'use client';

import { useEffect } from 'react';

/**
 * SectionDim — cinematic focus shift. As a section scrolls up past the top of
 * the viewport it gently dims, so the section entering below feels in-focus.
 * Skips sections marked [data-no-dim] (e.g. scroll-scrubbed/pinned ones).
 * Disabled under prefers-reduced-motion.
 */
export default function SectionDim() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const main = document.querySelector('main');
    if (!main) return;
    const els = (Array.from(main.querySelectorAll('section')) as HTMLElement[]).filter(
      (el) => !el.hasAttribute('data-no-dim')
    );
    if (!els.length) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -50 || r.top > vh) continue;
        let opacity = 1;
        if (r.top < 0) {
          const past = Math.min(1, -r.top / (r.height * 0.7));
          opacity = 1 - past * 0.6; // floor at 0.4
        }
        el.style.opacity = String(opacity);
        el.style.willChange = 'opacity';
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
      els.forEach((e) => {
        e.style.opacity = '';
        e.style.willChange = '';
      });
    };
  }, []);

  return null;
}
