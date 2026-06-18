'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X, FileText } from 'lucide-react';
import { certifications } from '@/lib/data';

export default function Certifications() {
  const [active, setActive] = useState<number | null>(null);

  // Lock body scroll when modal open
  useEffect(() => {
    if (active !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <section id="certifications" className="section">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 max-w-2xl"
      >
        <span className="section-eyebrow">
          <Award className="h-3 w-3" /> Certifications
        </span>
        <h2 className="heading">
          Receipts for the <span className="text-gradient">learning</span>.
        </h2>
        <p className="mt-4 text-base text-muted sm:text-lg">
          Tap any card to preview the credential. The list grows — I&apos;m always picking up
          a new track.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <motion.button
            key={c.title}
            onClick={() => c.file && setActive(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.04, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className={`glass group relative overflow-hidden rounded-2xl p-5 text-left transition-colors hover:border-accent/40 ${
              c.file ? 'cursor-pointer' : 'cursor-default'
            }`}
            data-cursor={c.file ? 'hover' : undefined}
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.accent}`} />
            <div className="flex items-start justify-between gap-4">
              <div
                className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${c.accent} text-white`}
              >
                <Award className="h-5 w-5" />
              </div>
              {c.file ? (
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent">
                  Preview →
                </span>
              ) : (
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
                  Listed
                </span>
              )}
            </div>
            <h3 className="mt-4 font-display text-base font-semibold leading-tight">
              {c.title}
            </h3>
            <p className="mt-1 text-xs text-muted">{c.issuer}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && certifications[active]?.file && (
          <CertModal
            title={certifications[active].title}
            issuer={certifications[active].issuer}
            file={certifications[active].file!}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function CertModal({
  title,
  issuer,
  file,
  onClose
}: {
  title: string;
  issuer: string;
  file: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 12 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="glass-strong relative flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-semibold sm:text-lg">
              {title}
            </h3>
            <p className="truncate text-xs text-muted">{issuer}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={file}
              target="_blank"
              rel="noopener noreferrer"
              className="btn !py-2 !text-xs"
              aria-label="Open in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Open
            </a>
            <button
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-accent"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* PDF viewer */}
        <div className="relative flex-1 bg-bg/50">
          <iframe
            src={`${file}#view=FitH`}
            title={title}
            className="h-full w-full"
            // sandbox kept default — same-origin static asset
          />
          <noscript>
            <div className="absolute inset-0 grid place-items-center text-sm text-muted">
              <a href={file} className="btn-primary">
                <FileText className="h-4 w-4" /> View PDF
              </a>
            </div>
          </noscript>
        </div>
      </motion.div>
    </motion.div>
  );
}
