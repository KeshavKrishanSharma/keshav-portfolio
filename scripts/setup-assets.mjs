// scripts/setup-assets.mjs
// One-time setup: copies the resume + non-private certificates from the
// project root into /public so Next.js can serve them as static files.
// Runs automatically before `npm run dev` and `npm run build`.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_CERTS = path.join(ROOT, 'public', 'certificates');
const PUBLIC_ROOT = path.join(ROOT, 'public');

fs.mkdirSync(PUBLIC_CERTS, { recursive: true });

// Source -> destination mapping (relative to project root)
// IMPORTANT: We deliberately exclude the Aadhaar PDF (it is a private
// government ID and should never be published).
const COPIES = [
  {
    // Full-stack / technical résumé — served on /resume and in the
    // Engineer + Designer worlds.
    src: 'Keshav-Resume-FullStack.pdf',
    dest: path.join(PUBLIC_ROOT, 'resume.pdf')
  },
  {
    src: 'ai certificate 1.pdf',
    dest: path.join(PUBLIC_CERTS, 'ai-certificate.pdf')
  },
  {
    src: 'certificate-pk6qvfo97z5t-1776952332.pdf',
    dest: path.join(PUBLIC_CERTS, 'certificate-additional.pdf')
  },
  {
    src: 'learnings_cleancode - Copy/promt engineering certificate.pdf',
    dest: path.join(PUBLIC_CERTS, 'prompt-engineering.pdf')
  },
  {
    src: 'learnings_cleancode - Copy/UC-37c9e226-b1eb-4595-a755-e73648f8d666.pdf',
    dest: path.join(PUBLIC_CERTS, 'udemy-clean-code.pdf')
  },
  {
    src: 'learnings_cleancode - Copy/Control-Structures-Summary.pdf',
    dest: path.join(PUBLIC_CERTS, 'clean-code-control-structures.pdf')
  },
  {
    src: 'learnings_cleancode - Copy/Objects-Summary.pdf',
    dest: path.join(PUBLIC_CERTS, 'clean-code-objects.pdf')
  },
  {
    src: 'learnings_cleancode - Copy/Checklist.pdf',
    dest: path.join(PUBLIC_CERTS, 'clean-code-checklist.pdf')
  },
  {
    src: 'learnings_cleancode - Copy/cir1.pdf',
    dest: path.join(PUBLIC_CERTS, 'cir1.pdf')
  }
];

let copied = 0;
let skipped = 0;

for (const { src, dest } of COPIES) {
  const srcPath = path.join(ROOT, src);
  if (!fs.existsSync(srcPath)) {
    console.warn(`[setup-assets] missing: ${src}`);
    skipped++;
    continue;
  }
  // Skip if dest already up to date
  try {
    const s = fs.statSync(srcPath);
    if (fs.existsSync(dest)) {
      const d = fs.statSync(dest);
      if (d.size === s.size && d.mtimeMs >= s.mtimeMs) {
        skipped++;
        continue;
      }
    }
    fs.copyFileSync(srcPath, dest);
    copied++;
    console.log(`[setup-assets] copied  ${src}  ->  ${path.relative(ROOT, dest)}`);
  } catch (err) {
    console.error(`[setup-assets] failed ${src}: ${err.message}`);
  }
}

// ── Leadership / "stats" résumé (served in the Strategist world) ──────────
// Drop the management-focused PDF in the project root as one of the names
// below and it will be published at /resume-leadership.pdf. Until you do, the
// Strategist world gracefully falls back to the standard résumé so the
// download link never 404s.
const LEADERSHIP_SOURCES = [
  'Keshav-Resume-Management.pdf',
  'Keshav Krishan Sharma – Resume (Management).pdf',
  'Keshav Krishan Sharma – Resume (Leadership).pdf',
  'resume-leadership.pdf',
  'resume-management.pdf'
];
const leadershipDest = path.join(PUBLIC_ROOT, 'resume-leadership.pdf');
const leadershipSrc = LEADERSHIP_SOURCES.map((s) => path.join(ROOT, s)).find(
  (p) => fs.existsSync(p)
);
try {
  if (leadershipSrc) {
    fs.copyFileSync(leadershipSrc, leadershipDest);
    console.log(`[setup-assets] copied leadership résumé -> resume-leadership.pdf`);
  } else if (fs.existsSync(path.join(PUBLIC_ROOT, 'resume.pdf'))) {
    fs.copyFileSync(path.join(PUBLIC_ROOT, 'resume.pdf'), leadershipDest);
    console.log(
      `[setup-assets] no leadership résumé found — fell back to resume.pdf`
    );
  }
} catch (err) {
  console.error(`[setup-assets] leadership résumé: ${err.message}`);
}

console.log(`[setup-assets] done. copied=${copied} skipped=${skipped}`);
