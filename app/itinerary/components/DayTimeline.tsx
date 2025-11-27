"use client";

import { ItineraryDay } from "@/app/data/itinerary";
import { TimelineItem } from "./TimelineItem";

interface DayTimelineProps {
  days: ItineraryDay[];
  activeDayId: string;
  onDaySelect: (dayId: string) => void;
}

/**
 * DayTimeline - Sticky horizontal navigation bar
 * 
 * Layout:
 * - Desktop: Pinned below hero on scroll, full width horizontal bar
 * - Mobile: Horizontal scrollable pill bar
 * 
 * Motion:
 * - Active pill: scale 1.05, opacity 1, filled background
 * - Inactive pills: scale 1.0, opacity 0.7, outlined
 * - Transition: 200ms easeOut
 */
export function DayTimeline({ days, activeDayId, onDaySelect }: DayTimelineProps) {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#134E4A]/10 bg-white/95 backdrop-blur-sm"
      // TODO: Add sticky positioning - appears after hero scrolls past
    >
      {/* Desktop: horizontal bar */}
      <div className="hidden md:block">
        <div className="container mx-auto flex items-center justify-center gap-4 px-4 py-4">
          {days.map((day) => (
            <TimelineItem
              key={day.id}
              day={day}
              isActive={activeDayId === day.id}
              onClick={() => onDaySelect(day.id)}
            />
          ))}
        </div>
      </div>

      {/* Mobile: horizontal scrollable pills */}
      <div className="md:hidden">
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 py-4">
          {days.map((day) => (
            <TimelineItem
              key={day.id}
              day={day}
              isActive={activeDayId === day.id}
              onClick={() => onDaySelect(day.id)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

