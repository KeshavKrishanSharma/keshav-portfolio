'use client';

import { useCallback, useRef, useState } from 'react';
import { GripVertical } from 'lucide-react';
import { SectionHeading } from '@/components/Reveal';

/**
 * BeforeAfter — the Designer world's signature piece. A draggable comparison
 * between a typical government-default form (cramped, jargon, default controls)
 * and the operator-first redesign Keshav ships. Both sides are rendered in
 * HTML so it stays crisp and needs no screenshot assets.
 * Pointer + keyboard accessible (slider role).
 */
export default function BeforeAfter() {
  const [pos, setPos] = useState(52); // % revealed of the "after" side
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, pct)));
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow="Before / after"
        title="Same data. Different respect for the operator."
        blurb="Government tools are usually built for the database, not the human at the desk. Drag to compare the default with the redesign — bigger type, plain language, and a flow that finishes without a manual."
      />

      <div
        ref={wrapRef}
        className="relative mt-8 aspect-[16/10] w-full select-none overflow-hidden rounded-3xl border border-border shadow-xl sm:aspect-[16/9]"
        onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerLeave={() => (dragging.current = false)}
      >
        {/* AFTER (base layer, full) */}
        <div className="absolute inset-0">
          <AfterForm />
          <span
            className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{ background: 'rgb(var(--accent))', color: 'white' }}
          >
            After · the redesign
          </span>
        </div>

        {/* BEFORE (full-size layer, clipped from the right) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <BeforeForm />
          <span className="absolute left-3 top-3 rounded-full bg-zinc-700 px-2.5 py-1 text-[11px] font-semibold text-white">
            Before · the default
          </span>
        </div>

        {/* Handle */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Reveal the redesign"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onPointerDown={() => (dragging.current = true)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPos((p) => Math.max(2, p - 4));
            if (e.key === 'ArrowRight') setPos((p) => Math.min(98, p + 4));
          }}
          className="absolute inset-y-0 z-10 flex w-8 -translate-x-1/2 cursor-ew-resize items-center justify-center"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/90" />
          <span
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-zinc-800 shadow-lg"
          >
            <GripVertical className="h-4 w-4" />
          </span>
        </div>
      </div>
    </section>
  );
}

/* ── The ugly default ─────────────────────────────────────────────────── */
function BeforeForm() {
  return (
    <div className="h-full overflow-hidden bg-[#f4f4f0] p-4 font-serif text-[12px] text-[#1a1a1a]">
      <div className="border-b-2 border-[#888] pb-1 text-[13px] font-bold text-[#003366]">
        ALLOCATION ENTRY FORM (MODULE: MPDD_ALLOC_V1)
      </div>
      <table className="mt-2 w-full border-collapse">
        <tbody>
          {[
            ['INST_ID *', 'select...'],
            ['ITM_CODE *', ''],
            ['QTY_ALLOC *', '0'],
            ['BENEF_TYP', 'select...'],
            ['RMK_TXT', '']
          ].map(([k, v]) => (
            <tr key={k}>
              <td className="border border-[#bbb] bg-[#e3e3dc] px-1.5 py-1 align-top font-bold">
                {k}
              </td>
              <td className="border border-[#bbb] bg-white px-1.5 py-1">
                <span className="inline-block min-w-[120px] border border-[#999] bg-white px-1 text-[#555]">
                  {v}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 text-[11px] text-[#aa0000]">
        ERR: QTY_ALLOC must satisfy AVAIL_BUCKET constraint [code 4012]
      </div>
      <div className="mt-3 flex gap-2">
        <button className="border border-[#777] bg-[#dcdcdc] px-3 py-0.5 text-[11px]">
          SUBMIT
        </button>
        <button className="border border-[#777] bg-[#dcdcdc] px-3 py-0.5 text-[11px]">
          RESET
        </button>
      </div>
      <p className="mt-3 text-[10px] text-[#777]">
        * mandatory. Use ALL CAPS codes. Contact admin for INST_ID mapping.
      </p>
    </div>
  );
}

/* ── The redesign ─────────────────────────────────────────────────────── */
function AfterForm() {
  return (
    <div className="h-full overflow-hidden bg-surface p-5 sm:p-7">
      <div className="text-base font-semibold text-fg sm:text-lg">New allocation</div>
      <p className="mt-1 text-xs text-muted">
        Assign items to an institution. We&apos;ll check stock for you.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label="Institution" value="Delhi University" />
        <Field label="Item" value="Lab kit — Chemistry" />
        <Field label="Quantity" value="120" hint="248 available now" ok />
        <Field label="Beneficiary" value="First-year students" />
      </div>

      <div
        className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2 text-xs"
        style={{
          background: 'rgb(var(--accent) / 0.1)',
          color: 'rgb(var(--accent))',
          border: '1px solid rgb(var(--accent) / 0.3)'
        }}
      >
        ✓ Stock reserved for 8 hours — you can review before confirming.
      </div>

      <div className="mt-4 flex gap-2">
        <span
          className="rounded-full px-4 py-2 text-xs font-semibold text-white"
          style={{ background: 'rgb(var(--accent))' }}
        >
          Reserve &amp; review
        </span>
        <span className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted">
          Save draft
        </span>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  hint,
  ok
}: {
  label: string;
  value: string;
  hint?: string;
  ok?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium text-muted">{label}</span>
      <span className="mt-1 block rounded-xl border border-border bg-glass px-3 py-2 text-sm text-fg">
        {value}
      </span>
      {hint && (
        <span
          className="mt-1 block text-[11px]"
          style={{ color: ok ? 'rgb(var(--accent))' : 'rgb(var(--muted))' }}
        >
          {hint}
        </span>
      )}
    </label>
  );
}
