'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState
} from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import CommandPalette from './CommandPalette';
import KonamiEgg from './KonamiEgg';

type Origin = { x: number; y: number };

interface TransitionCtx {
  /** Morph to `href`, expanding a circle of `accent` from `origin` (or screen centre). */
  navigate: (href: string, accent?: string, origin?: Origin) => void;
}

const Ctx = createContext<TransitionCtx | null>(null);

export function useWorldTransition() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error('useWorldTransition must be used within <TransitionProvider>');
  return ctx;
}

interface MorphState {
  href: string;
  accent: string;
  origin: Origin;
  phase: 'expand' | 'reveal';
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [morph, setMorph] = useState<MorphState | null>(null);

  const navigate = useCallback<TransitionCtx['navigate']>(
    (href, accent = '#6366f1', origin) => {
      const o =
        origin ??
        (typeof window !== 'undefined'
          ? { x: window.innerWidth / 2, y: window.innerHeight / 2 }
          : { x: 0, y: 0 });

      // Respect reduced-motion: just route, no animation.
      if (reduce || typeof window === 'undefined') {
        router.push(href);
        return;
      }
      router.prefetch?.(href);
      setMorph({ href, accent, origin: o, phase: 'expand' });
    },
    [reduce, router]
  );

  // Radius that covers the farthest corner from the origin.
  const coverDiameter = (o: Origin) => {
    if (typeof window === 'undefined') return 3000;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dx = Math.max(o.x, w - o.x);
    const dy = Math.max(o.y, h - o.y);
    return Math.hypot(dx, dy) * 2 + 80;
  };

  return (
    <Ctx.Provider value={{ navigate }}>
      {children}

      <CommandPalette />
      <KonamiEgg />

      <AnimatePresence>
        {morph && (
          <div className="morph-overlay" aria-hidden>
            <motion.span
              key="circle"
              style={{
                position: 'absolute',
                left: morph.origin.x,
                top: morph.origin.y,
                width: coverDiameter(morph.origin),
                height: coverDiameter(morph.origin),
                marginLeft: -coverDiameter(morph.origin) / 2,
                marginTop: -coverDiameter(morph.origin) / 2,
                borderRadius: '9999px',
                background: `radial-gradient(circle, ${morph.accent} 0%, ${morph.accent} 55%, ${morph.accent}00 100%)`
              }}
              initial={{ scale: 0, opacity: 0.9 }}
              animate={
                morph.phase === 'expand'
                  ? { scale: 1, opacity: 1 }
                  : { scale: 1, opacity: 0 }
              }
              transition={{
                duration: morph.phase === 'expand' ? 0.55 : 0.5,
                ease: [0.16, 1, 0.3, 1]
              }}
              onAnimationComplete={() => {
                if (morph.phase === 'expand') {
                  router.push(morph.href);
                  // Give the new route a beat to paint, then reveal it.
                  setMorph((m) => (m ? { ...m, phase: 'reveal' } : m));
                } else {
                  setMorph(null);
                }
              }}
            />
          </div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
