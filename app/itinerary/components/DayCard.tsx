"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X } from "lucide-react";

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
  showPrepareButton?: boolean;
  showActivityButtons?: boolean;
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

  const [showPrepareModal, setShowPrepareModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState<string | null>(null);
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
              id={event.showActivityButtons ? `${id}-activity` : undefined}
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
                  <div className="text-sm text-[#6B7280] leading-relaxed mt-1.5 space-y-2">
                    {event.description.split('\n\n').map((paragraph, pIdx) => {
                      // Helper function to parse HTML tags in text
                      const parseHTML = (text: string) => {
                        const parts: (string | JSX.Element)[] = [];
                        let lastIndex = 0;
                        const regex = /(<strong>.*?<\/strong>|<a\s+href=["']([^"']+)["']\s+class=["']([^"']+)["']>(.*?)<\/a>)/gi;
                        let match;
                        
                        while ((match = regex.exec(text)) !== null) {
                          // Add text before the match
                          if (match.index > lastIndex) {
                            parts.push(text.substring(lastIndex, match.index));
                          }
                          
                          // Handle <strong> tags
                          if (match[1] && match[1].startsWith('<strong>')) {
                            const text = match[1].replace(/<\/?strong>/gi, '');
                            parts.push(<strong key={`strong-${match.index}`} className="font-bold text-[#111827]">{text}</strong>);
                          }
                          // Handle <a> tags
                          else if (match[1] && match[1].startsWith('<a')) {
                            const href = match[2];
                            const className = match[3];
                            const linkText = match[4];
                            parts.push(
                              <a
                                key={`link-${match.index}`}
                                href={href}
                                className={className || "font-semibold underline hover:opacity-80 transition-opacity"}
                                style={{ color: themeColor }}
                              >
                                {linkText}
                              </a>
                            );
                          }
                          
                          lastIndex = regex.lastIndex;
                        }
                        
                        // Add remaining text
                        if (lastIndex < text.length) {
                          parts.push(text.substring(lastIndex));
                        }
                        
                        return parts.length > 0 ? parts : [text];
                      };

                      if (paragraph.startsWith('<strong>Plan for the Day:</strong>') || paragraph.startsWith('Plan for the Day:')) {
                        const labelMatch = paragraph.match(/^(<strong>)?Plan for the Day:(<\/strong>)?/i);
                        const content = paragraph.replace(/^(<strong>)?Plan for the Day:(<\/strong>)?\s*/i, '').trim();
                        return (
                          <div key={pIdx} className="space-y-1.5">
                            <p className="font-semibold text-[#111827]">Plan for the Day:</p>
                            <p>{parseHTML(content)}</p>
                          </div>
                        );
                      }
                      return (
                        <p key={pIdx}>
                          {parseHTML(paragraph)}
                        </p>
                      );
                    })}
                  </div>
                )}
                {event.showPrepareButton && (
                  <button
                    onClick={() => setShowPrepareModal(true)}
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md"
                    style={{
                      backgroundColor: themeColor,
                      color: "#FFFFFF",
                    }}
                  >
                    <span>How to prepare</span>
                    <span className="text-xs">→</span>
                  </button>
                )}
                {event.showActivityButtons && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      onClick={() => setShowActivityModal("atv")}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md"
                      style={{
                        backgroundColor: themeColor,
                        color: "#FFFFFF",
                      }}
                    >
                      <span>ATV</span>
                      <span className="text-xs">→</span>
                    </button>
                    <button
                      onClick={() => setShowActivityModal("kayak")}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md"
                      style={{
                        backgroundColor: themeColor,
                        color: "#FFFFFF",
                      }}
                    >
                      <span>Kayak</span>
                      <span className="text-xs">→</span>
                    </button>
                    <button
                      onClick={() => setShowActivityModal("surf")}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md"
                      style={{
                        backgroundColor: themeColor,
                        color: "#FFFFFF",
                      }}
                    >
                      <span>Surf Lessons</span>
                      <span className="text-xs">→</span>
                    </button>
                    <button
                      onClick={() => setShowActivityModal("horseback")}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md"
                      style={{
                        backgroundColor: themeColor,
                        color: "#FFFFFF",
                      }}
                    >
                      <span>Horseback Riding</span>
                      <span className="text-xs">→</span>
                    </button>
                  </div>
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
              {notes.map((note, noteIndex) => {
                const isProTip = note.startsWith("Pro tip:");
                return (
                <li key={noteIndex} className={`flex gap-3 items-start ${isProTip ? 'relative' : ''}`}>
                  {isProTip ? (
                    <div 
                      className="mt-1 flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${themeColor}20`,
                        border: `1.5px solid ${themeColor}40`
                      }}
                    >
                      <Lightbulb className="h-3 w-3" style={{ color: themeColor }} />
                    </div>
                  ) : (
                    <span
                      className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: themeColor }}
                    />
                  )}
                  <span className={`text-sm leading-relaxed flex-1 ${isProTip ? 'text-[#374151]' : 'text-[#374151]'}`}>
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
                );
              })}
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

      {/* How to Prepare Modal */}
      <AnimatePresence>
        {showPrepareModal && (
          <PrepareModal
            themeColor={themeColor}
            onClose={() => setShowPrepareModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Activity Modals */}
      <AnimatePresence>
        {showActivityModal && (
          <ActivityModal
            activity={showActivityModal}
            themeColor={themeColor}
            onClose={() => setShowActivityModal(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}

/**
 * PrepareModal - Modal showing "What to bring?" information
 */
function PrepareModal({ themeColor, onClose }: { themeColor: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div
          className="px-6 py-4 border-b"
          style={{ borderColor: `${themeColor}20` }}
        >
          <div className="flex items-center justify-between">
            <h3
              className="text-2xl font-bold"
              style={{ color: themeColor }}
            >
              What to bring?
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
          <ul className="space-y-4">
            <li>
              <div className="flex gap-3 items-start">
                <span
                  className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: themeColor }}
                />
                <div className="flex-1">
                  <p className="text-sm text-[#374151] leading-relaxed">
                    <span className="font-semibold text-red-600">Important for women:</span> Wear bathing suit under your clothes only and make sure to bring clothes that tighten, there is a current during the hike that could potentially pull your clothes down if they are not tight enough.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex gap-3 items-start">
                <span
                  className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: themeColor }}
                />
                <div className="flex-1">
                  <p className="text-sm text-[#374151] leading-relaxed">
                    Closed toe shoes, water shoes or sandals with straps
                  </p>
                  <p className="text-sm font-semibold text-red-600 mt-1">
                    (NO FLIP FLOPS)
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex gap-3 items-start">
                <span
                  className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: themeColor }}
                />
                <div className="flex-1">
                  <p className="text-sm text-[#374151] leading-relaxed">
                    Keens or chacos are okay to wear
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex gap-3 items-start">
                <span
                  className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: themeColor }}
                />
                <div className="flex-1">
                  <p className="text-sm text-[#374151] leading-relaxed">
                    Shoes with a good grip
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex gap-3 items-start">
                <span
                  className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: themeColor }}
                />
                <div className="flex-1">
                  <p className="text-sm text-[#374151] leading-relaxed">
                    Extra clothes to change
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex gap-3 items-start">
                <span
                  className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: themeColor }}
                />
                <div className="flex-1">
                  <p className="text-sm text-[#374151] leading-relaxed">
                    Extra shoes to change
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex gap-3 items-start">
                <span
                  className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: themeColor }}
                />
                <div className="flex-1">
                  <p className="text-sm text-[#374151] leading-relaxed">
                    Sunscreen
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex gap-3 items-start">
                <span
                  className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: themeColor }}
                />
                <div className="flex-1">
                  <p className="text-sm text-[#374151] leading-relaxed">
                    Small bottle of water
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex gap-3 items-start">
                <span
                  className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: themeColor }}
                />
                <div className="flex-1">
                  <p className="text-sm text-[#374151] leading-relaxed">
                    Towels
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex gap-3 items-start">
                <span
                  className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: themeColor }}
                />
                <div className="flex-1">
                  <p className="text-sm text-[#374151] leading-relaxed">
                    We provide a dry bag to take your cellphone and water to the tour
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * ActivityModal - Modal showing activity details
 */
