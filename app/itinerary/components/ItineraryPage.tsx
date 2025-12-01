"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "./HeroSection";
import { DayScroller } from "./DayScroller";
import { DayCard, type DayCardProps } from "./DayCard";

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
    vibeSummary: "First night in Costa Rica. Settle in, meet the crew, PURA VIDA FAMILIA.",
    notes: [
      "Welcome party dress code: all white.",
      "Pack a light layer for the evening breeze.",
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
        location: "At the villa or Pangas",
        description: "Casual vibes, music, and time to meet everyone.",
        icon: "party",
      },
      {
        time: "7:30 pm",
        title: "Dinner",
        location: "Pangas",
        description: "Beachfront dinner and drinks to kick us off.",
        icon: "meal",
      },
    ],
    gettingAround: "Shuttle, rental car, or taxi or Uber from the villa.",
  },
  {
    id: "day-2",
    dayIndex: 2,
    dateLabel: "Sat Feb 14",
    title: "Backyard BBQ & Beach Club",
    summary: "",
    themeColor: "#E8A48F",
    cardBg: "#FDEFEA",
    bannerImage: "/media/itinerary/day2-banner.png",
    vibeSummary: "A slow, fun day at the villa. BBQ, pool time, music, and using all the good stuff the villa has to offer. In the evening, anyone who's up for it can slide over to Puerto de Sal for beach club vibes, food, and music.",
    notes: [
      "Great day to book optional excursions or spa.",
      "Bring a small bag if you plan to shop at the night market.",
      "Ask our experience guide if you want help planning.",
    ],
    events: [
      {
        time: "Late Morning/Afternoon",
        title: "BBQ & Pool",
        location: "",
        description: "Drinks flowing, music on, sauna, jacuzzi and a laid back BBQ using the outdoor kitchen and grill.",
        icon: "beach",
      },
      {
        time: "Evening",
        title: "Puerto De Sal Beach Club",
        location: "",
        description: "We'll grab a bite (+ drinks) at El Marcadito for local vendors, food, cockatail and music then head to the beach club if you're feeling the night.",
        icon: "beach",
      },
    ],
    gettingAround: "Uber",
  },
  {
    id: "day-3",
    dayIndex: 3,
    dateLabel: "Sun Feb 15",
    title: "Adventure and Hot Springs",
    summary: "River tubing, hot springs, and authentic Costa Rican cuisine.",
    themeColor: "#4AA7A4",
    cardBg: "#EBF7F6",
    bannerImage: "/media/itinerary/day3-banner.png",
    vibeSummary: "Adventure day. Rivers, hot springs, and a little bit of jungle.",
    notes: [
      "Bring a bathing suit and a change of clothes. There are lots of chances to get into the water.",
      "Wear secure shoes that can handle water and uneven ground.",
      "Towel and dry bag are recommended for your phone.",
    ],
    events: [
      {
        time: "Morning",
        title: "10am pickup at the villa",
        location: "",
        description: "",
        icon: "adventure",
      },
      {
        time: "Afternoon",
        title: "Adventure tour - Choose your route",
        location: "",
        description: "Pick between two routes. Both include a Costa Rican lunch and hot springs at the end. (We're doing Option 1)",
        icon: "adventure",
      },
      {
        time: "Afternoon",
        title: "Route 1: La Leona Waterfall Hike + White Water Tubing + Hot Springs/Mud treatment",
        location: "",
        description: "Moderate. Short hike through the rapids to a bright blue canyon waterfall, followed by fun river tubing and a relaxed hot spring finish.",
        icon: "adventure",
      },
      {
        time: "Afternoon",
        title: "Route 2: Rincón de la Vieja + Ziplining + Hot Springs/Mud treatment",
        location: "",
        description: "Moderate. Classic national park hike with volcanic scenery, zipline through the canyon, and hot springs to end the day.",
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
    gettingAround: "Round trip transport is organized as part of the tour, plus backup options by rental car if needed.",
  },
  {
    id: "day-4",
    dayIndex: 4,
    dateLabel: "Mon Feb 16",
    title: "ATVs or Explore",
    summary: "A full day at Tamarindo Beach Club with watersports, brunch, and sunset drinks.",
    themeColor: "#3A784F",
    cardBg: "#E7F2EB",
    bannerImage: "/media/itinerary/day4-banner.png",
    vibeSummary: "Choose your own adventure. Explore town, do an activity, come ATV'ing with us, options are endless. Nothing is mandatory. Go with whatever pace feels right. But let's do dinner together, hosted by Private Chef Danny",
    notes: [
      "Bring sunglasses, hat, and sunscreen.",
      "Light, beach friendly outfits are perfect.",
      "If you plan on doing the ATV tour, wear something comfortable that you don't mind getting dusty.",
    ],
    events: [
      {
        time: "Morning",
        title: "Light Breakfast at the villa.",
        location: "",
        description: "",
        icon: "meal",
      },
      {
        time: "Afternoon",
        title: "Explore Tamarindo, do a short adventure as couples, in groups, or grab a day bed at Hacienda Pinilla beach club for only $5 USD and chill (click here for adventure details).",
        location: "",
        description: "",
        icon: "free",
      },
      {
        time: "Afternoon",
        title: "Secret Beaches ATV tour",
        location: "",
        description: "We'll ride through rivers, mountains, forests and fields to reach Playa Minas, Bahía Los Piratas, and Puerto Viejo. Expect a fun ride, great views, and maybe some wildlife like monkeys, birds and iguanas along the way.",
        icon: "adventure",
      },
      {
        time: "Afternoon",
        title: "Sunset Drinks on Tamarindo Beach",
        location: "",
        description: "Optional: Come and join us if you're already on the beach.",
        icon: "beach",
      },
      {
        time: "Evening",
        title: "Private Chef @ the villa",
        location: "",
        description: "Chef Danny hosted dinner for my couples and my single pringles in honor of valentines day <3",
        icon: "meal",
      },
    ],
    gettingAround: "Rental cars will be reserved for adventure groups",
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
    vibeSummary: "The big party. A full afternoon on the water with swimming, music, drinks, and a sunset that hits different when you're out at sea.",
    notes: [
      "Bring swimwear and something dry for the sail back.",
      "Sunscreen, sunglasses, and a hat are your best friends.",
      "Avoid bringing valuables that cannot get wet (or bring your dry bag).",
      "Outfit Themes - Warm Sunset Colors: Think warm tones that match a sunset — terracotta, coral, peach, rust, gold, soft yellow, plum, or rose.Swim sets, shorts, linen, dresses, shirts… anything goes as long as the color hits the sunset vibe",
    ],
    events: [
      {
        time: "Morning",
        title: "Slow morning & light breakfast",
        location: "At the villa",
        description: "Sleep in, golf, swim, visit the beach club",
        icon: "free",
      },
      {
        time: "Afternoon",
        title: "Catamaran cruise",
        location: "Pacific coast",
        description: "Open bar, snacks, music, and time in the water (paddleboard, kayaks, snorkelling, etc.)",
        icon: "boat",
      },
      {
        time: "Sunset",
        title: "Sunset sail",
        location: "On the catamaran",
        description: "Sunset hits different out here. Music up, drinks flowing, the whole crew, and a full blown boat party as the sky goes orange.",
        icon: "boat",
      },
      {
        time: "Night",
        title: "Bonfire at the villa or one last bar crawl. We'll feel it out.",
        location: "",
        description: "",
        icon: "party",
      },
    ],
    gettingAround: "Group transport to and from the marina is organized. If you miss the shuttle, taxis or Ubers are available from Tamarindo.",
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
    vibeSummary: "Home Time.",
    notes: [
      "Keep your passport and boarding pass handy.",
      "Double and triple check your rooms and villa.",
      "Please do not leave any valuables behind.",
    ],
    events: [
      {
        time: "Morning",
        title: "Airport departures",
        location: "Liberia International Airport",
        description: "Car shares based on your flight time.",
        icon: "plane",
      },
    ],
    gettingAround: "Pre booked airport shuttles, rental cars, or shared rides based on your plans.",
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
    const handleScroll = () => {
      const viewportTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportTop + viewportHeight / 2;

      let activeDay = days[0];
      let minDistance = Infinity;

      days.forEach((day) => {
        const section = document.getElementById(day.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionHeight = rect.height;
          const sectionCenter = sectionTop + sectionHeight / 2;

          // Calculate distance from viewport center to section center
          const distance = Math.abs(viewportCenter - sectionCenter);

          // Check if section is in viewport (at least partially visible)
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

          if (isVisible && distance < minDistance) {
            minDistance = distance;
            activeDay = day;
          }
        }
      });

      setActiveDayId(activeDay.id);
    };

    // Throttle scroll handler
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", throttledScroll);
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
    </div>
  );
}
