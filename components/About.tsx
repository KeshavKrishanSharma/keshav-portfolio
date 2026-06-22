'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Brain, Rocket, Layers } from 'lucide-react';
import { profile } from '@/lib/data';

function Portrait() {
  const [ok, setOk] = useState(true);
  return (
    <div className="relative mx-auto mb-8 h-28 w-28 sm:h-32 sm:w-32">
      <div
        aria-hidden
        className="absolute -inset-1 rounded-full opacity-70 blur-md"
        style={{
          background: 'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-3)))'
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
              background: 'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-3)))'
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
    title: 'Full-Stack Engineer · 3.5 years',
    body: 'I build production systems end to end — PHP/Yii2 backends and MySQL schemas to React 19 TypeScript frontends. Four enterprise modules on Samarth, running 100+ universities across India.'
  },
  {
    icon: Layers,
    title: 'Growing into Product',
    body: '3.5 years at the intersection of user needs, engineering tradeoffs, and real deployment. I gather requirements, design the system, ship the code, then watch it run. I\'m ready to own the product, not just the code.'
  },
  {
    icon: Brain,
    title: 'Gen AI Beginner. Deliberately.',
    body: 'Diving into LLMs and agentic AI as a beginner — and completely fine with that. I learn by building, breaking, and going again. Eat, sleep, learn, repeat. And rest. The path never ends.'
  }
];

const NOW = [
  { label: 'Currently at', value: 'IIITD · Samarth national platform' },
  { label: 'Building', value: 'Gen AI side projects + this site' },
  { label: 'Learning', value: 'LLMs · agentic AI · product thinking' },
  { label: 'I believe', value: 'The engineer who understands the product is the most valuable one in the room' }
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
                  background: 'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-3)))'
                }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(60% 60% at 50% 0%, rgb(var(--accent) / 0.18), transparent)'
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Now card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong mt-8 overflow-hidden rounded-3xl"
        style={{ borderColor: 'rgb(var(--accent) / 0.3)' }}
      >
        <div className="flex items-center gap-3 border-b border-border px-7 py-5">
          <Rocket className="h-4 w-4" style={{ color: 'rgb(var(--accent))' }} />
          <span
            className="text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: 'rgb(var(--accent))' }}
          >
            Now
          </span>
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {NOW.map((item) => (
            <div key={item.label} className="bg-surface px-6 py-5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{item.label}</p>
              <p className="mt-2 text-sm font-medium leading-snug">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
