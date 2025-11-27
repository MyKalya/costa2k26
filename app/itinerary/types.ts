/**
 * Component Prop Types
 * 
 * These define the props interfaces for all itinerary components
 */

import type { 
  ItineraryDay, 
  ItineraryData,
  DayTheme, 
  DayEvent, 
  TransportOption, 
  DayIncludes, 
  DayDetails 
} from "@/app/data/itinerary";

// ============================================================================
// Root Component
// ============================================================================

export interface ItineraryPageProps {
  data: ItineraryData;
}

// ============================================================================
// Timeline Navigation
// ============================================================================

export interface DayTimelineProps {
  days: ItineraryDay[];
  activeDayId: string;
  onDaySelect: (dayId: string) => void;
}

export interface TimelineItemProps {
  day: ItineraryDay;
  isActive: boolean;
  onClick: () => void;
}

// ============================================================================
// Day Section
// ============================================================================

export interface DaySectionProps {
  day: ItineraryDay;
  isActive: boolean;
  onVisibilityChange?: (isVisible: boolean) => void;
}

// ============================================================================
// Day Hero Panel
// ============================================================================

export interface DayHeroPanelProps {
  day: ItineraryDay;
}

// ============================================================================
// Day Includes Band
// ============================================================================

export interface DayIncludesBandProps {
  includes: DayIncludes[];
  themeColor: string;
}

export interface IncludeChipProps {
  include: DayIncludes;
  themeColor: string;
}

// ============================================================================
// Day Timeline Card
// ============================================================================

export interface DayTimelineCardProps {
  timeline: ItineraryDay["timeline"];
}

export interface DayEventBlockProps {
  timeOfDay: "morning" | "afternoon" | "evening" | "night";
  events: DayEvent[];
}

// ============================================================================
// Day Transport Strip
// ============================================================================

export interface DayTransportStripProps {
  transport: TransportOption[];
}

// ============================================================================
// Day Details Accordion
// ============================================================================

export interface DayDetailsAccordionProps {
  details: DayDetails;
}

// ============================================================================
// Re-export for convenience
// ============================================================================

export type { ItineraryDay, DayTheme, DayEvent, TransportOption, DayIncludes, DayDetails } from "@/app/data/itinerary";

