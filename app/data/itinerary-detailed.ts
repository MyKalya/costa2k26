/**
 * Detailed Itinerary Data
 * 
 * Exact copy from user requirements, structured for the itinerary page.
 * All content matches the provided copy exactly.
 */

export interface TimelineEvent {
  time: string;
  title: string;
  location: string;
  note: string;
}

export interface DayData {
  id: string;
  dayNumber: number;
  dayLabel: string; // e.g., "Day 1 • Fri Feb 13"
  dateLabel: string; // e.g., "Fri Feb 13"
  title: string;
  summary: string;
  events: TimelineEvent[];
  gettingAround: string;
  extraNotes?: {
    label: string;
    copy: string;
  };
}

export const itineraryData: DayData[] = [
  {
    id: "day-1",
    dayNumber: 1,
    dayLabel: "Day 1 • Fri Feb 13",
    dateLabel: "Fri Feb 13",
    title: "Arrivals and Welcome Party",
    summary: "Settle in, meet the group, and kick off the week with dinner and drinks.",
    events: [
      {
        time: "4–5 pm",
        title: "Arrive at the villa",
        location: "Diamante del Bosque, Hacienda Pinilla",
        note: "Check in, drop your bags, and grab a drink by the pool.",
      },
      {
        time: "Evening",
        title: "Welcome party",
        location: "At the villa",
        note: "Casual vibes, music, and time to meet everyone.",
      },
      {
        time: "7:30 pm",
        title: "Dinner",
        location: "Pangas Beach Club",
        note: "Beachfront dinner and drinks to start the trip right.",
      },
    ],
    gettingAround: "Shuttle, rental car, or taxi or Uber from the villa.",
  },
  {
    id: "day-2",
    dayNumber: 2,
    dayLabel: "Day 2 • Sat Feb 14",
    dateLabel: "Sat Feb 14",
    title: "Valentines at the Beach Club",
    summary: "A full day at Tamarindo Beach Club with watersports, brunch, and sunset drinks.",
    events: [
      {
        time: "Morning",
        title: "Brunch",
        location: "Tamarindo Beach Club",
        note: "Slow morning, good coffee, and a first swim.",
      },
      {
        time: "12–6 pm",
        title: "Beach club day",
        location: "Tamarindo Beach Club",
        note: "Daybeds, pool, and access to watersports gear.",
      },
      {
        time: "Afternoon",
        title: "Watersports",
        location: "Tamarindo Beach Club",
        note: "Surfing, paddleboard, kayaks, and beach volleyball.",
      },
      {
        time: "Afternoon",
        title: "Drinks",
        location: "Langosta area",
        note: "Optional: head over to Langosta for a drink and sunset.",
      },
      {
        time: "Evening",
        title: "Dinner",
        location: "El Mercadito",
        note: "Food stalls, cocktails, and a relaxed night market vibe.",
      },
    ],
    gettingAround: "Rental car or taxi or Uber from the villa.",
    extraNotes: {
      label: "What is included at the beach club",
      copy: "Daybed and pool access, watersports equipment, and a full bar and restaurant on site.",
    },
  },
  {
    id: "day-3",
    dayNumber: 3,
    dayLabel: "Day 3 • Sun Feb 15",
    dateLabel: "Sun Feb 15",
    title: "Free Day and Night Market",
    summary: "Your day to explore, relax, or choose your own adventure, with the night market to close it out.",
    events: [
      {
        time: "Morning",
        title: "Breakfast",
        location: "At the villa",
        note: "Slow breakfast, pool time, or a quick walk around the property.",
      },
      {
        time: "Afternoon",
        title: "Free time",
        location: "Tamarindo and nearby beaches",
        note: "Explore Tamarindo, grab lunch wherever you like, or head to a nearby playa.",
      },
      {
        time: "Evening",
        title: "Dinner",
        location: "Tamarindo",
        note: "Pick your own spot or follow the group.",
      },
      {
        time: "Evening",
        title: "Night market",
        location: "El Mercadito Tamarindo",
        note: "Local vendors, food, music, and a very Tamarindo vibe.",
      },
    ],
    gettingAround: "Rental car or taxi or Uber from the villa.",
    extraNotes: {
      label: "SIT experience guide",
      copy: "Our SIT experience guide is available for recommendations and bookings if you want help planning your free day.",
    },
  },
  {
    id: "day-4",
    dayNumber: 4,
    dayLabel: "Day 4 • Mon Feb 16",
    dateLabel: "Mon Feb 16",
    title: "Adventure and Hot Springs",
    summary: "River tubing, hot springs, and authentic Costa Rican cuisine. Choose your adventure path.",
    events: [
      {
        time: "Morning",
        title: "Breakfast",
        location: "At the villa",
        note: "Light breakfast before a full adventure day.",
      },
      {
        time: "Morning",
        title: "Adventure tour departure",
        location: "Pickup from the villa",
        note: "Group departs for a guided adventure tour.",
      },
      {
        time: "Afternoon",
        title: "Adventure tour",
        location: "Rivers and hot springs",
        note: "River tubing, hot springs, and time to explore the property.",
      },
      {
        time: "Afternoon",
        title: "Option 1: Water",
        location: "On site",
        note: "Stick with water activities and soak in the hot springs.",
      },
      {
        time: "Afternoon",
        title: "Option 2: Land",
        location: "On site",
        note: "Choose land based activities, depending on what the tour offers that day.",
      },
      {
        time: "Evening",
        title: "Dinner",
        location: "Local Costa Rican spot",
        note: "Group dinner with classic Costa Rican dishes.",
      },
    ],
    gettingAround: "Round trip transport is organized as part of the tour, plus backup options by rental car if needed.",
  },
  {
    id: "day-5",
    dayNumber: 5,
    dayLabel: "Day 5 • Tue Feb 17",
    dateLabel: "Tue Feb 17",
    title: "Catamaran Party at Sea",
    summary: "Sail, swim, and watch the sunset from the water with the whole group.",
    events: [
      {
        time: "Morning",
        title: "Slow morning",
        location: "At the villa",
        note: "Sleep in, swim, or walk the property.",
      },
      {
        time: "Early afternoon",
        title: "Transfer to marina",
        location: "Pickup from villa",
        note: "Shuttle or carpool to the catamaran departure point.",
      },
      {
        time: "Afternoon",
        title: "Catamaran cruise",
        location: "Pacific coast",
        note: "Open bar, snacks, music, and time in the water.",
      },
      {
        time: "Sunset",
        title: "Sunset sail",
        location: "On the catamaran",
        note: "Golden hour views and photos with the group.",
      },
      {
        time: "Evening",
        title: "Return to villa",
        location: "Diamante del Bosque",
        note: "Open evening. Light dinner and hangout back at the villa.",
      },
    ],
    gettingAround: "Group transport to and from the marina is organized. If you miss the shuttle, taxis or Ubers are available from Tamarindo.",
  },
  {
    id: "day-6",
    dayNumber: 6,
    dayLabel: "Day 6 • Wed Feb 18",
    dateLabel: "Wed Feb 18",
    title: "Last Morning and Departures",
    summary: "One last slow morning together before everyone heads home.",
    events: [
      {
        time: "Morning",
        title: "Breakfast and checkout",
        location: "At the villa",
        note: "Pack up, grab breakfast, and say goodbye.",
      },
      {
        time: "Late morning and afternoon",
        title: "Airport departures",
        location: "Liberia International Airport",
        note: "Shuttles and car shares based on your flight time.",
      },
    ],
    gettingAround: "Pre booked airport shuttles, rental cars, or shared rides based on your plans.",
    extraNotes: {
      label: "Departure details",
      copy: "We will share a final message in the group chat with shuttle times and any last minute updates.",
    },
  },
];

