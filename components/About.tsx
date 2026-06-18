'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Brain, Rocket } from 'lucide-react';
import { profile } from '@/lib/data';

function Portrait() {
  const [ok, setOk] = useState(true);
  return (
    <div className="relative mx-auto mb-8 h-28 w-28 sm:h-32 sm:w-32">
      <div
        aria-hidden
        className="absolute -inset-1 rounded-full opacity-70 blur-md"
        style={{
          background:
            'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-3)))'
        }}
      />
      <div className="relative h-full w-full overflow-hidden rounded-full border border-border bg-surface">
        {profile.portrait && ok ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.portrait}
            alt={profile.name}
            onError={() => setOk(false)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="grid h-full w-full place-items-center font-display text-3xl font-bold text-white"
            style={{
              background:
                'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-3)))'
            }}
          >
            {profile.initials}
          </div>
        )}
      </div>
    </div>
  );
}

const PILLARS = [
  {
    icon: Code2,
    title: 'Solutions Architect',
    body: 'Day job: bridging product, policy, and engineering. Translating regulatory complexity into clean APIs and systems that hold up at national scale.'
  },
  {
    icon: Brain,
    title: 'Prompt Engineer · Gen AI Dev',
    body: 'Off the clock: building LLM-powered tools, designing prompts, running evals, shipping AI features that actually work.'
  },
  {
    icon: Rocket,
    title: 'Currently learning · Agentic AI',
    body: 'Going deep on tool-using agents, orchestration, and MCP. Tech evolves; I evolve with it. The learning path never ends.'
  }
];

export default function About() {
  return (
    <section id="about" className="section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <Portrait />
        <span className="section-eyebrow">
          <Sparkles className="h-3 w-3" /> About
        </span>
        <h2 className="heading">
          A builder who <span className="text-gradient">never stops learning</span>.
        </h2>
        <div className="mt-6 space-y-4 text-left text-base leading-relaxed text-muted sm:text-center sm:text-lg">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </motion.div>

      {/* Pillars */}
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass group relative overflow-hidden rounded-3xl p-6 transition-all hover:-translate-y-1 hover:border-accent/40 sm:p-8"
              data-cursor="hover"
            >
              <div
                className="mb-4 grid h-12 w-12 place-items-center rounded-2xl text-white shadow-lg"
                style={{
                  background:
                    'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-3)))'
                }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(60% 60% at 50% 0%, rgb(var(--accent) / 0.18), transparent)'
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
