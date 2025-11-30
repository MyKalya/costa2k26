"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Righteous } from "next/font/google";
import { tripDays } from "@/lib/tripDays";
import { videoConfig } from "@/lib/videoConfig";
import { useScroll, motion, useTransform, useInView } from "framer-motion";
import { Send, Calendar, Home as HomeIcon, Plane, LucideIcon, MessageCircle } from "lucide-react";
import { UpdatesTile } from "@/app/components/UpdatesTile";

const righteous = Righteous({
  subsets: ["latin"],
  weight: ["400"],
});

function CountdownChip() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const TARGET_DATE = new Date("2026-02-13T00:00:00-05:00").getTime();

    const getTimeLeft = () => {
      const now = Date.now();
      const diff = TARGET_DATE - now;

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0 };
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      return { days, hours, minutes };
    };

    setTimeLeft(getTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const { days, hours, minutes } = timeLeft;

  return (
    <div className="rounded-full bg-black/35 px-6 py-3 backdrop-blur-sm text-center text-white shadow-lg">
      <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/70 block mb-1">
        THE COUNTDOWN IS ON
      </span>
      <div className="flex items-baseline justify-center gap-1.5">
        <span className="text-lg font-semibold text-white">
          {days <= 0 ? "Today" : `${days} days`}
        </span>
        {days > 0 && (
          <span className="text-xs text-white/75">
            {hours.toString().padStart(2, "0")}h {minutes.toString().padStart(2, "0")}m
          </span>
        )}
      </div>
    </div>
  );
}

interface HubCardProps {
  title: string;
  description: string;
  status: string;
  ctaLabel: string;
  href: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  iconColor: string;
  ctaColor: string;
  index: number;
}

