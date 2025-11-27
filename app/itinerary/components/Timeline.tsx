"use client";

import { TimelineEvent } from "@/app/data/itinerary-detailed";

interface TimelineProps {
  events: TimelineEvent[];
}

/**
 * Timeline - Vertical timeline with mango gold line and jungle green nodes
 */
export function Timeline({ events }: TimelineProps) {
  if (events.length === 0) return null;

  return (
    <div className="relative pl-6">
      {/* Vertical Line */}
      <div className="absolute left-2 top-0 h-full w-0.5 bg-highlight" />

      {/* Events */}
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={index} className="relative">
            {/* Node */}
            <div className="absolute -left-7 top-1.5 h-4 w-4 rounded-full bg-accent-1 ring-4 ring-background" />

            {/* Event Content */}
            <div className="pb-6 last:pb-0">
              <div className="mb-1 font-sans text-sm font-semibold text-text-primary">
                {event.time}
              </div>
              <h4 className="mb-1 font-sans text-base font-medium text-text-primary">
                {event.title}
              </h4>
              <p className="mb-1 font-sans text-sm text-text-muted">{event.location}</p>
              {event.note && (
                <p className="font-sans text-sm leading-relaxed text-text-muted">
                  {event.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

