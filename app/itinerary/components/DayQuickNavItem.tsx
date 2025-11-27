"use client";

import { motion } from "framer-motion";

interface DayQuickNavItemProps {
  dayNumber: number;
  label: string;
  dayId: string;
  index: number;
}

/**
 * DayQuickNavItem - Individual day CTA pill button
 */
export function DayQuickNavItem({ dayNumber, label, dayId, index }: DayQuickNavItemProps) {
  const handleClick = () => {
    const element = document.getElementById(dayId);
    if (element) {
      const offset = 80; // Account for sticky nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className="shrink-0 snap-center rounded-full bg-black/25 px-4 py-2 font-sans text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 whitespace-nowrap shadow-md hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <span className="flex items-center gap-2">
        <span className="text-xs opacity-90">Day {dayNumber}</span>
        <span className="font-semibold">—</span>
        <span>{label}</span>
      </span>
    </motion.button>
  );
}

