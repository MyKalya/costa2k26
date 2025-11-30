"use client";

import { motion } from "framer-motion";

interface HeroSectionProps {
  onViewDays: () => void;
}

/**
 * HeroSection - Simplified, clean hero with single CTA
 */
export function HeroSection({ onViewDays }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/media/itinerary/itinerary-hero.png')",
          backgroundColor: "#0E3D2F", // Fallback jungle green
        }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/45 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-center px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <p className="mb-4 text-sm font-medium uppercase tracking-wider opacity-90 drop-shadow-md">
            Costa2K26
          </p>

          {/* Main Title */}
          <h1 className="mb-4 font-display text-5xl font-bold drop-shadow-md sm:text-6xl md:text-7xl">
            Trip Itinerary
          </h1>

          {/* Subtitle */}
          <p className="mb-8 text-lg font-sans drop-shadow-md sm:text-xl">
            Six days in Costa Rica, all in one place.
          </p>

          {/* Primary CTA Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onViewDays}
            className="rounded-full bg-[#1C4034] px-6 py-3 font-sans text-base font-semibold text-white shadow-lg transition-shadow duration-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            View days
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
