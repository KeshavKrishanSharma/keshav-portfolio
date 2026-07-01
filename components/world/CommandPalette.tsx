'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Blocks,
  LineChart,
  Palette,
  Bot,
  Home,
  FileText,
  Download,
  Mail,
  Linkedin,
  Github,
  Search,
  CornerDownLeft,
  type LucideIcon
} from 'lucide-react';
import { useWorldTransition } from './TransitionProvider';
import { worlds, TECH_RESUME, LEADERSHIP_RESUME } from '@/lib/worlds';
import { profile } from '@/lib/data';

/**
 * CommandPalette — global ⌘K / Ctrl+K launcher mounted once for the whole site.
 * Switches persona worlds (via the morph transition), opens résumés, and jumps
 * to contact links. Fully keyboard-driven: ⌘K toggles, ↑/↓ move, ↵ runs, Esc
 * closes. Themed with CSS vars so it matches whichever world is active.
 */

type Action = {
  id: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  keywords?: string;
  run: (nav: (href: string, accent?: string) => void) => void;
};

const ICON: Record<string, LucideIcon> = {
  engineer: Blocks,
  strategist: LineChart,
  designer: Palette,
  lab: Bot
};

function buildActions(): Action[] {
  const worldActions: Action[] = worlds.map((w) => ({
    id: `world-${w.id}`,
    label: `Go to the ${w.name}`,
    hint: `Door ${w.num}`,
    icon: ICON[w.id],
    keywords: `${w.id} world persona ${w.vibe}`,
    run: (nav) => nav(`/${w.id}`, w.accent)
  }));

  return [
    ...worldActions,
    {
      id: 'home',
      label: 'Back to the doors',
      hint: 'Home',
      icon: Home,
      keywords: 'landing start lenses',
      run: (nav) => nav('/', '#6366f1')
    },
    {
      id: 'resume',
      label: 'Open the full résumé',
      hint: 'One-page',
      icon: FileText,
      keywords: 'cv recruiter classic',
      run: (nav) => nav('/resume', '#6366f1')
    },
    {
      id: 'download-tech',
      label: 'Download résumé — Full-stack',
      icon: Download,
      keywords: 'pdf engineer developer cv',
      run: () => window.open(TECH_RESUME, '_blank')
    },
    {
      id: 'download-lead',
      label: 'Download résumé — Leadership',
      icon: Download,
      keywords: 'pdf manager strategist em pm cv',
      run: () => window.open(LEADERSHIP_RESUME, '_blank')
    },
    {
      id: 'email',
      label: 'Email Keshav',
      hint: profile.email,
      icon: Mail,
      keywords: 'contact mail hire',
      run: () => window.open(`mailto:${profile.email}`)
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      keywords: 'social profile connect',
      run: () => window.open(profile.socials.linkedin, '_blank')
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: Github,
      keywords: 'social code repos',
      run: () => window.open(profile.socials.github, '_blank')
    }
  ];
}

export default function CommandPalette() {
  const { navigate } = useWorldTransition();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = useMemo(buildActions, []);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) =>
      `${a.label} ${a.hint ?? ''} ${a.keywords ?? ''}`.toLowerCase().includes(q)
    );
  }, [actions, query]);

  // Global ⌘K / Ctrl+K toggle + "/" to open when not typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('palette:open', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('palette:open', onOpen);
    };
  }, []);

  // Reset + focus on open.
  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const choose = (a: Action) => {
    setOpen(false);
    a.run(navigate);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9990] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* scrim */}
          <button
            aria-label="Close command palette"
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong relative z-10 w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === 'Enter') {
                e.preventDefault();
                const a = results[active];
                if (a) choose(a);
              }
            }}
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="h-4 w-4 flex-shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a world, résumé, or contact…"
                className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-muted"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-muted sm:inline">
                ESC
              </kbd>
            </div>

            <ul className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted">
                  No matches for “{query}”.
                </li>
              )}
              {results.map((a, i) => {
                const on = i === active;
                const Icon = a.icon;
                return (
                  <li key={a.id}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => choose(a)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors"
                      style={
                        on
                          ? {
                              background: 'rgb(var(--accent) / 0.14)',
                              boxShadow: 'inset 0 0 0 1px rgb(var(--accent) / 0.35)'
                            }
                          : undefined
                      }
                    >
                      <span
                        className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg"
                        style={{
                          background: 'rgb(var(--surface))',
                          border: '1px solid rgb(var(--border))',
                          color: on ? 'rgb(var(--accent))' : 'rgb(var(--muted))'
                        }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1 text-sm text-fg">{a.label}</span>
                      {a.hint && (
                        <span className="text-[11px] text-muted">{a.hint}</span>
                      )}
                      {on && (
                        <CornerDownLeft className="h-3.5 w-3.5 text-muted" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-muted">
              <span>↑↓ to navigate · ↵ to select</span>
              <span>⌘K / Ctrl K anywhere</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
