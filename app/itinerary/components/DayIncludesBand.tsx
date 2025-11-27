"use client";

import { DayIncludes } from "@/app/data/itinerary";
// TODO: Import Framer Motion
// import { motion } from "framer-motion";

interface DayIncludesBandProps {
  includes: DayIncludes[];
  themeColor: string;
}

interface IncludeChipProps {
  include: DayIncludes;
  themeColor: string;
  index: number;
}

/**
 * DayIncludesBand - Horizontal band of visual chips
 * 
 * Layout:
 * - Slightly overlaps hero image (negative margin top)
 * - Horizontal scroll on mobile, horizontal flex on desktop
 * - 3-6 chips showing what the day includes
 * 
 * Motion:
 * - Chips stagger in from left to right
 * - Stagger delay: 80-120ms per chip
 * - Initial: opacity 0, x: -20px
 * - Animate: opacity 1, x: 0
 * - Duration: 400ms
 * 
 * Hover:
 * - Scale: 1.0 → 1.03
 * - Shadow: subtle increase
 * - Y: 0 → -2px (subtle raise)
 * - Duration: 200ms
 */
export function DayIncludesBand({ includes, themeColor }: DayIncludesBandProps) {
  return (
    <div className="relative z-20 -mt-8 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-wrap justify-center gap-3">
          {includes.map((include, index) => (
            <IncludeChip
              key={index}
              include={include}
              themeColor={themeColor}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function IncludeChip({ include, themeColor, index }: IncludeChipProps) {
  return (
    <div
      className="flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/90 px-4 py-2.5 text-sm font-medium backdrop-blur-sm"
      style={{
        // TODO: Add gradient background using themeColor
        // background: `linear-gradient(135deg, ${themeColor}20, ${themeColor}40)`,
      }}
      // TODO: Add Framer Motion with stagger
      // initial: opacity 0, x: -20
      // animate: opacity 1, x: 0
      // transition: delay index * 100ms, duration 400ms
      // whileHover: scale 1.03, y: -2, shadow increase
    >
      {/* TODO: Add icon if include.icon exists */}
      {include.icon && <span>{/* Icon component */}</span>}
      <span>{include.label}</span>
      {include.description && (
        <span className="ml-1 text-xs opacity-70">{include.description}</span>
      )}
    </div>
  );
}

