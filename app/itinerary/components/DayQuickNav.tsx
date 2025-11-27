"use client";

import { DayQuickNavItem } from "./DayQuickNavItem";

interface DayQuickNavProps {
  days: Array<{
    id: string;
    dayNumber: number;
    label: string;
  }>;
}

/**
 * DayQuickNav - Horizontal scrollable row of day CTA pills
 */
export function DayQuickNav({ days }: DayQuickNavProps) {
  return (
    <div className="w-full overflow-x-auto px-4 py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex snap-x snap-mandatory gap-3">
        {days.map((day, index) => (
          <DayQuickNavItem
            key={day.id}
            dayNumber={day.dayNumber}
            label={day.label}
            dayId={day.id}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

