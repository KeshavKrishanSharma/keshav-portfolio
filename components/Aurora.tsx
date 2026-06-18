'use client';

// Animated aurora gradient blobs that sit behind the entire page.
// CSS-only — zero JS animation cost.

export default function Aurora() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="aurora-blob animate-aurora"
        style={{
          top: '-20%',
          left: '-10%',
          width: '60vw',
          height: '60vw',
          background:
            'radial-gradient(circle at 30% 30%, rgb(var(--aurora-1)), transparent 60%)'
        }}
      />
      <div
        className="aurora-blob animate-aurora"
        style={{
          top: '20%',
          right: '-15%',
          width: '55vw',
          height: '55vw',
          background:
            'radial-gradient(circle at 70% 30%, rgb(var(--aurora-2)), transparent 60%)',
          animationDelay: '-6s'
        }}
      />
      <div
        className="aurora-blob animate-aurora"
        style={{
          bottom: '-25%',
          left: '20%',
          width: '70vw',
          height: '70vw',
          background:
            'radial-gradient(circle at 50% 50%, rgb(var(--aurora-3)), transparent 60%)',
          animationDelay: '-12s'
        }}
      />
      <div className="grain" />
    </div>
  );
}
