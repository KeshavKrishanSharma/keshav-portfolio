'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Cloud, Layers, RefreshCw } from 'lucide-react';
import { SectionHeading } from '@/components/Reveal';

/**
 * AffiliationEngine — the signature engineering piece for the Affiliation
 * module: the automatic fee → bill engine. Grounded in the real models
 * (afm_confi_free_and_programme_type fee-heads with a per-subject/course/flat
 * basis, afm_application_late_fee date windows, afm_application_bill with a
 * detailed_calculation + grand_total) and the DownloadJob export queue.
 * Amounts are illustrative — no real institution data.
 */

const LINE_ITEMS = [
  { head: 'Affiliation fee', basis: 'flat', amount: 25000 },
  { head: 'Programme fee', basis: 'per programme', amount: 18000 },
  { head: 'Continuation fee', basis: 'per course', amount: 42000 },
  { head: 'Inspection fee', basis: 'per committee', amount: 12000 },
  { head: 'Late fee', basis: 'session window', amount: 5000, late: true }
];
const TOTAL = LINE_ITEMS.reduce((s, i) => s + i.amount, 0);

function Money({ value, run }: { value: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const dur = 900;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return <>₹{n.toLocaleString('en-IN')}</>;
}

const STEPS = [
  'Fee heads configured once — per affiliation-type × institution × programme-type, each with a basis (flat / per-course / per-subject) and a cost.',
  'For an application, the engine resolves its programmes → courses → subjects.',
  'Each head is priced by its basis × the resolved count × cost.',
  'If the submission falls inside the session’s late-fee date window, the late fee is added.',
  'A bill is emitted — an itemized detailed_calculation + grand_total, timestamped per application.'
];

export default function AffiliationEngine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        eyebrow={'// signature engine · affiliation'}
        eyebrowClassName="font-mono-tight text-sm text-accent"
        title={<>Automatic fee &amp; billing</>}
        blurb={
          <>
            Fees aren&apos;t typed in — they&apos;re derived. Configure the fee heads once;
            the engine prices every application and emits an itemized bill. When a session is
            set to <span style={{ color: 'rgb(var(--accent))' }}>AUTO</span>, no human touches a number.
          </>
        }
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* ── The generated bill ─────────────────────────────────── */}
        <div className="glass-strong overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <span className="font-mono-tight text-xs text-muted">afm_application_bill</span>
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]"
              style={{ background: 'rgb(var(--accent) / 0.15)', color: 'rgb(var(--accent))' }}
            >
              AUTO
            </span>
          </div>

          <div className="px-5 py-4">
            {LINE_ITEMS.map((it, i) => (
              <motion.div
                key={it.head}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between py-2 text-sm"
              >
                <span className="flex items-center gap-2">
                  <span className="text-fg/90">{it.head}</span>
                  <span
                    className="rounded px-1.5 py-0.5 text-[10px]"
                    style={{
                      background: it.late ? 'rgb(var(--accent-3) / 0.15)' : 'rgb(var(--surface))',
                      color: it.late ? 'rgb(var(--accent-3))' : 'rgb(var(--muted))',
                      border: '1px solid rgb(var(--border))'
                    }}
                  >
                    {it.basis}
                  </span>
                </span>
                <span className="font-mono-tight text-fg/80">
                  ₹{it.amount.toLocaleString('en-IN')}
                </span>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.15 + LINE_ITEMS.length * 0.12 }}
              className="mt-3 flex items-center justify-between border-t border-border pt-4"
            >
              <span className="text-sm font-semibold">grand_total</span>
              <span
                className="font-display text-2xl font-bold tabular-nums"
                style={{ color: 'rgb(var(--accent))' }}
              >
                <Money value={TOTAL} run={inView} />
              </span>
            </motion.div>
          </div>
          <p className="border-t border-border px-5 py-2.5 text-[11px] text-muted">
            Illustrative figures — the real engine reads configured fee heads.
          </p>
        </div>

        {/* ── How it derives ─────────────────────────────────────── */}
        <ol className="space-y-3">
          {STEPS.map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass flex gap-3.5 rounded-xl px-4 py-3.5"
            >
              <span
                className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full text-xs font-bold"
                style={{ background: 'rgb(var(--accent) / 0.15)', color: 'rgb(var(--accent))' }}
              >
                {i + 1}
              </span>
              <span className="text-sm leading-snug text-fg/85">{s}</span>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* ── Background export queue ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="glass-strong mt-6 rounded-2xl px-5 py-5 sm:px-7"
      >
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" style={{ color: 'rgb(var(--accent))' }} />
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'rgb(var(--accent))' }}>
            Bulk export · background job queue
          </p>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-3 text-sm">
          {[
            { icon: Layers, label: 'Request' },
            { icon: null, label: 'yii\\queue' },
            { icon: null, label: 'Worker · streaming XLSX' },
            { icon: null, label: '25k rows/sheet · GC + 85% mem-guard' },
            { icon: Cloud, label: 'S3 · retry / backoff' },
            { icon: null, label: 'cron progress (live)' }
          ].map((n, i, arr) => {
            const Icon = n.icon;
            return (
              <span key={n.label} className="flex items-center gap-1.5">
                <span className="chip whitespace-nowrap">
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {n.label}
                </span>
                {i < arr.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-muted" />
                )}
              </span>
            );
          })}
        </div>
        <p className="mt-3 text-[13px] text-muted">
          Hundreds of colleges export without OOM — memory-bounded streaming, resumable
          progress, and S3 delivery, all off the request thread.
        </p>
      </motion.div>
    </section>
  );
}
