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
      "Pro tip: Stop at PriceSmart by the airport before heading to Pinilla for major grocery purchases. It's cheaper than Tamarindo.",
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
        title: "Welcome night",
        location: "At the villa",
        description: "Private chef experience at the villa. For those who want to stay up and party the first night, we'll head over to Tamarindo to continue the partying.",
        icon: "party",
      },
    ],
    gettingAround: "Shuttles will be arranged for everyone arriving on this day. We'll use Ubers between our villa and Tamarindo for anyone going out that night.",
  },
  {
    id: "day-2",
    dayIndex: 2,
    dateLabel: "Sat Feb 14",
    title: "Villa BBQ and Bar Crawl",
    summary: "",
    themeColor: "#E8A48F",
    cardBg: "#FDEFEA",
    bannerImage: "/media/itinerary/day2-banner.png",
    vibeSummary: "Poolside BBQ at the villa, then we'll head into Tamarindo for a special Valentine's dinner show before the bar crawl.",
    notes: [
      "Valentine's Day: do your own thing during the day if you want, but we want everyone together for the evening. Please be at Crazy Monkey by 7:30 PM.",
      "We're aiming to be in Tamarindo for 5:00 PM to catch the sunset, and anyone is free to join if they want to be in Tamarindo earlier too.",
    ],
    events: [
      {
        time: "Late Morning/Afternoon",
        title: "BBQ & Pool",
        location: "",
        description: "Drinks flowing, saunas, heated jacuzzi and a laidback BBQ using the awesome amenities the villa has to offer.",
        icon: "beach",
      },
      {
        time: "7:30 PM",
        title: "Valentine's Dinner Show",
        location: "",
        description: "Be at Crazy Monkey by 7:30 PM for a special Valentine's Day dinner show. This is where the night officially starts.",
        icon: "party",
      },
      {
        time: "Night",
        title: "Bar Crawl",
        location: "",
        description: "After the show, we roll into a Tamarindo bar crawl through El Be!, Nogui's, and other spots. Big energy, big drinks, late night.",
        icon: "party",
      },
    ],
    gettingAround: "Ubers.",
  },
  {
    id: "day-3",
    dayIndex: 3,
    dateLabel: "Sun Feb 15",
    title: "Waterfall Hike and Tubing",
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
        title: "8:45AM pickup at the villa",
        location: "",
        description: "Please do not be late as the bus will need to leave at 8:45AM at the latest! Please meet at villa 15 ready to leave and make sure to check below on how to prepare and what to bring.",
        icon: "adventure",
      },
      {
        time: "Afternoon",
        title: "La Leona Waterfall Hike + White Water Tubing",
        location: "",
        description: "Moderate. Short hike through the rapids to a bright blue canyon waterfall, followed by fun river tubing. Includes a Costa Rican lunch.",
        icon: "adventure",
        showPrepareButton: true,
      },
      {
        time: "Evening",
        title: "Dinner",
        location: "Local Costa Rican spot",
        description: "Group dinner with classic Costa Rican dishes.",
        icon: "meal",
      },
    ],
    gettingAround: "We've organized group transport as part of the tour. For the rest of the day, we'll use Ubers to go to Tamarindo and back.",
  },
  {
    id: "day-4",
    dayIndex: 4,
    dateLabel: "Mon Feb 16",
    title: "Tamarindo Activities & Villa Experience",
    summary: "Spend the day in Tamarindo with chosen activities, then return to the villa for a cooking experience.",
    themeColor: "#3A784F",
    cardBg: "#E7F2EB",
    bannerImage: "/media/itinerary/day4-banner.png",
    vibeSummary: "We'll spend the first half of the day in Tamarindo, relaxing and enjoying the activities we've all voted on. Then we'll head back to the villa for a cooking experience with Chef Antonio. Anyone up for heading out to town again to continue the party can do so!",
    notes: [
      "Bring sunglasses, hat, and sunscreen.",
      "Light, beach friendly outfits are perfect.",
      "Each activity has particular needs and we're paying cash for the best prices, so be mindful of that and bring enough cash!",
    ],
    events: [
      {
        time: "Morning",
        title: "Departure to Tamarindo",
        location: "",
        description: "Everyone will leave for Tamarindo at <strong>8:00AM</strong> via shuttle. We won't return to the villa until <strong>3:30PM</strong>.\n\n<strong>Plan for the Day:</strong>\nWe'll all get dropped off in Tamarindo. Our activities start and end at different times with different meeting points along the beach. Between activities, there's so much to do in Tamarindo, grab a bite, hit up a bar, toast on the beach, go shopping. Options are endless, and our <a href=\"/explore-tamarindo\" class=\"underline font-semibold\">Explore page</a> has great starting points. We'll leave Tamarindo together around <strong>3:30PM</strong> when everyone is finished.\n\nPlease familiarize yourself with your activity and logistics below.",
        icon: "adventure",
      },
      {
        time: "Afternoon",
        title: "Activity Details",
        location: "",
        description: "We've got four activities: Horseback Riding, ATV, Surf Lessons, and Kayak. Click below to see details about your activity.",
        icon: "adventure",
        showActivityButtons: true,
      },
      {
        time: "Evening",
        title: "Cooking experience @ the villa",
        location: "",
        description: "Chef Antonio will be hosting a fun cooking experience that we want everyone to participate in!",
        icon: "meal",
      },
      {
        time: "Night",
        title: "Head to town (optional)",
        location: "",
        description: "Anyone up for heading out to Tamarindo to continue the party can do so!",
        icon: "party",
      },
    ],
    gettingAround: "Group transport to Tamarindo and to your activities has been arranged, including transport back to our villa via shuttle.",
  },
  {
    id: "day-5",
    dayIndex: 5,
    dateLabel: "Tue Feb 17",
    title: "Catamaran Party",
    summary: "Sail, swim, and watch the sunset from the water with the whole group.",
    themeColor: "#3D829F",
    cardBg: "#E9F4F8",
    bannerImage: "/media/itinerary/day5-banner.png",
    vibeSummary: "The big party. A full afternoon on the water with swimming, music, drinks, and a sunset that hits different when you're out at sea.",
    notes: [
      "Catamaran dress-code: warm sunset.",
      "Bring swimwear and something dry for the sail back.",
      "Sunscreen, sunglasses, and a hat are your best friends.",
    ],
    events: [
      {
        time: "7:30AM",
        title: "Yoga class",
        location: "Playa Avellana",
        description: "Start with a scenic 20-minute walk to the beach, followed by an optional yoga session. Let Sherrena know if you'd like to join. A relaxed way to ease into the day and soak in the Costa sun.",
        icon: "sunrise",
      },
      {
        time: "Morning",
        title: "Slow morning & light breakfast",
        location: "At the villa",
        description: "Sleep in, golf, swim, or explore nearby for more options",
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
        description: "Music up, drinks flowing, the whole crew, and a full blown boat party as the sky goes orange.",
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
    gettingAround: "We've arranged transportation to and from the catamaran. For the final night out, we'll use Ubers.",
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
    gettingAround: "All shuttles and transportation for flights after 10AM have been arranged.",
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

  // Handle hash links (e.g., /itinerary#day-4-activity)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait for content to render, then scroll
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1)); // Remove the #
        if (element) {
          const offset = 100; // Account for sticky nav
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 500);
    }
  }, []);

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
