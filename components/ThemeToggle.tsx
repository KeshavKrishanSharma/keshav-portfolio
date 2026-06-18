'use client';

import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme, type Theme } from '@/app/providers';
import { motion, AnimatePresence } from 'framer-motion';

const ICONS: Record<Theme, React.ComponentType<{ className?: string }>> = {
  light: Sun,
  dark: Moon,
  creative: Sparkles
};

const LABELS: Record<Theme, string> = {
  light: 'Light',
  dark: 'Dark',
  creative: 'Creative'
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const themes: Theme[] = ['light', 'dark', 'creative'];

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="glass relative inline-flex items-center gap-1 rounded-full p-1"
    >
      {themes.map((t) => {
        const Icon = ICONS[t];
        const active = theme === t;
        return (
          <button
            key={t}
            role="radio"
            aria-checked={active}
            aria-label={`${LABELS[t]} theme`}
            onClick={() => setTheme(t)}
            data-cursor="hover"
            className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors sm:h-9 sm:w-9 ${
              active ? 'text-white' : 'text-fg/70 hover:text-fg'
            }`}
          >
            <AnimatePresence>
              {active && (
                <motion.span
                  layoutId="theme-active"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-3)))'
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </AnimatePresence>
            <Icon className="relative z-10 h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}
