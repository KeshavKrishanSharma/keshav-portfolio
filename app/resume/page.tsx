import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Aurora from '@/components/Aurora';
import Cursor from '@/components/Cursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Architecture from '@/components/Architecture';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { profile } from '@/lib/data';

export const metadata: Metadata = {
  title: `${profile.name} — Résumé`,
  description: profile.tagline,
  alternates: { canonical: `${profile.siteUrl}/resume` }
};

// The classic one-page view — the recruiter fast-path linked from the doors.
export default function ResumePage() {
  return (
    <>
      <Aurora />
      <Cursor />
      <Navbar />
      <main className="relative">
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Projects />
        <Architecture />
        <Skills />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />

      {/* Back to the playful experience */}
      <Link
        href="/"
        className="glass fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium shadow-lg transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        The doors
      </Link>
    </>
  );
}
