"use client";

import { ItineraryDay } from "@/app/data/itinerary";
// TODO: Import Framer Motion
// import { motion } from "framer-motion";
import { DayEventBlock } from "./DayEventBlock";

interface DayTimelineCardProps {
  timeline: ItineraryDay["timeline"];
}

/**
 * DayTimelineCard - Main content card with timeline events
 * 
 * Layout:
 * - Sits on top of lower part of hero (negative margin)
 * - Rounded corners, soft shadow, lots of padding
 * - White/ivory background
 * 
 * Motion:
 * - Fade in from 12px below
 * - Duration: 500ms
 * - Delay: 100ms after hero
 * - Easing: easeOut
 */
export function DayTimelineCard({ timeline }: DayTimelineCardProps) {
  const timeBlocks: Array<{ timeOfDay: keyof typeof timeline; events: typeof timeline[keyof typeof timeline] }> = [];
  
  // Build ordered array of time blocks
  if (timeline.morning?.length) {
    timeBlocks.push({ timeOfDay: "morning", events: timeline.morning });
  }
  if (timeline.afternoon?.length) {
    timeBlocks.push({ timeOfDay: "afternoon", events: timeline.afternoon });
  }
  if (timeline.evening?.length) {
    timeBlocks.push({ timeOfDay: "evening", events: timeline.evening });
  }
  if (timeline.night?.length) {
    timeBlocks.push({ timeOfDay: "night", events: timeline.night });
  }

  return (
    <div
      className="rounded-3xl border border-[#134E4A]/10 bg-white/95 p-6 shadow-lg backdrop-blur-sm sm:p-8"
      // TODO: Add Framer Motion
      // initial: opacity 0, y: 12px
      // animate: opacity 1, y: 0
      // transition: duration 500ms, delay 100ms, easeOut
    >
      {timeBlocks.map((block) => (
        <DayEventBlock
          key={block.timeOfDay}
          timeOfDay={block.timeOfDay}
          events={block.events!}
        />
      ))}
    </div>
  );
}

