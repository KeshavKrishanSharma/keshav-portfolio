'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { profile } from '@/lib/data';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Work' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#skills', label: 'Skills' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'top-2 sm:top-3' : 'top-0'
      }`}
    >
      <nav
        className={`mx-auto flex w-full items-center gap-3 transition-all duration-300 ${
          scrolled
            ? 'glass mx-3 max-w-[calc(100%-1.5rem)] rounded-2xl px-4 py-2.5 sm:mx-6 sm:max-w-[calc(100%-3rem)] sm:px-5 sm:py-3'
            : 'max-w-7xl px-5 py-4 sm:px-8 sm:py-5'
        }`}
      >
        {/* LEFT GROUP — logo + desktop nav links */}
        <div className="flex flex-1 items-center gap-6">
          <a
            href="#hero"
            className="group flex flex-shrink-0 items-center gap-2.5 font-display text-base font-bold tracking-tight"
            data-cursor="hover"
          >
            <span
              className="grid h-9 w-9 place-items-center rounded-xl text-white shadow-lg"
              style={{
                background:
                  'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-3)))'
              }}
            >
              KK
            </span>
            <span className="hidden sm:inline">{profile.shortName}</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-cursor="hover"
                  className="rounded-full px-3 py-1.5 text-sm text-fg/75 transition-colors hover:bg-glass hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT GROUP — actions */}
        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden !px-4 !py-2 sm:inline-flex"
            data-cursor="hover"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
          <button
            className="glass grid h-10 w-10 place-items-center rounded-full lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong mx-3 mt-3 rounded-2xl p-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium hover:bg-glass"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-2 w-full"
                >
                  <Download className="h-4 w-4" /> Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
