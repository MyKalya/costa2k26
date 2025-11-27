"use client";

interface DayTransportStripProps {
  transportNotes: string;
}

/**
 * DayTransportStrip - Compact transport summary
 * 
 * Layout:
 * - Small strip under timeline card
 * - Icons + simple text summary
 * - No prices displayed
 * 
 * Content:
 * - Human-readable transport summary from day.transportNotes
 * - Example: "Getting around: shuttle or taxi from the villa"
 */
export function DayTransportStrip({ transportNotes }: DayTransportStripProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-[#134E4A]/15 bg-[#F4FBF7]/60 px-4 py-3 text-sm text-[#4C625E]">
      {/* TODO: Add transport icon */}
      <span>🚗</span>
      <span>{transportNotes}</span>
      {/* NO prices rendered - all cost information is hidden */}
    </div>
  );
}

