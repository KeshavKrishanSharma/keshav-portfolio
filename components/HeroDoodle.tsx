'use client';

import { motion } from 'framer-motion';

/**
 * HeroDoodle — playful, hand-drawn-style SVG of a developer at work.
 * Pure SVG + Framer Motion (no canvas, no WebGL). Renders crisp at any size.
 *
 * - Sketch-in animation on first paint (stroke-dasharray)
 * - Gentle bobbing on the character + laptop
 * - Animated typing indicator on the screen
 * - Floating code/UX doodles orbiting the scene
 * - Steam from the coffee mug
 * - Theme-reactive: uses CSS variables --accent / --accent-2 / --accent-3
 */
export default function HeroDoodle() {
  // Reusable framer transition presets
  const drawIn = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { duration: 1.6, delay, ease: 'easeInOut' }, opacity: { duration: 0.3, delay } }
  });

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  });

  return (
    <div className="relative h-full w-full">
      <motion.svg
        viewBox="0 0 600 540"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-label="Illustration of a developer working at a laptop"
        role="img"
      >
        {/* ───────── Background dotted grid ───────── */}
        <defs>
          <pattern id="dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgb(var(--accent) / 0.18)" />
          </pattern>
          <linearGradient id="screenGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="rgb(var(--accent-3))" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="hairGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--accent))" />
            <stop offset="100%" stopColor="rgb(var(--accent-3))" />
          </linearGradient>
        </defs>

        <motion.rect
          width="600"
          height="540"
          fill="url(#dots)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* ───────── Big soft halo behind subject ───────── */}
        <motion.circle
          cx="300"
          cy="270"
          r="180"
          fill="rgb(var(--accent) / 0.08)"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* ───────── Floating doodle: braces ───────── */}
        <motion.g
          {...fadeIn(0.4)}
          style={{ originX: '70px', originY: '120px' }}
        >
          <motion.g
            animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <text
              x="60"
              y="120"
              fontFamily="var(--font-mono), ui-monospace"
              fontSize="38"
              fontWeight="700"
              fill="rgb(var(--accent))"
            >
              {'<>'}
            </text>
          </motion.g>
        </motion.g>

        {/* ───────── Floating doodle: curly braces ───────── */}
        <motion.g {...fadeIn(0.55)}>
          <motion.g
            animate={{ y: [0, 12, 0], rotate: [6, -6, 6] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <text
              x="500"
              y="100"
              fontFamily="var(--font-mono), ui-monospace"
              fontSize="34"
              fontWeight="700"
              fill="rgb(var(--accent-3))"
            >
              {'{ }'}
            </text>
          </motion.g>
        </motion.g>

        {/* ───────── Floating doodle: semicolon ───────── */}
        <motion.g {...fadeIn(0.7)}>
          <motion.g
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <text
              x="510"
              y="380"
              fontFamily="var(--font-mono), ui-monospace"
              fontSize="32"
              fontWeight="700"
              fill="rgb(var(--accent-2))"
            >
              {';'}
            </text>
          </motion.g>
        </motion.g>

        {/* ───────── Floating sparkle / lightbulb ───────── */}
        <motion.g {...fadeIn(0.8)}>
          <motion.g
            animate={{ y: [0, -14, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* lightbulb */}
            <circle cx="80" cy="350" r="14" fill="rgb(var(--accent-3) / 0.18)" stroke="rgb(var(--accent-3))" strokeWidth="2.2" />
            <path d="M80 365 L80 372" stroke="rgb(var(--accent-3))" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M75 369 L85 369" stroke="rgb(var(--accent-3))" strokeWidth="2.2" strokeLinecap="round" />
            {/* shine */}
            <motion.g
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <line x1="60" y1="335" x2="65" y2="340" stroke="rgb(var(--accent-3))" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="100" y1="335" x2="95" y2="340" stroke="rgb(var(--accent-3))" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="80" y1="325" x2="80" y2="332" stroke="rgb(var(--accent-3))" strokeWidth="1.6" strokeLinecap="round" />
            </motion.g>
          </motion.g>
        </motion.g>

        {/* ───────── Wavy line doodles (sketch-in) ───────── */}
        <motion.path
          d="M 30 220 Q 70 200 110 220 T 180 220"
          fill="none"
          stroke="rgb(var(--accent))"
          strokeWidth="2.4"
          strokeLinecap="round"
          {...drawIn(0.6)}
        />
        <motion.path
          d="M 460 230 Q 500 215 540 235 T 580 230"
          fill="none"
          stroke="rgb(var(--accent-3))"
          strokeWidth="2.4"
          strokeLinecap="round"
          {...drawIn(0.7)}
        />

        {/* ───────── Desk surface (slightly tilted ellipse for depth) ───────── */}
        <motion.ellipse
          cx="300"
          cy="450"
          rx="220"
          ry="22"
          fill="rgb(var(--accent) / 0.1)"
          stroke="rgb(var(--accent) / 0.4)"
          strokeWidth="2"
          {...drawIn(0.2)}
        />

        {/* ───────── Bobbing group: laptop + character ───────── */}
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Coffee mug */}
          <motion.g {...fadeIn(0.9)}>
            {/* steam wisps */}
            <motion.path
              d="M148 280 q-6 -10 0 -22 q6 -10 0 -22"
              stroke="rgb(var(--muted))"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              animate={{ opacity: [0, 0.7, 0], y: [0, -10, -22] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.path
              d="M158 280 q-6 -10 0 -22 q6 -10 0 -22"
              stroke="rgb(var(--muted))"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              animate={{ opacity: [0, 0.7, 0], y: [0, -10, -22] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 0.7 }}
            />
            {/* mug body */}
            <rect x="135" y="305" width="36" height="46" rx="6" fill="rgb(var(--surface))" stroke="rgb(var(--accent))" strokeWidth="2.4" />
            {/* mug handle */}
            <path d="M171 318 q14 3 14 14 q0 11 -14 14" fill="none" stroke="rgb(var(--accent))" strokeWidth="2.4" strokeLinecap="round" />
            {/* mug heart */}
            <path d="M147 322 c-1.5 -3 -6 -3 -6 1 c0 3 6 7 6 7 c0 0 6 -4 6 -7 c0 -4 -4.5 -4 -6 -1z" fill="rgb(var(--accent-3))" />
          </motion.g>

          {/* Laptop base */}
          <motion.g {...fadeIn(0.3)}>
            <path
              d="M180 410 L420 410 L440 440 L160 440 Z"
              fill="rgb(var(--surface))"
              stroke="rgb(var(--fg))"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <line
              x1="270"
              y1="425"
              x2="330"
              y2="425"
              stroke="rgb(var(--fg))"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Laptop screen */}
          <motion.g
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect
              x="190"
              y="240"
              width="220"
              height="170"
              rx="10"
              fill="url(#screenGrad)"
              stroke="rgb(var(--fg))"
              strokeWidth="2.4"
            />
            {/* Browser/window dots */}
            <circle cx="206" cy="256" r="3.5" fill="rgb(var(--accent-3))" />
            <circle cx="218" cy="256" r="3.5" fill="rgb(var(--accent-2))" />
            <circle cx="230" cy="256" r="3.5" fill="rgb(var(--accent))" />
            <line x1="246" y1="256" x2="396" y2="256" stroke="rgb(var(--fg) / 0.25)" strokeWidth="1.5" strokeLinecap="round" />

            {/* code lines (typing animation) */}
            <motion.line
              x1="206" y1="282" x2="270" y2="282"
              stroke="rgb(var(--accent))" strokeWidth="3" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            />
            <motion.line
              x1="220" y1="298" x2="320" y2="298"
              stroke="rgb(var(--fg) / 0.7)" strokeWidth="3" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
            />
            <motion.line
              x1="220" y1="314" x2="290" y2="314"
              stroke="rgb(var(--accent-3))" strokeWidth="3" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            />
            <motion.line
              x1="234" y1="330" x2="354" y2="330"
              stroke="rgb(var(--fg) / 0.5)" strokeWidth="3" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 0.7 }}
            />
            <motion.line
              x1="234" y1="346" x2="300" y2="346"
              stroke="rgb(var(--accent-2))" strokeWidth="3" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 1.7, duration: 0.6 }}
            />
            {/* blinking cursor */}
            <motion.rect
              x="306" y="340" width="3" height="13" fill="rgb(var(--accent))"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />

            {/* small heart in corner — joy of building */}
            <motion.path
              d="M388 385 c-2 -4 -8 -4 -8 1 c0 4 8 9 8 9 c0 0 8 -5 8 -9 c0 -5 -6 -5 -8 -1z"
              fill="rgb(var(--accent-3))"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '388px 390px' }}
            />
          </motion.g>

          {/* Character — head, body, hands on laptop */}
          <motion.g {...fadeIn(0.6)}>
            {/* hair tuft */}
            <path
              d="M270 198 q22 -22 60 -8 q14 6 12 26 q-12 -8 -28 -6 q-18 2 -34 -4 q-12 -4 -10 -8z"
              fill="url(#hairGrad)"
            />
            {/* head */}
            <circle cx="300" cy="222" r="28" fill="rgb(var(--surface))" stroke="rgb(var(--fg))" strokeWidth="2.4" />
            {/* hair front */}
            <path
              d="M275 212 q12 -16 28 -10 q18 4 22 14"
              fill="none"
              stroke="rgb(var(--fg))"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* eyes (closed/blinking happy arcs) */}
            <motion.g
              animate={{ scaleY: [1, 0.15, 1] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 1.2, times: [0, 0.5, 1] }}
              style={{ transformOrigin: '300px 222px' }}
            >
              <path d="M289 222 q3 -4 6 0" fill="none" stroke="rgb(var(--fg))" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M305 222 q3 -4 6 0" fill="none" stroke="rgb(var(--fg))" strokeWidth="2.4" strokeLinecap="round" />
            </motion.g>
            {/* smile */}
            <path d="M293 234 q7 6 14 0" fill="none" stroke="rgb(var(--fg))" strokeWidth="2.4" strokeLinecap="round" />
            {/* cheeks */}
            <circle cx="285" cy="231" r="2.8" fill="rgb(var(--accent-3) / 0.5)" />
            <circle cx="315" cy="231" r="2.8" fill="rgb(var(--accent-3) / 0.5)" />

            {/* body (hidden behind screen but a hint shows) */}
            <path
              d="M268 252 q-10 16 -8 28 M332 252 q10 16 8 28"
              fill="none"
              stroke="rgb(var(--fg))"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </motion.g>
        </motion.g>

        {/* ───────── Sticky note doodle bottom-left ───────── */}
        <motion.g {...fadeIn(1.0)}>
          <motion.g
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '90px 460px' }}
          >
            <rect x="50" y="430" width="80" height="70" rx="3" fill="rgb(var(--accent-3) / 0.18)" stroke="rgb(var(--accent-3))" strokeWidth="1.8" />
            <line x1="60" y1="450" x2="118" y2="450" stroke="rgb(var(--accent-3))" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="60" y1="464" x2="105" y2="464" stroke="rgb(var(--accent-3))" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="60" y1="478" x2="115" y2="478" stroke="rgb(var(--accent-3))" strokeWidth="1.6" strokeLinecap="round" />
          </motion.g>
        </motion.g>

        {/* ───────── Plant in pot bottom-right ───────── */}
        <motion.g {...fadeIn(0.85)}>
          <motion.g
            animate={{ rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '510px 470px' }}
          >
            {/* leaves */}
            <path d="M510 460 q-22 -20 -28 -50 q14 6 30 20 q-1 12 -2 30z" fill="rgb(var(--accent) / 0.55)" stroke="rgb(var(--accent))" strokeWidth="2" />
            <path d="M510 460 q22 -20 28 -50 q-14 6 -30 20 q1 12 2 30z" fill="rgb(var(--accent-2) / 0.55)" stroke="rgb(var(--accent-2))" strokeWidth="2" />
            <path d="M510 460 q-2 -32 -2 -50 q4 4 6 24 q0 14 -4 26z" fill="rgb(var(--accent) / 0.7)" stroke="rgb(var(--accent))" strokeWidth="1.6" />
            {/* pot */}
            <path d="M488 460 L532 460 L526 498 L494 498 Z" fill="rgb(var(--accent-3) / 0.5)" stroke="rgb(var(--accent-3))" strokeWidth="2.2" strokeLinejoin="round" />
            <line x1="490" y1="470" x2="530" y2="470" stroke="rgb(var(--accent-3))" strokeWidth="1.6" />
          </motion.g>
        </motion.g>

        {/* ───────── Tiny sparkle stars ───────── */}
        {[
          { cx: 130, cy: 80, d: 0.2 },
          { cx: 540, cy: 170, d: 0.6 },
          { cx: 50, cy: 280, d: 1.0 },
          { cx: 470, cy: 460, d: 1.3 }
        ].map((s, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: s.d, ease: 'easeInOut' }}
          >
            <path
              d={`M${s.cx} ${s.cy - 6} L${s.cx + 1.5} ${s.cy - 1.5} L${s.cx + 6} ${s.cy} L${s.cx + 1.5} ${s.cy + 1.5} L${s.cx} ${s.cy + 6} L${s.cx - 1.5} ${s.cy + 1.5} L${s.cx - 6} ${s.cy} L${s.cx - 1.5} ${s.cy - 1.5} Z`}
              fill="rgb(var(--accent))"
            />
          </motion.g>
        ))}
      </motion.svg>
    </div>
  );
}
