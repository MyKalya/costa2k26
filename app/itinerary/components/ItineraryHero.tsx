"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ItineraryDay } from "@/app/data/itinerary";

interface ItineraryHeroProps {
  days: ItineraryDay[];
  activeDayId: string;
  onDaySelect: (dayId: string) => void;
  onViewDay: (dayId: string) => void;
}

/**
 * ItineraryHero - Interactive hero section with day overview
 * 
 * Features:
 * - Full-width hero with background image and gradient overlay
 * - Horizontal day strip (scrollable on mobile)
 * - Active day teaser card
 * - Smooth animations and interactions
 * - Collapses to sticky bar when scrolling past
 */
export function ItineraryHero({ days, activeDayId, onDaySelect, onViewDay }: ItineraryHeroProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax transform for background image
  const backgroundY = useTransform(scrollY, [0, 600], [0, 100]);
  
  // Detect when hero is scrolled past
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setIsCollapsed(rect.bottom < 100);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeDay = days.find((d) => d.id === activeDayId) || days[0];

  // Collapsed sticky bar
  if (isCollapsed) {
    return (
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 border-b border-[#134E4A]/10 bg-white/95 backdrop-blur-sm shadow-sm"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Trip title */}
            <h1 className="text-lg font-semibold text-[#134E4A]">Your Week in Paradise</h1>
            
            {/* Slim day strip */}
            <div className="flex flex-1 items-center justify-end gap-2 overflow-x-auto">
              {days.map((day) => (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => {
                    onDaySelect(day.id);
                    onViewDay(day.id);
                  }}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    day.id === activeDayId
                      ? "bg-[#134E4A] text-white shadow-md"
                      : "border border-[#134E4A]/30 bg-white text-[#134E4A]"
                  }`}
                >
                  Day {day.dayNumber}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>
    );
  }

  // Full hero
  return (
    <motion.section
      ref={heroRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ 
          y: backgroundY,
          backgroundImage: "url('/media/itinerary/itinerary-hero.png')",
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#134E4A]/40 via-[#134E4A]/60 to-[#134E4A]/80" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Top Section: Eyebrow, Heading, Subcopy */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center text-white">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4 text-sm font-medium uppercase tracking-wide opacity-90"
          >
            Costa Rica After Party · Feb 13–18
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="mb-4 text-5xl font-bold sm:text-6xl"
          >
            Your Week in Paradise
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl text-lg opacity-90 sm:text-xl"
          >
            Six days of beach, adventure, and celebration with friends in Costa Rica.
          </motion.p>
        </div>

        {/* Bottom Section: Day Strip + Teaser Card */}
        <div className="px-4 pb-12 sm:pb-16">
          <div className="container mx-auto max-w-6xl">
            {/* Day Strip */}
            <div className="mb-6">
              <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {days.map((day) => (
                  <button
                    key={day.id}
                    type="button"
                    onClick={() => onDaySelect(day.id)}
                    className={`shrink-0 snap-center rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                      day.id === activeDayId
                        ? "scale-105 bg-[#134E4A] text-white shadow-lg"
                        : "scale-100 border-2 border-white/40 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                    }`}
                  >
                    <span>Day {day.dayNumber}</span>
                    <span className="mx-1.5 opacity-70">·</span>
                    <span>{day.shortLabel}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Day Teaser Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDayId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative rounded-3xl border border-white/20 bg-white/95 p-6 shadow-xl backdrop-blur-sm sm:p-8"
              >
                {/* Accent Stripe */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-[#FF6B6B] via-[#FFA07A] to-[#FFD700]" />

                {/* Card Content */}
                <div className="pt-2">
                  <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[#134E4A] opacity-70">
                    Day {activeDay.dayNumber} · {activeDay.dateLabel}
                  </p>
                  
                  <h2 className="mb-3 text-2xl font-bold text-[#1F2A2A] sm:text-3xl">
                    {activeDay.title}
                  </h2>
                  
                  <p className="mb-6 text-base leading-relaxed text-[#4C625E] sm:text-lg">
                    {activeDay.heroTagline}
                  </p>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => onViewDay(activeDayId)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#134E4A] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0F3D2E] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#134E4A]/20"
                  >
                    <span>View this day</span>
                    <span>→</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

