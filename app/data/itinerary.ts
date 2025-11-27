/**
 * Itinerary Data Model
 * 
 * Derived from the Google Sheets table (Fri Feb 13 - Wed Feb 18)
 * All cost fields are kept in the data layer but will NOT be rendered in the UI
 */

export type DayTheme = 
  | "arrival"      // Day 1: Warm sand
  | "valentines"   // Day 2: Coral and aqua
  | "free-day"     // Day 3: Dusk teal
  | "adventure"    // Day 4: Deep jungle green
  | "catamaran"    // Day 5: Bright ocean blue
  | "departure";   // Day 6: Calm neutral

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export interface DayEvent {
  // Display fields
  label: string;                    // e.g., "Welcome Party", "Brunch at the beach club"
  description?: string;             // Optional additional context
  time?: string;                    // e.g., "7:30pm", "12-6pm", "4-5pm"
  location?: string;                // e.g., "@ Pangas", "@ Langosta"
  
  // Internal cost tracking (NOT rendered)
  costMin?: number;                 // Minimum cost per person
  costMax?: number;                 // Maximum cost per person
  costNote?: string;                // e.g., "~$30-$45", "~$18pp" (for reference only)
}

export interface TransportOption {
  type: "shuttle" | "rental" | "taxi" | "uber";
  // Internal cost tracking (NOT rendered)
  cost?: number;
  costNote?: string;                // e.g., "$21", "$29 pp", "~$15 RT"
}

export interface AdventureOption {
  id: string;                       // e.g., "opt-1-water", "opt-2-land"
  label: string;                    // e.g., "Opt 1: Water", "Opt 2: Land"
  description: string;              // Full description from table
  activities: string[];             // e.g., ["La Leona", "River Tubing", "Lunch", "Hot Springs"]
  // Internal cost tracking (NOT rendered)
  cost?: number;                    // e.g., 210
  costNote?: string;                // e.g., "$210"
}

export interface DayIncludes {
  icon?: string;                    // Icon identifier (e.g., "beach", "water-sports", "food")
  label: string;                    // e.g., "Tamarindo Beach Club daybed and pool"
  description?: string;             // Optional additional detail
}

export interface DayDetails {
  // Optional context from table like "food paid in advance", "preset menu", "whole menu"
  foodNote?: string;                // e.g., "Food paid in advance", "Preset menu", "Whole menu"
  
  // Optional adventure choices
  adventureOptions?: AdventureOption[];
  
  // Optional additional activities (from "Ballparked $$" row)
  optionalActivities?: {
    label: string;                  // e.g., "ATV", "Ziplining", "Kayak wildlife"
    // Internal cost tracking (NOT rendered)
    costMin?: number;
    costMax?: number;
    costNote?: string;              // e.g., "$125-147", "$77"
  }[];
  
  // Other notes
  notes?: string[];
}

/**
 * Central Itinerary Day Data Structure
 * 
 * This is the single source of truth for all day content.
 * All text and activities are defined here, transcribed from the Google Sheets table.
 * Cost fields are kept internally but never rendered in the UI.
 */
export interface ItineraryDay {
  // Core identifiers
  id: string;                       // e.g., "day-1", "day-2"
  dayNumber: number;                // 1-6
  dateLabel: string;                // e.g., "Fri Feb 13" (for display)
  fullDate: string;                 // e.g., "Friday, February 13th"
  dateValue: string;                // ISO date: "2026-02-13"
  
  // Theme and visual
  theme: DayTheme;
  themeColor: string;               // CSS color for gradient overlay
  heroImageSrc?: string;            // Path to hero image (relative to /public/images)
  
  // Labels for navigation and display
  shortLabel: string;               // For timeline nav: "Arrival", "Valentines Beach Club", etc.
  title: string;                    // Main day title: "Arrivals and Welcome Party"
  subtitle: string;                 // One line setting the tone
  heroTagline: string;              // Short tagline for hero teaser card
  
  // What's included - visual chips for DayIncludesBand (3-6 items)
  includes: DayIncludes[];
  
