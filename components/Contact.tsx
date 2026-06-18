'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, ArrowUpRight, Sparkles } from 'lucide-react';
import { profile } from '@/lib/data';

export default function Contact() {
  return (
    <section id="contact" className="section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong relative overflow-hidden rounded-[36px] p-8 sm:p-12 md:p-16"
      >
        {/* Decorative orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{ background: 'rgb(var(--accent))' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full opacity-40 blur-3xl"
          style={{ background: 'rgb(var(--accent-3))' }}
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span className="section-eyebrow">
              <Sparkles className="h-3 w-3" /> Let&apos;s build something
            </span>
            <h2 className="heading mt-3">
              Got an idea worth <span className="text-gradient">scaling</span>?
            </h2>
            <p className="mt-5 max-w-lg text-base text-muted sm:text-lg">
              I&apos;m open to architect-level roles, freelance builds, and Gen-AI
              collaborations. The fastest path to me is email.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="btn-primary"
                data-cursor="hover"
              >
                <Mail className="h-4 w-4" /> {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
                className="btn"
                data-cursor="hover"
              >
                <Phone className="h-4 w-4" /> {profile.phone}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {profile.location}
              </span>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-fg"
              >
                <Github className="h-3.5 w-3.5" /> GitHub{' '}
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-fg"
              >
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn{' '}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Mini "calling card" */}
          <div className="relative">
            <div
              className="glass relative aspect-[1.6/1] w-full max-w-md rounded-3xl p-7"
              style={{
                background:
                  'linear-gradient(135deg, rgb(var(--surface) / 0.85), rgb(var(--glass) / 0.6))'
              }}
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
                    The card
                  </div>
                  <div className="mt-3 font-display text-2xl font-bold leading-tight">
                    {profile.name}
                  </div>
                  <div className="mt-1 text-sm text-muted">
                    Solutions Architect · Technical Lead
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-xs text-muted">
                    <div>{profile.email}</div>
                    <div>{profile.phone}</div>
                  </div>
                  <div
                    className="grid h-12 w-12 place-items-center rounded-2xl text-white"
                    style={{
                      background:
                        'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-3)))'
                    }}
                  >
                    <span className="font-display text-base font-bold">KK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
