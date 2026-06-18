'use client';

import { profile } from '@/lib/data';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-10 border-t border-border/60 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
        <div>
          © {year} {profile.name}. Built with Next.js, R3F, Framer Motion &amp; Tailwind.
        </div>
        <div className="font-mono uppercase tracking-[0.2em]">
          Always learning · Tech evolves · So do I
        </div>
      </div>
    </footer>
  );
}
