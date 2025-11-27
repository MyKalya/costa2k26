"use client";

import { motion } from "framer-motion";

/**
 * FooterActions - Simple footer with download and share actions
 */
export function FooterActions() {
  return (
    <footer className="mx-auto max-w-3xl px-4 py-12 text-center">
      <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-2xl border-2 border-border bg-surface px-6 py-3 font-sans text-sm font-semibold text-text-primary transition-shadow sm:w-auto hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1/50"
        >
          Download itinerary
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-2xl border-2 border-border bg-surface px-6 py-3 font-sans text-sm font-semibold text-text-primary transition-shadow sm:w-auto hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1/50"
        >
          Share with friends
        </motion.button>
      </div>
      <p className="font-sans text-xs text-text-muted">Costa2K26</p>
    </footer>
  );
}

