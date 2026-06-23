'use client';

import { useEffect, useState } from 'react';

/**
 * SectionNav — right-edge dot navigation for multi-section world pages.
 * Auto-discovers <section> elements inside <main>, labels each from its
 * heading, tracks the active one via IntersectionObserver, and scrolls to it
 * (through Lenis when present). Desktop only; hides if fewer than 2 sections.
 */
export default function SectionNav() {
  const [sections, setSections] = useState<{ id: string; label: string }[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    const els = Array.from(main.querySelectorAll('section')) as HTMLElement[];
    if (els.length < 2) return;

    const data = els.map((el, i) => {
      if (!el.id) el.id = `sec-${i}`;
      const h = el.querySelector('h1, h2');
      const label = h?.textContent?.trim().replace(/\s+/g, ' ').slice(0, 34) || `Section ${i + 1}`;
      return { id: el.id, label };
    });
    setSections(data);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = els.indexOf(e.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  if (sections.length < 2) return null;

  return (
    <nav
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex xl:right-6"
      aria-label="Section navigation"
    >
      {sections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => go(s.id)}
          className="group flex items-center gap-2"
          aria-label={s.label}
          aria-current={i === active}
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs text-muted opacity-0 transition-all duration-300 group-hover:max-w-[170px] group-hover:opacity-100">
            {s.label}
          </span>
          <span
            className="block h-2 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 22 : 8,
              background: i === active ? 'rgb(var(--accent))' : 'rgb(var(--border))',
            }}
          />
        </button>
      ))}
    </nav>
  );
}
