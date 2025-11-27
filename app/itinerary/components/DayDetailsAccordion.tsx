"use client";

import { useState } from "react";
import { DayDetails } from "@/app/data/itinerary";
// TODO: Import Framer Motion
// import { motion, AnimatePresence } from "framer-motion";

interface DayDetailsAccordionProps {
  details: DayDetails;
}

/**
 * DayDetailsAccordion - Collapsible drawer for extra context
 * 
 * Content:
 * - Food notes (e.g., "food paid in advance", "preset menu")
 * - Adventure options (Opt 1, Opt 2)
 * - Optional activities (ATV, ziplining, etc.)
 * 
 * Motion:
 * - Smooth accordion open/close
 * - Height: auto with layout animation
 * - Opacity: fade in content
 * - Duration: 300-400ms
 * - Easing: easeInOut
 * 
 * Note: NO costs rendered - all price information is kept internal
 */
export function DayDetailsAccordion({ details }: DayDetailsAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[#134E4A]/10 bg-white/50">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-[#134E4A] hover:bg-[#F4FBF7]/40"
      >
        <span>More details</span>
        <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {/* TODO: Add Framer Motion AnimatePresence for smooth accordion */}
      {isOpen && (
        <div className="border-t border-[#134E4A]/10 px-4 py-4">
          {/* Food Note */}
          {details.foodNote && (
            <div className="mb-4 text-sm text-[#4C625E]">
              <strong className="font-semibold text-[#134E4A]">Food:</strong> {details.foodNote}
            </div>
          )}

          {/* Adventure Options */}
          {details.adventureOptions && details.adventureOptions.length > 0 && (
            <div className="mb-4">
              <div className="mb-2 text-sm font-semibold text-[#134E4A]">Adventure Options:</div>
              <ul className="space-y-2 text-sm text-[#4C625E]">
                {details.adventureOptions.map((option) => (
                  <li key={option.id} className="pl-4">
                    <strong>{option.label}:</strong> {option.description}
                    {/* NO cost rendering */}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Optional Activities */}
          {details.optionalActivities && details.optionalActivities.length > 0 && (
            <div>
              <div className="mb-2 text-sm font-semibold text-[#134E4A]">Optional Activities:</div>
              <ul className="space-y-1 text-sm text-[#4C625E]">
                {details.optionalActivities.map((activity, index) => (
                  <li key={index} className="pl-4">
                    {activity.label}
                    {/* NO cost rendering - activity.costMin, costMax, costNote ignored */}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Other Notes */}
          {details.notes && details.notes.length > 0 && (
            <div className="mt-4 text-sm text-[#4C625E]">
              {details.notes.map((note, index) => (
                <p key={index}>{note}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