function HubCard({
  title,
  description,
  status,
  ctaLabel,
  href,
  icon: Icon,
  gradientFrom,
  gradientTo,
  iconColor,
  ctaColor,
  index,
}: HubCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.a
      ref={ref}
      href={href}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{
        duration: 0.45,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="group relative block rounded-3xl border border-white/20 p-6 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-filter backdrop-blur-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:-translate-y-[3px] transition-all duration-300 ease-out overflow-hidden"
      style={{
        background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      {/* Subtle brightness on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative flex items-start gap-5">
        {/* Premium gradient capsule icon */}
        <motion.div
          className="flex-shrink-0 mt-0.5"
          whileHover={{ y: -2, rotate: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl p-3 shadow-lg bg-white/15 backdrop-blur-sm border border-white/20">
            <Icon className="h-6 w-6" strokeWidth={2} style={{ color: iconColor }} />
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-lg font-semibold text-white leading-tight">
              {title}
            </h3>
            <span className="flex-shrink-0 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold text-white/90 whitespace-nowrap uppercase tracking-wide border border-white/10">
              {status}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-white/80 mb-4 leading-relaxed">
            {description}
          </p>

          {/* CTA Pill Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md transition-shadow duration-200 hover:shadow-lg"
              style={{ backgroundColor: ctaColor }}
            >
              {ctaLabel}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
}

const tripHubItems = [
  {
    id: "itinerary",
    title: "The full plan",
    description: "Day-by-day schedule and the full group itinerary.",
    status: "Live and updating",
    ctaLabel: "View the itinerary",
    href: "/itinerary",
    icon: Calendar,
    gradientFrom: "#0E3D2F",
    gradientTo: "#1C5A47",
    iconColor: "#10B981", // emerald 500 for contrast
    ctaColor: "#059669",
  },
  {
    id: "stay",
    title: "Where we're staying",
    description: "Villa details, photos, and your room details",
    status: "Live",
    ctaLabel: "Explore the villa",
    href: "/stay",
    icon: HomeIcon,
    gradientFrom: "#1F4E3A",
    gradientTo: "#2D6B57",
    iconColor: "#F3B44C", // mango gold for contrast
    ctaColor: "#F3B44C",
  },
  {
    id: "travel",
    title: "Travel basics",
    description: "Packing notes, arrival pointers, and what to expect.",
    status: "Updating gradually",
    ctaLabel: "View travel info",
    href: "/travel",
    icon: Plane,
    gradientFrom: "#145A47",
    gradientTo: "#0E3D2F",
    iconColor: "#1C736A", // ocean teal for contrast
    ctaColor: "#1C736A",
  },
];

const COMING_NEXT_CARDS = [
  {
    id: "activities",
    title: "Activities and planning",
    body: "We're finalizing a few add-ons and group options. Hot springs, ATV, surf lessons. We'll update the itinerary as things get confirmed.",
    status: "Updating weekly",
    accentColor: "green",
  },
  {
    id: "transport",
    title: "Transport and logistics",
    body: "Airport transfers and local transport details will be added here as they are booked. Check back for timing and arrival info.",
    status: "In progress",
    accentColor: "blue",
  },
  {
    id: "questions",
    title: "Questions or ideas?",
    body: "Message us on WhatsApp if you have questions or suggestions. This trip is for all of us, and we're open to anything you'd love to see.",
    status: "Open to ideas",
    accentColor: "coral",
    hasButton: true,
    buttonLabel: "Chat with us on WhatsApp",
    buttonLink: "https://wa.me/14168203093",
  },
];

export default function Home() {
  const router = useRouter();

  const handleViewPlan = () => {
    router.push("/itinerary");
  };

  return (
    <main className="bg-black text-white">
      <Hero />
      <TripHubSection />
      <WeekAtAGlance />
      <WhatsComingNext />
      <FinalCTA onViewPlan={handleViewPlan} />
    </main>
  );
}

function Hero() {
  const [shouldUseVideo, setShouldUseVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setShouldUseVideo(!mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener?.("change", handleChange);
    return () => mediaQuery.removeEventListener?.("change", handleChange);
  }, []);

  // Ensure video plays on mount and handle errors
  useEffect(() => {
    if (!shouldUseVideo || !videoRef.current) return;
    const video = videoRef.current;

    const handleCanPlay = () => {
      video.play().catch((error) => {
        console.warn("Video autoplay prevented:", error);
      });
    };

    const handleError = (e: Event) => {
      console.error("Video load error:", e);
      // Fall back to background image if video fails
      setShouldUseVideo(false);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    // Try to play immediately
    video.play().catch(() => {
      // Autoplay might be blocked, wait for user interaction
      console.log("Autoplay blocked, waiting for user interaction");
    });

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, [shouldUseVideo]);

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Background video */}
      {shouldUseVideo ? (
        <video
          ref={videoRef}
          src={videoConfig.hero}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="absolute inset-0 h-full w-full object-cover z-0"
          style={{ objectPosition: "35% center" }}
          aria-hidden="true"
        >
          <source src={videoConfig.hero} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 h-full w-full bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop')",
            backgroundPosition: "35% center",
          }}
        />
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/15" />

      {/* Content wrapper - better spaced layout */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 py-12">
        {/* TOP: Updates Tile - subtle notification at top */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-sm px-4">
          <UpdatesTile className="w-full" />
        </div>

        {/* CENTER GROUP: Title + Subtitle + Countdown - better spaced */}
        <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
          {/* Title + Subtitle */}
          <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-lg">
              Get Set for an Unreal Week Together!
            </h1>
            <p className="max-w-xs text-sm sm:text-base text-white/85 leading-relaxed drop-shadow-md">
              Five days in Hacienda Pinilla with our people. February 13–18, 2026.
            </p>
          </div>

          {/* Countdown bubble */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <CountdownChip />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TripHubSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Use scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  return (
    <section
      ref={sectionRef}
      className="bg-[#FFFDF7] text-[#111827] px-5 py-10 sm:py-14"
    >
      <div className="max-w-6xl mx-auto grid gap-6 sm:gap-8 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)] items-start">
        {/* Plane path and animation - left column */}
        <div className="hidden sm:block">
          <PlanePath scrollYProgress={scrollYProgress} />
        </div>

        {/* Text and cards - right column */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7280] mb-2">
            Your trip hub
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
            Everything you need to know in one place.
          </h2>
          <p className="text-sm text-[#4B5563] mb-6 max-w-xl">
            We&apos;ll keep this space updated as plans firm up, so check back anytime for updates.
          </p>

          <div className="space-y-6">
            {tripHubItems.map((item, index) => (
              <HubCard
                key={item.id}
                title={item.title}
                description={item.description}
                status={item.status}
                ctaLabel={item.ctaLabel}
                href={item.href}
                icon={item.icon}
                gradientFrom={item.gradientFrom}
                gradientTo={item.gradientTo}
                iconColor={item.iconColor}
                ctaColor={item.ctaColor}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type PlanePathProps = {
  scrollYProgress: any; // from useScroll
};

function PlanePath({ scrollYProgress }: PlanePathProps) {
  // Transform scroll progress to y position (from bottom to top, matching card stack height)
  const y = useTransform(scrollYProgress, [0, 1], [400, -20]);
  // Slight horizontal shift along the S-curve
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [0, 12, 0]);
  // Rotation to follow the curve
  const rotation = useTransform(scrollYProgress, [0, 0.5, 1], [-12, 3, 12]);

  return (
    <div className="relative h-[350px] sm:h-[450px] md:h-[500px] flex items-center justify-center">
      <svg
        viewBox="0 0 120 500"
        className="h-full w-auto text-[#D1D5DB]"
        aria-hidden="true"
      >
        {/* Soft curved S-shape dotted path */}
        <path
          id="trip-plane-path"
          d="M 60 450 Q 50 350 55 250 Q 60 150 50 100 Q 45 50 55 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 4"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>

      {/* Animated plane icon that floats and travels along path */}
      <motion.div
        className="absolute"
        style={{
          y,
          x,
          rotate: rotation,
        }}
      >
        <motion.div 
          className="flex h-6 w-6 items-center justify-center"
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Send 
            className="h-5 w-5 text-[#0E3D2F] rotate-[-45deg]" 
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function WeekAtAGlance() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const goToDay = (dayId: string) => {
    router.push(`/itinerary#${dayId}`);
  };

  return (
    <section ref={sectionRef} className="bg-[#FFFDF7] py-10">
      <div className="max-w-5xl mx-auto px-5 flex flex-col gap-5">
        {/* Heading block */}
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#9CA3AF]">
            WEEK AT A GLANCE
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827] max-w-md mt-1">
            Six days & a lifetime of memories.
          </h2>
        </div>

        {/* Cards container */}
        <div className="mt-4 flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {tripDays.map((day, index) => (
            <motion.button
              key={day.id}
              onClick={() => goToDay(day.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: 0.35,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              className="flex-shrink-0 w-52 sm:w-56 rounded-3xl bg-white border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden transition-transform transition-shadow duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] snap-start text-left"
            >
              {/* Top image with fixed aspect ratio */}
              <div className="relative w-full pt-[65%] overflow-hidden rounded-t-3xl">
                <img
                  src={day.image}
                  alt={day.label}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/* Bottom content area */}
              <div className="px-4 pt-3 pb-4 space-y-1.5">
                <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#6B7280]">
                  DAY {day.number}
                </p>
                <p className="text-sm sm:text-base font-semibold text-[#111827] leading-tight">
                  {day.label}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Mobile hint */}
        <p className="mt-2 text-[11px] text-[#9CA3AF] sm:hidden">
          Swipe to see all days
        </p>
      </div>
    </section>
  );
}

function WhatsComingNext() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getStatusStyles = (accentColor: string) => {
    switch (accentColor) {
      case "green":
        return "bg-green-50 text-green-700";
      case "blue":
        return "bg-blue-50 text-blue-700";
      case "coral":
        return "bg-orange-50 text-orange-700";
      default:
        return "bg-green-50 text-green-700";
    }
  };

  const getBorderColor = (accentColor: string) => {
    switch (accentColor) {
      case "green":
        return "border-l-green-500";
      case "blue":
        return "border-l-blue-500";
      case "coral":
        return "border-l-orange-500";
      default:
        return "border-l-green-500";
    }
  };

  return (
    <section ref={sectionRef} className="bg-[#FFFDF7] py-10 md:py-12">
      <div className="max-w-5xl mx-auto px-5 flex flex-col gap-6">
        {/* Heading block */}
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gray-500">
            WHAT&apos;S COMING NEXT
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#111827] max-w-xl mt-1">
            We&apos;re still building this trip together.
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600 max-w-xl">
            We&apos;re locking in a few more details and we&apos;d love your input. As we book more activities and transport, this site will stay up to date.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {COMING_NEXT_CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className={`rounded-3xl bg-white/90 border-l-[3px] ${getBorderColor(card.accentColor)} border-t border-r border-b border-[#F1EDE5] shadow-[0_4px_18px_rgba(0,0,0,0.04)] p-5 flex flex-col gap-3 h-full hover:-translate-y-[2px] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-200 ease-out`}
            >
              {/* Header row with title and status */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base md:text-lg font-semibold text-[#0f172a] flex-1">
                  {card.title}
                </h3>
                <span
                  className={`inline-flex items-center rounded-full ${getStatusStyles(card.accentColor)} text-[11px] font-medium px-3 py-1 flex-shrink-0`}
                >
                  {card.status}
                </span>
              </div>

              {/* Body */}
              <p className="text-sm text-gray-600 leading-relaxed flex-1">
                {card.body}
              </p>

              {/* WhatsApp button for card 3 */}
              {card.hasButton && card.buttonLabel && (
                <a
                  href={card.buttonLink}
          target="_blank"
          rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-600 text-emerald-700 text-sm font-medium px-4 py-2 hover:bg-emerald-50 transition-all duration-200 ease-out"
                >
                  <MessageCircle className="h-4 w-4" />
                  {card.buttonLabel}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onViewPlan }: { onViewPlan: () => void }) {
  return (
    <section className="bg-[#0E3D2F] text-white px-5 py-10 sm:py-14">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-2">Ready to see the full plan.</h2>
        <p className="text-sm text-white/80 mb-5">
          Walk through each day, where we are staying, and how to get there.
        </p>
        <button
          onClick={onViewPlan}
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0E3D2F] shadow-md hover:bg-[#F3F4F6] transition"
        >
          View the full itinerary
        </button>
      </div>
    </section>
  );
}
