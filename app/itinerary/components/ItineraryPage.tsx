"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "./HeroSection";
import { DayScroller } from "./DayScroller";
import { DayCard, type DayCardProps } from "./DayCard";
import { FooterActions } from "./FooterActions";

const days: DayCardProps[] = [
  {
    id: "day-1",
    dayIndex: 1,
    dateLabel: "Fri Feb 13",
    title: "Arrivals and Welcome Party",
    summary: "Settle in, meet the group, and kick off the week with dinner and drinks.",
    themeColor: "#C46A28",
    cardBg: "#FDF3EA",
    bannerImage: "/media/itinerary/day1-banner.png",
    vibeSummary: "First night in Costa Rica. Soft landings, sunset views, and a warm welcome with the whole crew.",
    notes: [
      "Welcome party dress code: all white.",
      "Pack a light layer for ocean breeze at Pangas.",
      "Keep passports and valuables in the villa safe once you arrive.",
    ],
    events: [
      {
        time: "4-5 pm",
        title: "Arrive at the villa",
        location: "Diamante del Bosque, Hacienda Pinilla",
        description: "Check in, drop your bags, and grab a drink by the pool.",
        icon: "arrival",
      },
      {
        time: "Evening",
        title: "Welcome party",
        location: "At the villa",
        description: "Casual vibes, music, and time to meet everyone.",
        icon: "party",
      },
      {
        time: "7:30 pm",
        title: "Dinner",
        location: "Pangas Beach Club",
        description: "Beachfront dinner and drinks to start the trip right.",
        icon: "meal",
      },
    ],
    gettingAround: "Shuttle, rental car, or taxi or Uber from the villa.",
  },
  {
    id: "day-2",
    dayIndex: 2,
    dateLabel: "Sat Feb 14",
    title: "Valentines at the Beach Club",
    summary: "A full day at Tamarindo Beach Club with watersports, brunch, and sunset drinks.",
    themeColor: "#E8A48F",
    cardBg: "#FDEFEA",
    bannerImage: "/media/itinerary/day2-banner.png",
    vibeSummary: "Beach club Valentine energy. Daybeds, water, and slow-motion sunshine all day.",
    notes: [
      "Bring sunglasses, hat, and sunscreen.",
      "Light, beach friendly outfits are perfect.",
      "Tabs for food and drinks will be handled at the end of the day.",
    ],
    events: [
      {
        time: "Morning",
        title: "Brunch",
        location: "Tamarindo Beach Club",
        description: "Slow morning, good coffee, and a first swim.",
        icon: "meal",
      },
      {
        time: "12-6 pm",
        title: "Beach club day",
        location: "Tamarindo Beach Club",
        description: "Daybeds, pool, and access to watersports gear.",
        icon: "beach",
      },
      {
        time: "Afternoon",
        title: "Watersports",
        location: "Tamarindo Beach Club",
        description: "Surfing, paddleboard, kayaks, and beach volleyball.",
        icon: "beach",
      },
      {
        time: "Afternoon",
        title: "Drinks",
        location: "Langosta area",
        description: "Optional - head over to Langosta for a drink and sunset.",
        icon: "beach",
      },
      {
        time: "Evening",
        title: "Dinner",
        location: "El Mercadito",
        description: "Food stalls, cocktails, and a relaxed night market vibe.",
        icon: "meal",
      },
    ],
    gettingAround: "Rental car or taxi or Uber from the villa.",
  },
  {
    id: "day-3",
    dayIndex: 3,
    dateLabel: "Sun Feb 15",
    title: "Free Day and Night Market",
    summary:
      "Your day to explore, relax, or choose your own adventure, with the night market to close it out.",
    themeColor: "#4AA7A4",
    cardBg: "#EBF7F6",
    bannerImage: "/media/itinerary/day3-banner.png",
    vibeSummary: "Choose your own adventure. Explore town, find your spots, and end the night at the market.",
    notes: [
      "Great day to book optional excursions or spa.",
      "Bring a small bag if you plan to shop at the night market.",
      "Ask our experience guide if you want help planning.",
    ],
    events: [
      {
        time: "Morning",
        title: "Breakfast",
        location: "At the villa",
        description: "Slow breakfast, pool time, or a quick walk around the property.",
        icon: "meal",
      },
      {
        time: "Afternoon",
        title: "Free time",
        location: "Tamarindo and nearby beaches",
        description:
          "Explore Tamarindo, grab lunch wherever you like, or head to a nearby playa.",
        icon: "free",
      },
      {
        time: "Evening",
        title: "Dinner",
        location: "Tamarindo",
        description: "Pick your own spot or follow the group.",
        icon: "meal",
      },
      {
        time: "Evening",
        title: "Night market",
        location: "El Mercadito Tamarindo",
        description: "Local vendors, food, music, and a very Tamarindo vibe.",
        icon: "free",
      },
    ],
    gettingAround: "Rental car or taxi or Uber from the villa.",
  },
  {
    id: "day-4",
    dayIndex: 4,
    dateLabel: "Mon Feb 16",
    title: "Adventure and Hot Springs",
    summary: "River tubing, hot springs, and authentic Costa Rican cuisine.",
    themeColor: "#3A784F",
    cardBg: "#E7F2EB",
    bannerImage: "/media/itinerary/day4-banner.png",
    vibeSummary: "Adventure day. Rivers, hot springs, and a little bit of jungle.",
    notes: [
      "Bring a change of clothes in case you get wet.",
      "Wear secure shoes that can handle water and uneven ground.",
      "Towel and dry bag are recommended for your phone.",
    ],
    events: [
      {
        time: "Morning",
        title: "Breakfast",
        location: "At the villa",
        description: "Light breakfast before a full adventure day.",
        icon: "meal",
      },
      {
        time: "Morning",
        title: "Adventure tour departure",
        location: "Pickup from the villa",
        description: "Group departs for a guided adventure tour.",
        icon: "adventure",
      },
      {
        time: "Afternoon",
        title: "Adventure tour",
        location: "Rivers and hot springs",
        description: "River tubing, hot springs, and time to explore the property.",
        icon: "adventure",
      },
      {
        time: "Afternoon",
        title: "Option 1 - Water",
        location: "On site",
        description: "Stick with water activities and soak in the hot springs.",
        icon: "adventure",
      },
      {
        time: "Afternoon",
        title: "Option 2 - Land",
        location: "On site",
        description: "Choose land based activities, depending on what the tour offers that day.",
        icon: "adventure",
      },
      {
        time: "Evening",
        title: "Dinner",
        location: "Local Costa Rican spot",
        description: "Group dinner with classic Costa Rican dishes.",
        icon: "meal",
      },
    ],
    gettingAround:
      "Round trip transport is organized as part of the tour, plus backup options by rental car if needed.",
  },
  {
    id: "day-5",
    dayIndex: 5,
    dateLabel: "Tue Feb 17",
    title: "Catamaran Party at Sea",
    summary: "Sail, swim, and watch the sunset from the water with the whole group.",
    themeColor: "#3D829F",
    cardBg: "#E9F4F8",
    bannerImage: "/media/itinerary/day5-banner.png",
    vibeSummary: "Catamaran party at sea. Swim, sail, and watch the sunset from the water.",
    notes: [
      "Bring swim outfits and something dry for the sail back.",
      "Sunscreen, sunglasses, and a hat are your best friends.",
      "Avoid bringing valuables that cannot get wet.",
    ],
    events: [
      {
        time: "Morning",
        title: "Slow morning",
        location: "At the villa",
        description: "Sleep in, swim, or walk the property.",
        icon: "free",
      },
      {
        time: "Early afternoon",
        title: "Transfer to marina",
        location: "Pickup from villa",
        description: "Shuttle or carpool to the catamaran departure point.",
        icon: "boat",
      },
      {
        time: "Afternoon",
        title: "Catamaran cruise",
        location: "Pacific coast",
        description: "Open bar, snacks, music, and time in the water.",
        icon: "boat",
      },
      {
        time: "Sunset",
        title: "Sunset sail",
        location: "On the catamaran",
        description: "Golden hour views and photos with the group.",
        icon: "boat",
      },
      {
        time: "Evening",
        title: "Return to villa",
        location: "Diamante del Bosque",
        description: "Open evening. Light dinner and hangout back at the villa.",
        icon: "boat",
      },
    ],
    gettingAround:
      "Group transport to and from the marina is organized. If you miss the shuttle, taxis or Ubers are available from Tamarindo.",
  },
  {
    id: "day-6",
    dayIndex: 6,
    dateLabel: "Wed Feb 18",
    title: "Last Morning and Departures",
    summary: "One last slow morning together before everyone heads home.",
    themeColor: "#AFA98A",
    cardBg: "#F5F3EA",
    bannerImage: "/media/itinerary/day6-banner.png",
    vibeSummary: "Last slow morning together before everyone heads home.",
    notes: [
      "Keep your passport and boarding pass handy.",
      "Double check check-out time and shuttle time.",
      "Leave anything you do not want to travel with in the villa's donation box.",
    ],
    events: [
      {
        time: "Morning",
        title: "Breakfast and checkout",
        location: "At the villa",
        description: "Pack up, grab breakfast, and say goodbye.",
        icon: "meal",
      },
      {
        time: "Late morning and afternoon",
        title: "Airport departures",
        location: "Liberia International Airport",
        description: "Shuttles and car shares based on your flight time.",
        icon: "plane",
      },
    ],
    gettingAround:
      "Pre booked airport shuttles, rental cars, or shared rides based on your plans.",
  },
];

/**
 * ItineraryPage - Main itinerary page component
 * 
 * Layout:
 * - Full-width hero section
 * - Sticky DayScroller navigation
 * - Vertical stack of day cards
 * - Footer with actions
 */
export default function ItineraryPage() {
  const [activeDayId, setActiveDayId] = useState(days[0].id);

  // Detect which day is in viewport (scrollspy)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dayId = entry.target.id;
            if (dayId && dayId.startsWith("day-")) {
              setActiveDayId(dayId);
            }
          }
        });
      },
      {
        root: null,
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    days.forEach((day) => {
      const section = document.getElementById(day.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      days.forEach((day) => {
        const section = document.getElementById(day.id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const handleViewDays = () => {
    document.getElementById("day-nav")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection onViewDays={handleViewDays} />

      {/* Sticky DayScroller */}
      <DayScroller activeDayId={activeDayId} onDaySelect={setActiveDayId} />

      {/* Day Cards */}
      <div className="px-4 py-12">
        {days.map((day) => (
          <DayCard key={day.id} {...day} />
        ))}
      </div>

      {/* Footer */}
      <FooterActions />
    </div>
  );
}
