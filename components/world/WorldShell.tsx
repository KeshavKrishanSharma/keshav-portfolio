'use client';

import Link from 'next/link';
import { Download, ArrowUpLeft, Command } from 'lucide-react';
import Aurora from '@/components/Aurora';
import PersonaPill from './PersonaPill';
import { useWorldTransition } from './TransitionProvider';
import { worldById, type WorldId } from '@/lib/worlds';

/**
 * WorldShell — the chrome shared by all three worlds.
 * Applies the world's scoped theme (data-world), paints full-bleed, and adds
 * the top bar (monogram → doors, résumé) + the always-on PersonaPill.
 * Pages pass their world-specific content as children.
 */
export default function WorldShell({
  worldId,
  children
}: {
  worldId: WorldId;
  children: React.ReactNode;
}) {
  const world = worldById(worldId)!;
  const { navigate } = useWorldTransition();

  return (
    <div data-world={worldId} className="world-root">
      <Aurora />

      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 sm:py-5">
          <button
            onClick={(e) =>
              navigate('/', '#6366f1', { x: e.clientX, y: e.clientY })
            }
            className="group flex items-center gap-2.5"
            aria-label="Back to the doors"
          >
            <span
              className="monogram grid h-9 w-9 place-items-center rounded-xl text-sm text-white shadow-lg"
              style={{
                background:
                  'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-3)))'
              }}
            >
              KKS
            </span>
            <span className="hidden items-center gap-1.5 text-sm text-muted transition-colors group-hover:text-fg sm:flex">
              <ArrowUpLeft className="h-3.5 w-3.5" />
              the doors
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new Event('palette:open'))}
              className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs text-muted transition-colors hover:text-fg sm:inline-flex"
              aria-label="Open command palette"
            >
              <Command className="h-3.5 w-3.5" />
              <kbd className="font-sans">K</kbd>
            </button>
            <a
              href={world.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-4 !py-2"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Résumé</span>
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">{children}</main>

      {/* Recruiter fast-path always reachable */}
      <div className="relative z-10 pb-28 pt-10 text-center">
        <Link
          href="/resume"
          className="text-sm text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
        >
          Prefer the classic one-page résumé? →
        </Link>
      </div>

      <PersonaPill current={worldId} />
    </div>
  );
}
