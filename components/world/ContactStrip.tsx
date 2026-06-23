'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import { profile } from '@/lib/data';

const LINKS = [
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    icon: Mail,
    display: profile.email
  },
  {
    label: 'LinkedIn',
    href: profile.socials.linkedin,
    icon: Linkedin,
    display: 'linkedin.com/in/keshav-krishan'
  },
  {
    label: 'GitHub',
    href: profile.socials.github,
    icon: Github,
    display: 'github.com/KeshavKrishanSharma'
  }
];

export default function ContactStrip() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong overflow-hidden rounded-3xl"
        style={{ borderColor: 'rgb(var(--accent) / 0.3)' }}
      >
        <div className="px-7 py-8 sm:px-10 sm:py-10">
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'rgb(var(--accent))' }}>
            Let&apos;s connect
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Open to the right opportunity.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">
            Full-stack engineer with 3.5 years building national-scale systems. Growing into Product and Gen AI.
            If you&apos;re working on something interesting — reach out.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            {LINKS.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3.5 text-sm transition-colors hover:border-accent/50"
                >
                  <Icon className="h-4 w-4 flex-shrink-0" style={{ color: 'rgb(var(--accent))' }} />
                  <span className="font-medium">{link.display}</span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
