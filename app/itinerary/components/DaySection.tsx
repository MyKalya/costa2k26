"use client";

import { useEffect, useRef } from "react";
import { ItineraryDay } from "@/app/data/itinerary";
// TODO: Import Framer Motion hooks
// import { useInView } from "framer-motion";

import { DayHeroPanel } from "./DayHeroPanel";
import { DayIncludesBand } from "./DayIncludesBand";
import { DayTimelineCard } from "./DayTimelineCard";
import { DayTransportStrip } from "./DayTransportStrip";
import { DayDetailsAccordion } from "./DayDetailsAccordion";

interface DaySectionProps {
  day: ItineraryDay;
  isActive: boolean;
  onVisibilityChange?: (isVisible: boolean) => void;
}

/**
 * DaySection - Individual day container
 * 
 * Layout:
 * - Mobile: roughly viewport height
 * - Desktop: more breathing room but same hero + card relationship
 * 
 * Motion:
 * - On viewport enter: hero fades in + slight upward slide (600ms)
 * - Includes band: chips stagger in left to right (80-120ms stagger)
 * - Timeline card: fades in from 12px below (500ms, 100ms delay)
 * - Active section: enhanced shadow, slightly increased saturation
 * - Inactive sections: 0.85 opacity, reduced saturation
 * 
 * Visibility detection:
 * - Use IntersectionObserver or useInView to detect when centered
 * - Call onVisibilityChange when section is in viewport center
 */
export function DaySection({ day, isActive, onVisibilityChange }: DaySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // TODO: Add IntersectionObserver or useInView hook
  // Detect when section is centered in viewport
  // Call onVisibilityChange(true) when centered
  // Call onVisibilityChange(false) when not centered

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // TODO: Check if entry is in center zone of viewport
          // if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          //   onVisibilityChange?.(true);
          // }
        });
      },
      {
        root: null,
        threshold: [0.4, 0.5, 0.6],
        rootMargin: "-40% 0px -40% 0px", // Center 20% of viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [onVisibilityChange]);

  return (
    <section
      id={day.id}
      ref={sectionRef}
      className="relative min-h-screen"
      // TODO: Add active/inactive styling
      // Active: enhanced shadow, slightly increased saturation
      // Inactive: opacity 0.85, reduced saturation
      style={{
        opacity: isActive ? 1 : 0.85,
        filter: isActive ? "saturate(1.05)" : "saturate(0.95)",
      }}
    >
      {/* Day Hero Panel */}
      {/* TODO: Framer Motion: fade in + slight upward slide on viewport enter */}
      <DayHeroPanel day={day} />

      {/* Day Includes Band */}
      {/* TODO: Framer Motion: chips stagger in from left to right (80-120ms stagger) */}
      <DayIncludesBand includes={day.includes} themeColor={day.themeColor} />

      {/* Day Timeline Card */}
      {/* TODO: Framer Motion: fade in from 12px below (500ms, 100ms delay after hero) */}
      <div className="relative z-10 -mt-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <DayTimelineCard timeline={day.timeline} />
        </div>
      </div>

      {/* Day Transport Strip */}
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 pb-8">
        <DayTransportStrip transportNotes={day.transportNotes} />
      </div>

      {/* Optional: Day Details Accordion */}
      {day.extraNotes && (
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 pb-12">
          <DayDetailsAccordion details={day.extraNotes} />
        </div>
      )}
    </section>
  );
}

