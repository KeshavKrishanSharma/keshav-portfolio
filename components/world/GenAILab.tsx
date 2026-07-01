'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Bot } from 'lucide-react';
import { labProjects, type LabProject, type LabProjectStatus } from '@/lib/labProjects';
import { SectionHeading } from '@/components/Reveal';

const STATUS_LABEL: Record<LabProjectStatus, string> = {
  live: 'Live',
  building: 'Building',
  planned: 'Coming soon'
};

const CATEGORY_ICON = {
  'Generative AI': Sparkles,
  'AI Agent': Bot
} as const;

/**
 * GenAILab — project directory for the Lab world. Each card either links out
 * to a project's own live deployment (own repo/stack, linked from this one
 * domain) or is honestly marked "Coming soon" / "Building" until it ships.
 */
export default function GenAILab() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        eyebrow="// the lab"
        eyebrowClassName="text-xs uppercase tracking-[0.2em] text-accent"
        title="Gen AI & agent projects"
        blurb="Each card is its own app — built and deployed independently, linked here as it goes live. No fake demos: a card either opens the real thing or says so."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {labProjects.map((p, i) => (
          <LabCard key={p.id} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function LabCard({ p, index }: { p: LabProject; index: number }) {
  const Icon = CATEGORY_ICON[p.category];
  const isLive = p.status === 'live' && Boolean(p.href);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="glass group flex flex-col rounded-2xl p-6 transition-colors hover:border-accent/40 sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em]"
          style={{
            background: 'rgb(var(--accent) / 0.14)',
            color: 'rgb(var(--accent))',
            border: '1px solid rgb(var(--accent) / 0.3)'
          }}
        >
          <Icon className="h-3.5 w-3.5" />
          {p.category}
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] text-muted"
          style={{ borderColor: 'rgb(var(--border))' }}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${p.status === 'live' ? 'animate-pulse' : ''}`}
            style={{ background: p.status === 'live' ? 'rgb(var(--accent))' : 'rgb(var(--muted))' }}
          />
          {STATUS_LABEL[p.status]}
        </span>
      </div>

      <h3 className="mt-4 font-display text-xl font-bold tracking-tight">{p.title}</h3>
      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">{p.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span key={s} className="chip">{s}</span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between pt-1">
        <span className="text-xs text-muted">
          {isLive ? 'Own repo · own deploy' : 'Not shipped yet'}
        </span>
        {isLive ? (
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-all hover:gap-2.5"
            style={{ color: 'rgb(var(--accent))' }}
          >
            Open project <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <span className="text-sm font-medium text-muted/60">Coming soon</span>
        )}
      </div>
    </motion.article>
  );
}
