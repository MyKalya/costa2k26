"use client";

import { ItineraryDay } from "@/app/data/itinerary";
// TODO: Import Framer Motion
// import { motion } from "framer-motion";

interface TimelineItemProps {
  day: ItineraryDay;
  isActive: boolean;
  onClick: () => void;
}

/**
 * TimelineItem - Single day pill in the timeline navigation
 * 
 * Content:
 * - "Day {dayNumber} . {dateLabel}" + shortLabel
 * - Example: "Day 1 . Fri Feb 13" + "Arrival"
 * 
 * Motion:
 * - Active: scale 1.05, opacity 1, filled jungle green background
 * - Inactive: scale 1.0, opacity 0.7, outlined
 * - Transition: 200ms easeOut
 */
export function TimelineItem({ day, isActive, onClick }: TimelineItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      // TODO: Add Framer Motion with scale and opacity variants
      // TODO: Active state: filled bg-[#134E4A] text-white
      // TODO: Inactive state: outlined border-2 border-[#134E4A]/30
      className={`
        flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium
        transition-all duration-200 ease-out
        ${isActive 
          ? "scale-105 bg-[#134E4A] text-white shadow-md" 
          : "scale-100 border-2 border-[#134E4A]/30 bg-white text-[#134E4A] opacity-70 hover:opacity-90"
        }
      `}
    >
      <span>Day {day.dayNumber}</span>
      <span className="opacity-50">·</span>
      <span>{day.dateLabel}</span>
      <span className="font-semibold">{day.shortLabel}</span>
    </button>
  );
}

