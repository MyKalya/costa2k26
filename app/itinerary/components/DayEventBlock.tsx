"use client";

import { DayEvent } from "@/app/data/itinerary";

interface DayEventBlockProps {
  timeOfDay: "morning" | "afternoon" | "evening" | "night";
  events: DayEvent[];
}

/**
 * DayEventBlock - Single time-of-day section within timeline card
 * 
 * Layout:
 * - Label row with time of day pill
 * - Optional time range capsule
 * - Bullet list of events
 * 
 * Content:
 * - Event label (required)
 * - Optional time, location, description
 * - NO cost/price information rendered
 */
export function DayEventBlock({ timeOfDay, events }: DayEventBlockProps) {
  const labels = {
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    night: "Night",
  };

  // TODO: Extract time range from events if applicable
  // const timeRange = events.find(e => e.time)?.time;

  return (
    <div className="mb-6 last:mb-0">
      {/* Label Row */}
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-full bg-[#134E4A]/10 px-3 py-1 text-sm font-semibold text-[#134E4A]">
          {labels[timeOfDay]}
        </span>
        {/* TODO: Show time range capsule if applicable */}
      </div>

      {/* Events List */}
      <ul className="space-y-2">
        {events.map((event, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#134E4A] opacity-60" />
            <div className="flex-1">
              <div className="font-medium text-[#1F2A2A]">{event.label}</div>
              {(event.time || event.location) && (
                <div className="mt-0.5 text-sm text-[#5A6664]">
                  {event.time && <span>{event.time}</span>}
                  {event.time && event.location && <span className="mx-1.5">·</span>}
                  {event.location && <span>{event.location}</span>}
                </div>
              )}
              {event.description && (
                <p className="mt-1 text-sm leading-relaxed text-[#5A6664]">
                  {event.description}
                </p>
              )}
              {/* NO cost/price rendering - event.costNote, event.costMin, event.costMax are ignored */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

