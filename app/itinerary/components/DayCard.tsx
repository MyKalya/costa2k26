"use client";

import { motion } from "framer-motion";

export type DayTheme =
  | "arrivals"
  | "beach"
  | "free"
  | "adventure"
  | "catamaran"
  | "departures";

export interface DayEvent {
  time: string;
  title: string;
  location?: string;
  description?: string;
  icon?: "arrival" | "party" | "meal" | "beach" | "free" | "adventure" | "boat" | "plane";
}

export interface DayCardProps {
  id: string;
  dayIndex: number;
  dateLabel: string;
  title: string;
  summary: string;
  themeColor: string;
  cardBg: string;
  bannerImage: string;
  vibeSummary: string;
  notes: string[];
  events: DayEvent[];
  gettingAround: string;
}

/**
 * Helper function to get icon emoji for event type
 */
const iconForEvent = (icon?: string) => {
  switch (icon) {
    case "arrival":
      return "🧳";
    case "party":
      return "🎉";
    case "meal":
      return "🍽️";
    case "beach":
      return "🏖️";
    case "free":
      return "🗺️";
    case "adventure":
      return "🌋";
    case "boat":
      return "⛵";
    case "plane":
      return "✈️";
    default:
      return "•";
  }
};

/**
 * DayCard - Premium day card with themed background, vibe summary, icons, and notes
 */
export function DayCard(props: DayCardProps) {
  const {
    id,
    dayIndex,
    dateLabel,
    title,
    themeColor,
    cardBg,
    bannerImage,
    vibeSummary,
    notes,
    events,
    gettingAround,
  } = props;

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-xl mx-auto mt-6 rounded-3xl shadow-md shadow-black/5 overflow-hidden"
      style={{ backgroundColor: cardBg }}
    >
      {/* Banner image */}
      <div className="w-full h-32 sm:h-36 overflow-hidden">
        <img src={bannerImage} alt={title} className="h-full w-full object-cover" />
      </div>

      {/* Header strip */}
      <div className="px-5 pt-4 pb-3">
        <p
          className="text-xs font-semibold tracking-[0.16em] uppercase mb-1"
          style={{ color: themeColor }}
        >
          Day {dayIndex} • {dateLabel}
        </p>
        <h2 className="text-2xl font-semibold text-[#111827]">{title}</h2>
      </div>

      {/* Vibe summary box */}
      <div className="px-5">
        <div className="rounded-xl border border-[#E5E7EB] bg-white/90 px-4 py-3 text-sm text-[#4B5563] leading-relaxed">
          {vibeSummary}
        </div>
      </div>

      {/* Content section */}
      <div className="px-5 pt-4 pb-5 sm:pb-6">
        {/* Timeline */}
        <div className="relative pl-8">
          <div className="absolute left-3.5 top-2 bottom-4 w-px bg-[#F3B44C]" />

          {events.map((event, index) => (
            <div key={`${event.time}-${event.title}-${index}`} className="relative mb-5 last:mb-0">
              {/* Marker circle with icon */}
              <div className="absolute left-3.5 top-1.5 h-3.5 w-3.5 rounded-full bg-white flex items-center justify-center transform -translate-x-1/2 shadow-sm">
                <span className="text-[9px]" aria-hidden="true">
                  {iconForEvent(event.icon)}
                </span>
              </div>

              {/* Content */}
              <div className="ml-6 space-y-0.5">
                <p className="text-xs font-semibold text-[#111827]">{event.time}</p>
                <p className="text-sm font-semibold text-[#111827]">{event.title}</p>
                {event.location && (
                  <p className="text-xs text-[#6B7280]">{event.location}</p>
                )}
                {event.description && (
                  <p className="text-xs text-[#6B7280]">{event.description}</p>
                )}
              </div>

              {/* Optional subtle divider between events */}
              {index < events.length - 1 && (
                <div className="mt-3 ml-6 h-px w-20 border-t border-dashed border-[#E5E7EB]" />
              )}
            </div>
          ))}
        </div>

        {/* Special notes section */}
        {notes && notes.length > 0 && (
          <div className="mt-5 rounded-2xl bg-white/90 border border-black/5 px-4 py-3">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ backgroundColor: themeColor, color: "#FFFFFF" }}
              >
                Notes
              </span>
              <p className="text-xs text-[#6B7280]">Little things to know for this day.</p>
            </div>
            <ul className="space-y-1.5 text-xs text-[#374151]">
              {notes.map((note, noteIndex) => (
                <li key={noteIndex} className="flex gap-2">
                  <span
                    className="mt-[3px] h-1.5 w-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: themeColor }}
                  />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Getting around */}
        <hr className="mt-5 mb-3 border-t border-[#E5E7EB]" />
        <div>
          <p
            className="text-xs font-semibold tracking-[0.16em] uppercase mb-1.5"
            style={{ color: themeColor }}
          >
            Getting around
          </p>
          <p className="text-xs text-[#4B5563]">{gettingAround}</p>
        </div>
      </div>
    </motion.section>
  );
}
