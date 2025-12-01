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
  tag?: string;
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
 * DayCard - Premium day card with modern app-esque design
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

  const isDay1 = dayIndex === 1;

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-2xl mx-auto mt-6 mb-8 rounded-3xl overflow-hidden shadow-xl"
      style={{ 
        background: `linear-gradient(to bottom, ${themeColor}08, ${themeColor}05, ${themeColor}08)`,
        border: `1px solid ${themeColor}15`
      }}
    >
      {/* Enhanced Banner with gradient overlay */}
      <div className="relative w-full h-44 sm:h-52 overflow-hidden">
        <img 
          src={bannerImage} 
          alt={title} 
          className="h-full w-full object-cover"
        />
        {/* Gradient overlay for better text readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
        />
        {/* Day label overlay on banner */}
        <div className="absolute top-3 left-4 right-4 flex items-start justify-between">
          <div className="flex flex-col">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] uppercase text-white/90 backdrop-blur-sm bg-black/20 rounded-full px-3 py-1.5 self-start"
              style={{ border: `1px solid ${themeColor}40` }}
            >
              <span className="text-[10px]">DAY</span>
              <span>{dayIndex}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Header section with tighter spacing */}
      <div className="px-5 pt-4 pb-3" style={{ backgroundColor: `${themeColor}06` }}>
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-1.5"
              style={{ color: themeColor }}
            >
              {dateLabel}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] leading-tight tracking-tight">
              {title}
            </h2>
          </div>
        </div>

        {/* Vibe summary - bolder background */}
        <div 
          className="rounded-2xl px-4 py-3 mt-3"
          style={{ 
            backgroundColor: `${themeColor}20`,
            border: `2px solid ${themeColor}40`
          }}
        >
          <p className="text-sm sm:text-base font-medium text-[#374151] leading-relaxed">
            {vibeSummary}
          </p>
        </div>
      </div>

      {/* Content section with enhanced timeline */}
      <div className="px-5 pt-3 pb-5" style={{ backgroundColor: `${themeColor}03` }}>
        {/* Timeline with better visual hierarchy */}
        <div className="relative pl-10 mt-3">
          {/* Vertical timeline line - more prominent */}
          <div 
            className="absolute left-4 top-0 bottom-0 w-1 rounded-full opacity-60"
            style={{ backgroundColor: themeColor }}
          />

          {events.map((event, index) => {
            // Check if this event should be visually nested (has a tag and previous event is "Choose your own adventure")
            const isNested = event.tag && index > 0 && events[index - 1].title.toLowerCase().includes("choose your own adventure");
            
            return (
            <motion.div
              key={`${event.time}-${event.title}-${index}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative mb-4 last:mb-0 ${isNested ? "ml-6" : ""}`}
            >
              {/* Enhanced marker */}
              <div 
                className={`absolute ${isNested ? "left-2" : "left-4"} top-0 h-8 w-8 rounded-full flex items-center justify-center transform -translate-x-1/2 shadow-lg border-4 border-white`}
                style={{ backgroundColor: themeColor }}
              >
                <span className="text-sm" aria-hidden="true">
                  {iconForEvent(event.icon)}
                </span>
              </div>

              {/* Event content with better typography */}
              <div className={`space-y-1.5 pb-1 ${isNested ? "ml-6" : "ml-8"}`}>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span 
                    className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ 
                      backgroundColor: `${themeColor}15`,
                      color: themeColor
                    }}
                  >
                    {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap mt-1">
                  <h3 className="text-lg font-bold text-[#111827] leading-tight">
                    {event.title}
                  </h3>
                  {event.tag && (
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                      style={{
                        backgroundColor: `${themeColor}20`,
                        color: themeColor,
                        border: `1px solid ${themeColor}40`,
                      }}
                    >
                      {event.tag}
                    </span>
                  )}
                </div>
                {event.location && (
                  <p className="text-sm font-medium text-[#6B7280] flex items-start gap-1.5">
                    <span className="text-[10px] mt-0.5">📍</span>
                    <span>{event.location}</span>
                  </p>
                )}
                {event.description && (
                  <p className="text-sm text-[#6B7280] leading-relaxed mt-1.5">
                    {event.description.split(/(explore nearby)/i).map((part, idx) => {
                      if (part.toLowerCase() === "explore nearby") {
                        return (
                          <a
                            key={idx}
                            href="/explore-tamarindo"
                            className="font-semibold underline hover:opacity-80 transition-opacity"
                            style={{ color: themeColor }}
                          >
                            {part}
                          </a>
                        );
                      }
                      return <span key={idx}>{part}</span>;
                    })}
                  </p>
                )}
              </div>

              {/* Subtle divider */}
              {index < events.length - 1 && !isNested && (
                <div className={`mt-3 ${isNested ? "ml-6" : "ml-8"} h-px bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent`} />
              )}
            </motion.div>
            );
          })}
        </div>

        {/* Enhanced Notes section */}
        {notes && notes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-5 rounded-2xl px-4 py-3"
            style={{
              backgroundColor: `${themeColor}15`,
              border: `2px solid ${themeColor}30`,
            }}
          >
            <div className="flex items-center gap-3 mb-2.5">
              <span
                className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-xl px-3 text-xs font-bold uppercase tracking-[0.12em] shadow-sm"
                style={{ backgroundColor: themeColor, color: "#FFFFFF" }}
              >
                Notes
              </span>
              <p className="text-xs font-medium text-[#6B7280]">Important details for this day</p>
            </div>
            <ul className="space-y-2">
              {notes.map((note, noteIndex) => (
                <li key={noteIndex} className="flex gap-3 items-start">
                  <span
                    className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: themeColor }}
                  />
                  <span className="text-sm text-[#374151] leading-relaxed flex-1">
                    {note.split(/(warm sunset|Soft Romance)/i).map((part, idx) => {
                      const lowerPart = part.toLowerCase();
                      if (lowerPart === "warm sunset") {
                        return (
                          <a
                            key={idx}
                            href="/travel#catamaran-outfit"
                            className="font-semibold underline hover:opacity-80 transition-opacity"
                            style={{ color: themeColor }}
                          >
                            {part}
                          </a>
                        );
                      }
                      if (lowerPart === "soft romance") {
                        return (
                          <a
                            key={idx}
                            href="/travel#puerto-de-sal-outfit"
                            className="font-semibold underline hover:opacity-80 transition-opacity"
                            style={{ color: themeColor }}
                          >
                            Soft Romance
                          </a>
                        );
                      }
                      return <span key={idx}>{part}</span>;
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Getting around - more prominent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-5 pt-4 border-t-2"
          style={{ borderColor: `${themeColor}20` }}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">🚗</span>
            <div className="flex-1">
              <p
                className="text-xs font-bold tracking-[0.16em] uppercase mb-2"
                style={{ color: themeColor }}
              >
                Getting Around
              </p>
              <p className="text-sm text-[#4B5563] leading-relaxed font-medium">
                {gettingAround}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
