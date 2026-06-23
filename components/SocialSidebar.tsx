'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, FileDown } from 'lucide-react';
import { profile } from '@/lib/data';

const links = [
  { href: `mailto:${profile.email}`, label: 'Email', Icon: Mail },
  { href: profile.socials.linkedin, label: 'LinkedIn', Icon: Linkedin, external: true },
  { href: profile.socials.github, label: 'GitHub', Icon: Github, external: true },
  { href: profile.resumeUrl, label: 'Download Résumé', Icon: FileDown, download: true },
];

export default function SocialSidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-5 z-40 hidden flex-col items-center gap-3 lg:flex xl:left-7"
      aria-label="Social links"
    >
      {links.map(({ href, label, Icon, external, download }) => (
        <a
          key={label}
          href={href}
          title={label}
          aria-label={label}
          download={download || undefined}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="group flex h-9 w-9 items-center justify-center rounded-full text-muted transition-all duration-200 hover:scale-110 hover:text-fg"
          style={{ background: 'rgb(var(--glass) / 0.6)', border: '1px solid rgb(var(--border))' }}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <div className="mt-1 h-20 w-px" style={{ background: 'rgb(var(--border) / 0.6)' }} />
    </motion.aside>
  );
}
