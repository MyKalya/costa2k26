"use client";

import { motion } from "framer-motion";
import { DayData } from "@/app/data/itinerary-detailed";

interface DayTabsProps {
  days: DayData[];
  activeDayId: string;
  onDaySelect: (dayId: string) => void;
}

/**
 * DayTabs - Sticky horizontal scrollable day selector
 */
export function DayTabs({ days, activeDayId, onDaySelect }: DayTabsProps) {
  const handleClick = (dayId: string) => {
    onDaySelect(dayId);
    const element = document.getElementById(dayId);
    if (element) {
      const offset = 80; // Sticky nav height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {days.map((day) => {
            const isActive = day.id === activeDayId;
            return (
              <motion.button
                key={day.id}
                type="button"
                onClick={() => handleClick(day.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                className={`shrink-0 snap-center rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-all ${
                  isActive
                    ? "bg-accent-1 text-white shadow-md"
                    : "border border-accent-1 bg-white text-accent-1"
                }`}
              >
                Day {day.dayNumber}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