  // Timeline events grouped by time of day
  timeline: {
    morning?: DayEvent[];
    afternoon?: DayEvent[];
    evening?: DayEvent[];
    night?: DayEvent[];
  };
  
  // Transport summary (for DayTransportStrip)
  transportNotes: string;           // Human-readable summary
  
  // Internal transport data (for reference only, not rendered)
  transport?: TransportOption[];
  
  // Optional details (accordion) - only if day has extra context
  extraNotes?: DayDetails;
}

export interface ItineraryData {
  // Hero section
  eyebrow: string;                  // e.g., "Costa Rica After Party"
  title: string;                    // e.g., "Our Week in Costa Rica"
  subtitle: string;                 // 2 short lines summarizing trip vibe
  dateRange: string;                // e.g., "Feb 13 to 18"
  location: string;                 // e.g., "Hacienda Pinilla"
  
  // Days
  days: ItineraryDay[];
}

/**
 * Sample: Day 1 - Arrival
 * 
 * This illustrates how the Google Sheets table maps to the data structure.
 * All fields match exactly what was in the table screenshot.
 */
export const sampleDay1: ItineraryDay = {
  id: "day-1",
  dayNumber: 1,
  dateLabel: "Fri Feb 13",
  fullDate: "Friday, February 13th",
  dateValue: "2026-02-13",
  
  theme: "arrival",
  themeColor: "#E8D5B7", // Warm sand
  heroImageSrc: "/images/itinerary/day-1-arrival.jpg",
  
  shortLabel: "Arrival",
  title: "Arrivals and Welcome Party",
  subtitle: "Settle in, meet the group, and kick off the week with dinner and drinks.",
  
  includes: [
    { 
      label: "Welcome Party", 
      icon: "party",
      description: "Meet and greet with the group"
    },
    { 
      label: "Dinner @ Pangas", 
      icon: "dinner",
      description: "Group dinner to start the week"
    },
  ],
  
  timeline: {
    afternoon: [
      { 
        label: "Arrive", 
        time: "4-5pm",
        location: "Diamante del Bosque, Hacienda Pinilla",
        // cost fields kept internally, not rendered
      }
    ],
    evening: [
      { 
        label: "Welcome Party", 
        description: "Meet the group, drinks, and introductions"
      },
      { 
        label: "Dinner", 
        time: "7:30pm", 
        location: "@ Pangas",
        // Internal cost tracking (NOT rendered in UI)
        costNote: "~$30-$45",
        costMin: 30,
        costMax: 45
      }
    ]
  },
  
  transportNotes: "Getting around: shuttle, rental car, or taxi/uber from the villa",
  
  // Internal transport data (for reference only, not rendered)
  transport: [
    { type: "shuttle", cost: 21, costNote: "$21" },
    { type: "rental", cost: 29, costNote: "$29 pp" },
    { type: "taxi", cost: 15, costNote: "~$15 RT" }
  ]
};

/**
 * Central itinerary days array
 * 
 * This is the SINGLE SOURCE OF TRUTH for all schedule content.
 * All text, times, and activities are defined here, transcribed from the Google Sheets table.
 * Components must read from this array only - no hardcoded copy.
 * 
 * All cost information is kept in hiddenCostData field and NEVER rendered in the UI.
 */