function ActivityModal({ activity, themeColor, onClose }: { activity: string; themeColor: string; onClose: () => void }) {
  const getActivityData = () => {
    switch (activity) {
      case "atv":
        return {
          title: "ATV Tour",
          cashPayment: "BRING $75 CASH TO PAY TOUR",
          meetup: "Club 33 Surf Shop",
          meetupLink: "https://maps.app.goo.gl/wbvb43MhW3grz4bQA",
          time: "10:45AM for pick up to ATV site",
          tourIncludes: [
            "Roundtrip Transportation",
            "Two Hour ATV Tour",
            "Bilingual Guides",
            "Water",
          ],
          details: [
            "Roundtrip transportation",
            "Single ATV's",
          ],
          whatToBring: [
            "Comfortable clothes for ATVs (Bathing suit if you want to swim at the beaches)",
            "Tennis Shoes",
            "Sunblock",
            "Sunglasses",
            "Camera",
            "Cash for tipping",
          ],
          participants: ["AK", "Andrew", "Aru", "Maathu", "Netharrshan", "Raja", "Yanushan"],
        };
      case "kayak":
        return {
          title: "Kayak Tour",
          cashPayment: "BRING $50 CASH TO PAY TOUR",
          meetup: "Pangas restaurant",
          time: "9:45 AM",
          tourIncludes: [
            "National park entrance fee",
            "Kayak equipment",
            "Bilingual guide",
            "Water",
          ],
          whatToBring: [
            "Comfortable/ Light Clothes",
            "Water Shoes (not required, just be prepared for your shoes to get wet or go barefoot)",
            "Hat",
            "Sunscreen",
            "Bug Spray",
            "Cash for tipping",
          ],
          participants: ["Arun", "Athira", "Rajiv", "Shannon"],
        };
      case "surf":
        return {
          title: "Surf Lessons",
          cashPayment: "BRING $55 CASH TO PAY INSTRUCTOR",
          meetup: "Club 33 Surf Shop",
          meetupLink: "https://maps.app.goo.gl/wbvb43MhW3grz4bQA",
          time: "Will be confirmed closer to trip depending on tides",
          tourIncludes: [
            "Certified Instructor",
            "Rash Guard",
            "Surf Board",
            "2 Hour Surf Lesson",
          ],
          whatToBring: [
            "Swimsuit",
            "Change of clothes",
            "Towel",
            "Sunblock",
            "Flip flops",
            "Cash for tipping",
          ],
          participants: ["Aatharsha", "Deleep", "Harish", "Mathan", "Mathushan", "Meth", "Nick", "Ro", "Shreya", "Thasi", "Thithu"],
        };
      case "horseback":
        return {
          title: "Horseback Riding",
          tourIncludes: [
            "Horses",
            "Guide",
            "Water",
            "1 hr along the beach (horses can pass through the water like in the video)",
            "1 hr through the mountains behind Tamarindo",
          ],
          whatToBring: [
            "Long pants",
            "Closed toed shoes",
            "Camera",
            "Hat",
            "Sunscreen",
            "Cash for tipping",
          ],
          meetup: "Restaurante Chiringuito",
          meetupLink: "https://maps.app.goo.gl/WZ1VeP8knFm4WsYt5",
          startTime: "9:00AM",
          endTime: "11:00AM",
          specialNote: "Meet @ 8:50AM in front of the Restaurante Chiringuito",
          participants: ["Ballersai", "Janu", "Kaja", "Keerthana", "Kimia", "Madhu", "Priya", "Rishega", "Sherrena", "Supena"],
        };
      default:
        return null;
    }
  };

  const data = getActivityData();
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div
          className="px-6 py-4 border-b flex-shrink-0"
          style={{ borderColor: `${themeColor}20` }}
        >
          <div className="flex items-center justify-between">
            <h3
              className="text-2xl font-bold"
              style={{ color: themeColor }}
            >
              {data.title}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto flex-1">
          <div className="space-y-6">
            {/* Cash Payment Notice */}
            {data.cashPayment && (
              <div
                className="rounded-xl px-4 py-3"
                style={{ backgroundColor: `${themeColor}15`, border: `2px solid ${themeColor}40` }}
              >
                <p className="text-base font-bold text-center" style={{ color: themeColor }}>
                  {data.cashPayment}
                </p>
              </div>
            )}

            {/* Meetup Info */}
            <div>
              <h4 className="text-lg font-bold text-[#111827] mb-3">Meet-up Location & Time:</h4>
              {data.specialNote && (
                <p className="text-sm font-semibold text-[#374151] mb-2">{data.specialNote}</p>
              )}
              <p className="text-sm text-[#374151] leading-relaxed">
                <span className="font-semibold">Location:</span>{" "}
                {data.meetupLink ? (
                  <a
                    href={data.meetupLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80 transition-opacity"
                    style={{ color: themeColor }}
                  >
                    {data.meetup}
                  </a>
                ) : (
                  data.meetup
                )}
              </p>
              {data.startTime && data.endTime && (
                <p className="text-sm text-[#374151] leading-relaxed mt-2">
                  <span className="font-semibold">Time:</span> {data.startTime} - {data.endTime}
                </p>
              )}
              {data.time && (
                <p className="text-sm text-[#374151] leading-relaxed mt-2">
                  <span className="font-semibold">Time:</span> {data.time}
                </p>
              )}
            </div>

            {/* Tour Includes */}
            <div
              className="pt-4 border-t"
              style={{ borderColor: `${themeColor}20` }}
            >
              <h4 className="text-lg font-bold text-[#111827] mb-3">Tour Includes:</h4>
              <ul className="space-y-2">
                {data.tourIncludes.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span
                      className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: themeColor }}
                    />
                    <span className="text-sm text-[#374151] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Details (for ATV) */}
            {data.details && (
              <div>
                <h4 className="text-lg font-bold text-[#111827] mb-3">Details:</h4>
                <ul className="space-y-2">
                  {data.details.map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span
                        className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: themeColor }}
                      />
                      <span className="text-sm text-[#374151] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What to Bring */}
            <div
              className="pt-4 border-t"
              style={{ borderColor: `${themeColor}20` }}
            >
              <h4 className="text-lg font-bold text-[#111827] mb-3">What to Bring:</h4>
              <ul className="space-y-2">
                {data.whatToBring.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span
                      className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: themeColor }}
                    />
                    <span className="text-sm text-[#374151] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Participants */}
            {data.participants && data.participants.length > 0 && (() => {
              // Reorganize to fill columns vertically (column-wise)
              // Items fill first column top to bottom, then second column, etc.
              const numColumns = 3;
              const numRows = Math.ceil(data.participants.length / numColumns);
              const columnWise: string[] = [];
              
              // Fill column by column
              for (let col = 0; col < numColumns; col++) {
                for (let row = 0; row < numRows; row++) {
                  const idx = row * numColumns + col;
                  if (idx < data.participants.length) {
                    columnWise.push(data.participants[idx]);
                  }
                }
              }
              
              return (
                <div
                  className="pt-4 border-t"
                  style={{ borderColor: `${themeColor}20` }}
                >
                  <h4 className="text-lg font-bold text-[#111827] mb-3">Participants:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {columnWise.map((name, idx) => (
                      <div
                        key={idx}
                        className="text-sm text-[#374151] px-2 py-1 rounded-md"
                        style={{ backgroundColor: `${themeColor}10` }}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
