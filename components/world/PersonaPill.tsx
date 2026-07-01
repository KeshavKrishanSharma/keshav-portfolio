'use client';

import { useEffect } from 'react';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { worlds, worldById, type WorldId } from '@/lib/worlds';
import { worldIcon } from './icons';
import { useWorldTransition } from './TransitionProvider';

/**
 * Always-on persona switcher. Lives at the bottom of every world.
 * - Click a segment → morph to that world (circle reveal from the click).
 * - Keys 1 / 2 / 3 switch worlds; 0 or H returns to the doors.
 * - The current world's segment is lit in its own accent.
 */
export default function PersonaPill({ current }: { current: WorldId }) {
  const { navigate } = useWorldTransition();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't hijack typing (e.g. the Engineer-world terminal).
      const el = document.activeElement as HTMLElement | null;
      if (
        el &&
        (el.tagName === 'INPUT' ||
          el.tagName === 'TEXTAREA' ||
          el.isContentEditable)
      )
        return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
        const w = worlds.find((x) => String(x.num) === e.key);
        if (w && w.id !== current) navigate(`/${w.id}`, w.accent);
      } else if (e.key === '0' || e.key.toLowerCase() === 'h') {
        navigate('/', '#6366f1');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, navigate]);

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:bottom-6"
    >
      <div className="glass-strong flex items-center gap-1 rounded-full p-1.5 shadow-xl">
        <button
          onClick={(e) => navigate('/', '#6366f1', { x: e.clientX, y: e.clientY })}
          className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-glass hover:text-fg"
          aria-label="Back to the doors"
          title="Back to the doors  ·  press 0"
        >
          <Home className="h-4 w-4" />
        </button>

        <span className="mx-0.5 h-5 w-px bg-border" />

        {worlds.map((w) => {
          const active = w.id === current;
          const Icon = worldIcon[w.id];
          return (
            <button
              key={w.id}
              onClick={(e) =>
                !active && navigate(`/${w.id}`, w.accent, { x: e.clientX, y: e.clientY })
              }
              className="relative flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors sm:px-4"
              style={
                active
                  ? { color: w.accent }
                  : undefined
              }
              title={`${w.name}  ·  press ${w.num}`}
            >
              {active && (
                <motion.span
                  layoutId="persona-active"
                  className="absolute inset-0 rounded-full"
                  style={{ background: `${w.accent}1f`, border: `1px solid ${w.accent}55` }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <Icon
                className="relative z-10 h-4 w-4"
                strokeWidth={active ? 2.25 : 1.75}
                aria-hidden
              />
              <span
                className={`relative z-10 hidden sm:inline ${
                  active ? '' : 'text-muted'
                }`}
              >
                {w.name}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

export function resumeFor(id: WorldId) {
  return worldById(id)?.resume ?? '/resume.pdf';
}