export const itineraryDays: ItineraryDay[] = [
  // Day 1: Fri Feb 13 - Arrival
  {
    id: "day-1",
    dayNumber: 1,
    dateLabel: "Fri Feb 13",
    fullDate: "Friday, February 13th",
    dateValue: "2026-02-13",
    theme: "arrival",
    themeColor: "#E8D5B7", // Warm sand
    heroImageSrc: "/images/itinerary/day-1-arrival.jpg",
    shortLabel: "Arrival",
    title: "Arrivals and Welcome Party",
    subtitle: "Settle in, meet the group, and kick off the week with dinner and drinks.",
    heroTagline: "Touch down, drop bags, grab a drink. The real week starts tonight.",
    includes: [
      { label: "Welcome Party", icon: "party", description: "Meet and greet with the group" },
      { label: "Dinner @ Pangas", icon: "dinner", description: "Group dinner to start the week" },
    ],
    timeline: {
      afternoon: [
        { label: "Arrive", time: "4-5pm", location: "Diamante del Bosque, Hacienda Pinilla" },
      ],
      evening: [
        { label: "Welcome Party", description: "Meet the group, drinks, and introductions" },
        { label: "Dinner", time: "7:30pm", location: "@ Pangas", costNote: "~$30-$45", costMin: 30, costMax: 45 },
      ],
    },
    transportNotes: "Getting around: shuttle, rental car, or taxi/uber from the villa",
    transport: [
      { type: "shuttle", cost: 21, costNote: "$21" },
      { type: "rental", cost: 29, costNote: "$29 pp" },
      { type: "taxi", cost: 15, costNote: "~$15 RT" },
    ],
  },

  // Day 2: Sat Feb 14 - Valentines
  {
    id: "day-2",
    dayNumber: 2,
    dateLabel: "Sat Feb 14",
    fullDate: "Saturday, February 14th",
    dateValue: "2026-02-14",
    theme: "valentines",
    themeColor: "#FF6B6B", // Coral
    heroImageSrc: "/images/itinerary/day-2-valentines.jpg",
    shortLabel: "Valentines Beach Club",
    title: "Valentines at the Beach Club",
    subtitle: "A full day at Tamarindo Beach Club with watersports, brunch, and sunset drinks.",
    heroTagline: "Sun, sand, good music, and good company. Valentines hits different here.",
    includes: [
      { label: "Tamarindo Beach Club", icon: "beach", description: "Daybed and pool access" },
      { label: "Watersports", icon: "water-sports", description: "Surfing, paddleboard, kayaks, beach volleyball" },
      { label: "Brunch", icon: "food", description: "At the beach club" },
      { label: "Drinks @ Langosta", icon: "drinks", description: "Beachside cocktails" },
      { label: "Dinner @ El Marcadito", icon: "dinner", description: "Choose your own adventure" },
    ],
    timeline: {
      morning: [
        { label: "Brunch", location: "@ Tamarindo Beach Club", costNote: "~$18pp", costMin: 18, costMax: 18 },
      ],
      afternoon: [
        { label: "Beach Club Day", time: "12-6pm", location: "@ Tamarindo Beach Club", description: "Daybed, pool, and watersports access" },
        { label: "Watersports", description: "Surfing, paddleboard, kayaks, beach volleyball available" },
        { label: "Drinks", location: "@ Langosta", description: "Beachside cocktails and relaxation" },
      ],
      evening: [
        { label: "Dinner", location: "@ El Marcadito", description: "Choose your own adventure", costNote: "~$14-$30", costMin: 14, costMax: 30 },
      ],
    },
    transportNotes: "Getting around: rental car or taxi/uber from the villa",
    transport: [
      { type: "rental", cost: 29, costNote: "$29 pp" },
      { type: "taxi", cost: 15, costNote: "~$15 RT" },
    ],
    extraNotes: {
      optionalActivities: [
        { label: "ATV", costNote: "$125-147", costMin: 125, costMax: 147 },
        { label: "Ziplining", costNote: "$77", costMin: 77, costMax: 77 },
        { label: "Kayak wildlife", costNote: "$56 | $98", costMin: 56, costMax: 98 },
        { label: "Horseback", costNote: "$84", costMin: 84, costMax: 84 },
        { label: "Kayak isla", costNote: "$91", costMin: 91, costMax: 91 },
      ],
      notes: [
        "Beach club includes: daybed and pool access, watersports equipment (surfing, paddleboard, kayaks, beach volleyball)",
        "Optional activities available throughout the day",
      ],
    },
  },

  // Day 3: Sun Feb 15 - Free Day
  {
    id: "day-3",
    dayNumber: 3,
    dateLabel: "Sun Feb 15",
    fullDate: "Sunday, February 15th",
    dateValue: "2026-02-15",
    theme: "free-day",
    themeColor: "#4ECDC4", // Dusk teal
    heroImageSrc: "/images/itinerary/day-3-free-day.jpg",
    shortLabel: "Free Day",
    title: "Free Day and Night Market",
    subtitle: "Your day to explore, relax, or choose your own adventure. End with the vibrant night market.",
    heroTagline: "Sleep in, eat well, wander around. No plans, just vibes.",
    includes: [
      { label: "Breakfast", icon: "food", description: "At the villa" },
      { label: "Choose Your Own Adventure", icon: "explore", description: "Flexible day activities" },
      { label: "Night Market", icon: "market", description: "El Mercadito Tamarindo" },
    ],
    timeline: {
      morning: [
        { label: "Breakfast", location: "At the villa", costNote: "~$18pp", costMin: 18, costMax: 18 },
      ],
      afternoon: [
        { label: "Lunch", description: "Choose your own adventure", location: "Various locations" },
        { label: "Free Time", description: "Explore, relax, or join optional activities" },
      ],
      evening: [
        { label: "Dinner", description: "Choose your own adventure", costNote: "~$20-$30", costMin: 20, costMax: 30 },
        { label: "Night Market", location: "@ El Mercadito Tamarindo", description: "Local vendors, food, and atmosphere" },
      ],
    },
    transportNotes: "Getting around: rental car or taxi/uber from the villa",
    transport: [
      { type: "rental", cost: 29, costNote: "$29 pp" },
      { type: "taxi", cost: 15, costNote: "~$15 RT" },
    ],
    extraNotes: {
      notes: [
        "SIT Experience Guide available for recommendations and bookings",
        "Night market at El Mercadito Tamarindo offers local vendors, food, and vibrant atmosphere",
      ],
    },
  },

  // Day 4: Mon Feb 16 - Adventure
  {
    id: "day-4",
    dayNumber: 4,
    dateLabel: "Mon Feb 16",
    fullDate: "Monday, February 16th",
    dateValue: "2026-02-16",
    theme: "adventure",
    themeColor: "#134E4A", // Deep jungle green
    heroImageSrc: "/images/itinerary/day-4-adventure.jpg",
    shortLabel: "Adventure",
    title: "Adventure and Hot Springs",
    subtitle: "River tubing, hot springs, and authentic Costa Rican cuisine. Choose your adventure path.",
    heroTagline: "Pick your wild. Waterfalls, tubing, or hot springs. It is all unreal.",
    includes: [
      { label: "Adventure Tour", icon: "adventure", description: "Water or land option" },
      { label: "River Tubing", icon: "water", description: "La Leona river adventure" },
      { label: "Hot Springs", icon: "hot-springs", description: "Natural thermal pools" },
      { label: "Lunch Included", icon: "food", description: "Tour includes lunch" },
      { label: "Local Dinner", icon: "dinner", description: "Authentic Costa Rican spot" },
    ],
    timeline: {
      morning: [
        { label: "Breakfast", location: "At the villa", costNote: "~$18pp", costMin: 18, costMax: 18 },
        { label: "Adventure Tour Departure", description: "Choose Option 1 (Water) or Option 2 (Land)" },
      ],
      afternoon: [
        { label: "Adventure Tour", description: "Full day adventure with lunch included" },
        { label: "Option 1: Water", description: "La Leona, River Tubing, Lunch, Hot Springs" },
        { label: "Option 2: Land", description: "Rincon Vieja, Oropendola, Lunch, Hot Springs" },
      ],
      evening: [
        { label: "Dinner", location: "@ Local Costa Rican spot", description: "Authentic local cuisine", costNote: "~$20-$30", costMin: 20, costMax: 30 },
      ],
    },
    transportNotes: "Getting around: rental car or taxi/uber from the villa",
    transport: [
      { type: "rental", cost: 29, costNote: "$29 pp" },
      { type: "taxi", cost: 15, costNote: "~$15 RT" },
    ],
    extraNotes: {
      adventureOptions: [
        {
          id: "opt-1-water",
          label: "Option 1: Water",
          description: "La Leona, River Tubing, Lunch, Hot Springs",
          activities: ["La Leona", "River Tubing", "Lunch", "Hot Springs"],
          cost: 210,
          costNote: "$210",
        },
        {
          id: "opt-2-land",
          label: "Option 2: Land",
          description: "Rincon Vieja, Oropendola, Lunch, Hot Springs",
          activities: ["Rincon Vieja", "Oropendola", "Lunch", "Hot Springs"],
          cost: 210,
          costNote: "$210",
        },
      ],
      notes: [
        "SIT Experience Guide available for tour details and booking",
        "Both adventure options include lunch and hot springs",
      ],
    },
  },

  // Day 5: Tues Feb 17 - Catamaran
  {
    id: "day-5",
    dayNumber: 5,
    dateLabel: "Tues Feb 17",
    fullDate: "Tuesday, February 17th",
    dateValue: "2026-02-17",
    theme: "catamaran",
    themeColor: "#4A90E2", // Bright ocean blue
    heroImageSrc: "/images/itinerary/day-5-catamaran.jpg",
    shortLabel: "Catamaran",
    title: "Catamaran and Private Chef Night",
    subtitle: "Sunset catamaran tour followed by an intimate private chef dinner at the villa.",
    heroTagline: "Private boat, open bar, ocean breeze. This is the day everyone will talk about.",
    includes: [
      { label: "Sunset Catamaran Tour", icon: "boat", description: "Private boat for the group" },
      { label: "Breakfast", icon: "food", description: "At the villa" },
      { label: "Lunch", icon: "food", description: "Choose your own adventure" },
      { label: "Private Chef Dinner", icon: "chef", description: "At the villa" },
      { label: "Bartender Service", icon: "drinks", description: "Cocktails and drinks" },
    ],
    timeline: {
      morning: [
        { label: "Breakfast", location: "At the villa", costNote: "~$18pp", costMin: 18, costMax: 18 },
      ],
      afternoon: [
        { label: "Lunch", description: "Choose your own adventure" },
        { label: "Catamaran Tour Departure", description: "Sunset catamaran tour" },
      ],
      evening: [
        { label: "Sunset Catamaran Tour", description: "Private boat tour for the group" },
        { label: "Private Chef Dinner", time: "Evening", location: "At the villa", description: "Intimate dinner prepared by private chef", costNote: "~$70pp", costMin: 70, costMax: 70 },
        { label: "Bartender Service", description: "Cocktails and drinks throughout the evening" },
      ],
    },
    transportNotes: "Getting around: rental car or taxi/uber from the villa",
    transport: [
      { type: "rental", cost: 29, costNote: "$29 pp" },
      { type: "taxi", cost: 15, costNote: "~$15 RT" },
    ],
    extraNotes: {
      foodNote: "Private chef dinner includes preset menu - whole menu available",
      notes: [
        "Catamaran tour: private boat for the group, sunset timing",
        "Private chef dinner includes preset menu with full menu options available",
        "Bartender service throughout the evening",
      ],
    },
  },

  // Day 6: Wed Feb 18 - Departure
  {
    id: "day-6",
    dayNumber: 6,
    dateLabel: "Wed Feb 18",
    fullDate: "Wednesday, February 18th",
    dateValue: "2026-02-18",
    theme: "departure",
    themeColor: "#95A5A6", // Calm neutral
    heroImageSrc: "/images/itinerary/day-6-departure.jpg",
    shortLabel: "Departure",
    title: "Departure Day",
    subtitle: "Farewell breakfast and airport shuttles. Until next time, Costa Rica.",
    heroTagline: "Pack up, hug it out, one last coffee. Paradise officially conquered.",
    includes: [
      { label: "Breakfast", icon: "food", description: "Final morning at the villa" },
      { label: "Airport Shuttles", icon: "transport", description: "Organized departures" },
    ],
    timeline: {
      morning: [
        { label: "Breakfast", location: "At the villa", description: "Final group breakfast" },
        { label: "Checkout", description: "Pack and prepare for departure" },
      ],
      afternoon: [
        { label: "Airport Departures", description: "Organized shuttles to airport based on flight times" },
      ],
    },
    transportNotes: "Getting around: shuttle, rental car return, or taxi/uber to airport",
    transport: [
      { type: "shuttle", cost: 21, costNote: "$21" },
      { type: "rental", cost: 29, costNote: "$29 pp" },
      { type: "taxi", cost: 15, costNote: "~$15 RT" },
    ],
  },
];

