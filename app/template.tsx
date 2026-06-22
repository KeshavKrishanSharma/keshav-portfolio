'use client';

import { motion } from 'framer-motion';

// Re-mounts on every route change — gives each world a gentle "arrive" fade
// that pairs with the circle-reveal morph from TransitionProvider.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
