"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { useRef, useEffect } from "react";
import { daysConfig } from "./dayConfig";

interface DayScrollerProps {
  activeDayId: string;
  onDaySelect: (dayId: string) => void;
}

/**
 * DayScroller - Sticky horizontal scrollable row of themed day cards with images
 */
export function DayScroller({ activeDayId, onDaySelect }: DayScrollerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Auto-scroll active card to center when activeDayId changes
  useEffect(() => {
    const activeButton = buttonRefs.current.get(activeDayId);
    if (activeButton && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      const buttonCenter = buttonRect.left + buttonRect.width / 2;
      const scrollLeft = container.scrollLeft + (buttonCenter - containerCenter);

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeDayId]);

  const handleClick = (dayId: string, buttonElement: HTMLButtonElement) => {
    onDaySelect(dayId);
    
    // Scroll the card to center in the scroll container
    if (scrollContainerRef.current && buttonElement) {
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const buttonRect = buttonElement.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      const buttonCenter = buttonRect.left + buttonRect.width / 2;
      const scrollLeft = container.scrollLeft + (buttonCenter - containerCenter);

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }

    // Scroll to the day section
    const element = document.getElementById(dayId);
    if (element) {
      const offset = 80; // Account for sticky nav height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, dayId: string, buttonElement: HTMLButtonElement) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(dayId, buttonElement);
    }
  };

  return (
    <div
      id="day-nav"
      className="sticky top-0 z-30 bg-[#FFFDF7] border-b border-[#E7E4DF]"
    >
      <div 
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto py-3 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
        style={{ 
          scrollPaddingLeft: 'calc(50vw - 60px)', 
          scrollPaddingRight: 'calc(50vw - 60px)', 
          paddingLeft: 'calc(50vw - 60px)', 
          paddingRight: 'calc(50vw - 60px)' 
        }}
      >
        {daysConfig.map((day, index) => {
          const isActive = day.id === activeDayId;
          return (
            <motion.button
              key={day.id}
              ref={(el) => {
                if (el) {
                  buttonRefs.current.set(day.id, el);
                }
              }}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => handleClick(day.id, e.currentTarget)}
              onKeyDown={(e) => handleKeyDown(e, day.id, e.currentTarget)}
              aria-pressed={isActive}
              aria-current={isActive ? "page" : undefined}
              className={clsx(
                "min-w-[120px] rounded-xl overflow-hidden shadow-sm border transition flex-shrink-0 snap-center",
                isActive ? "text-white" : "bg-white text-[#374151] border-[#E5E7EB]"
              )}
              style={{
                backgroundColor: isActive ? day.color : "white",
                borderColor: isActive ? day.color : "#E5E7EB",
              }}
            >
              <div className="h-16 w-full">
                <img
                  src={day.image}
                  className="h-full w-full object-cover"
                  alt={day.label}
                />
              </div>
              <div className="px-3 py-2">
                <span className="text-xs uppercase tracking-wide block">
                  Day {day.number}
                </span>
                <span className="text-sm font-medium block">{day.label}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
