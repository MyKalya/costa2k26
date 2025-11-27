"use client";

import { ItineraryDay } from "@/app/data/itinerary";
// TODO: Import Framer Motion
// import { motion } from "framer-motion";

interface DayHeroPanelProps {
  day: ItineraryDay;
}

/**
 * DayHeroPanel - Hero image with gradient overlay and text
 * 
 * Layout:
 * - Full width, top of day section
 * - Background image (day-specific hero image)
 * - Gradient overlay using day.themeColor
 * - Text overlay: day number, date, title, subtitle
 * 
 * Motion:
 * - Fade in + slight upward slide on viewport enter
 * - Duration: 600ms, easing: easeOut
 */
export function DayHeroPanel({ day }: DayHeroPanelProps) {
  return (
    <div
      className="relative h-[60vh] w-full overflow-hidden sm:h-[70vh]"
      // TODO: Add Framer Motion variants
      // initial: opacity 0, y: 20px
      // animate: opacity 1, y: 0
      // transition: duration 600ms, easeOut
    >
      {/* Background Image */}
      {day.heroImageSrc && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${day.heroImageSrc})`,
          }}
        />
      )}

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${day.themeColor}40, ${day.themeColor}80)`,
        }}
      />

      {/* Text Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        {/* Day Label */}
        <p className="mb-2 text-sm font-medium uppercase tracking-wide opacity-90">
          Day {day.dayNumber}
        </p>

        {/* Date */}
        <p className="mb-4 text-lg opacity-80">{day.dateLabel}</p>

        {/* Title */}
        <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
          {day.title}
        </h2>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg opacity-90">
          {day.subtitle}
        </p>
      </div>
    </div>
  );
}

