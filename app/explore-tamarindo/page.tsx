"use client";

import { useMemo, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Waves,
  Coffee,
  ShoppingCart,
  Activity,
  Moon,
  Stethoscope,
  MapPin,
  Star,
  Clock,
  Info,
} from "lucide-react";

import { PLACES, ALL_PLACES_MAP_URL, type Place, type PlaceCategory } from "@/app/data/places";

type CategoryFilter = "all" | "food" | "beach" | "grocery" | "nightlife" | "medical" | "pharmacy";
type DistanceFilter = "any" | "0-10" | "10-20" | "20-40" | "40+";

const CATEGORY_FILTERS: { value: CategoryFilter; label: string; icon: typeof Waves }[] = [
  { value: "all", label: "All", icon: Activity },
  { value: "food", label: "Food & Drinks", icon: Coffee },
  { value: "beach", label: "Beaches", icon: Waves },
  { value: "grocery", label: "Groceries", icon: ShoppingCart },
  { value: "nightlife", label: "Nightlife", icon: Moon },
  { value: "medical", label: "Clinics & Hospitals", icon: Stethoscope },
  { value: "pharmacy", label: "Pharmacies", icon: Stethoscope },
];

const DISTANCE_FILTERS: { value: DistanceFilter; label: string }[] = [
  { value: "any", label: "Any distance" },
  { value: "0-10", label: "0 – 10 min" },
  { value: "10-20", label: "10 – 20 min" },
  { value: "20-40", label: "20 – 40 min" },
  { value: "40+", label: "40+ min" },
];

function getDistanceRange(minutes: number): DistanceFilter {
  if (minutes <= 10) return "0-10";
  if (minutes <= 20) return "10-20";
  if (minutes <= 40) return "20-40";
  return "40+";
}

function matchesDistanceFilter(minutes: number, filter: DistanceFilter): boolean {
  if (filter === "any") return true;
  return getDistanceRange(minutes) === filter;
}

// Component: ExploreHero
function ExploreHero({ heroY }: { heroY: any }) {
  return (
    <header className="relative z-10 mx-auto mt-4 w-full max-w-6xl px-4 pb-6">
      <motion.div
        style={{ y: heroY }}
        className="relative h-[220px] overflow-hidden rounded-[2rem] bg-[#F5F9F7] shadow-xl sm:h-[280px]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#134E4A]/20 via-[#4C625E]/10 to-[#DDEEE8]/30" />
        <Image
          src="/media/beach/explore-hero.jpg"
          alt="Beach scene"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 768px) 100vw, 1024px"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 p-6 sm:p-8"
        >
          <div className="mb-2 inline-block rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            From Hacienda Pinilla
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">Explore Nearby</h1>
          <p className="text-sm text-white/90 sm:text-base">
            Beaches, food, sunsets, and essentials within easy reach of our villas.
          </p>
        </motion.div>
      </motion.div>
    </header>
  );
}

// Component: CategoryFilters
function CategoryFilters({
  selectedCategory,
  onCategoryChange,
}: {
  selectedCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
}) {
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleClick = (category: CategoryFilter) => {
    onCategoryChange(category);
    const pill = pillRefs.current[category];
    if (pill) {
      pill.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  };

  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-3">
      <div
        className="flex snap-x snap-mandatory flex-nowrap gap-3 overflow-x-auto pb-2
               [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {CATEGORY_FILTERS.map(({ value, label, icon: Icon }) => {
          const isActive = selectedCategory === value;
          if (!Icon) return null;

          return (
            <motion.button
              key={value}
              ref={(el) => {
                pillRefs.current[value] = el;
              }}
              type="button"
              onClick={() => handleClick(value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border-2 px-4 py-2.5 text-sm font-medium transition
            ${isActive
                  ? "scale-105 border-[#134E4A] bg-gradient-to-r from-[#134E4A] to-[#0F3D2E] text-white shadow-lg"
                  : "border-[#134E4A]/30 bg-white text-[#134E4A] hover:border-[#134E4A]/50 hover:bg-gradient-to-r hover:from-[#F4FBF7] hover:to-[#ECF4EF]"
                }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-[#134E4A]"}`} />
              {label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// Component: DistanceFilterBar
function DistanceFilterBar({
  distanceFilter,
  onDistanceChange,
}: {
  distanceFilter: DistanceFilter;
  onDistanceChange: (filter: DistanceFilter) => void;
}) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-6">
      <div className="flex items-center justify-between gap-3 rounded-2xl border-2 border-[#134E4A]/15 bg-gradient-to-r from-white to-[#F5F9F7] px-4 py-3.5 shadow-sm">
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#4C625E]">Driving time</span>
          <span className="text-xs text-[#5A6664]">From Hacienda Pinilla by car</span>
        </div>
        <div className="relative">
          <select
            value={distanceFilter}
            onChange={(e) => onDistanceChange(e.target.value as DistanceFilter)}
            className="appearance-none rounded-full border-2 border-[#134E4A]/30 bg-white px-4 py-2 pr-8 text-sm font-medium text-[#134E4A] focus:outline-none focus:ring-2 focus:ring-[#134E4A]/20"
          >
            {DISTANCE_FILTERS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#134E4A]">
            ▼
          </span>
        </div>
      </div>
    </div>
  );
}

// Component: CategorySectionHeader
function CategorySectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="mb-8 flex items-start gap-3 rounded-2xl border-l-4 border-l-[#134E4A] bg-gradient-to-r from-[#F4FBF7] to-[#ECF4EF] px-5 py-4 shadow-sm"
    >
      {Icon && <Icon className="h-6 w-6 flex-shrink-0 text-[#134E4A] mt-0.5" />}
      <div>
        <h2 className="text-xl font-semibold text-[#134E4A]">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-[#4C625E]">{description}</p>
      </div>
    </motion.div>
  );
}

// Component: PlaceCard - Stacked rolodex card with active state
function PlaceCard({
  place,
  index,
  isActive,
  position,
}: {
  place: Place;
  index: number;
  isActive: boolean;
  position: number; // -1 = previous, 0 = active, 1 = next
}) {
  const isPrevious = position === -1;
  const isNext = position === 1;

  return (
    <div className="relative w-full">
      <div className="rounded-[2rem] border-2 border-[#134E4A]/10 bg-gradient-to-br from-white to-[#F5F9F7] shadow-md p-5 sm:p-6">
        {/* Top Row: Name and Driving Time */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="flex-1 text-lg font-semibold text-[#1F2A2A] sm:text-xl">
            {place.name}
          </h3>
          <div className="flex shrink-0 items-center gap-1.5 rounded-full border-2 border-[#134E4A]/30 bg-[#F4FBF7] px-3 py-1.5 text-xs font-medium text-[#134E4A]">
            <Clock className="h-3.5 w-3.5" />
            {place.drivingMinutes} min
          </div>
        </div>

        {/* Info Row: Rating and Reviews */}
        {place.rating && (
          <div className="mb-3 flex items-center gap-1.5 text-sm text-[#4C625E]">
            <Star className="h-4 w-4 fill-[#134E4A] text-[#134E4A]" />
            <span className="font-medium">{place.rating}</span>
            {place.numReviews && (
              <span className="text-[#5A6664]">
                · {place.numReviews.toLocaleString()} reviews
              </span>
            )}
          </div>
        )}

        {/* Price Row */}
        {place.priceRange && (
          <div className="mb-3 text-sm text-[#5A6664]">
            <span className="font-medium text-[#1F2A2A]">Price:</span> {place.priceRange}
          </div>
        )}

        {/* Best For */}
        {place.bestFor && (
          <div className="mb-3">
            <p className="text-sm leading-relaxed text-[#1F2A2A]">
              <span className="font-semibold text-[#134E4A]">Best for:</span> {place.bestFor}
            </p>
          </div>
        )}

        {/* Description */}
        {place.description && (
          <p className="mb-3 text-sm leading-[1.7] text-[#5A6664]">
            {place.description}
          </p>
        )}

        {/* Good to Know */}
        {place.goodToKnow && (
          <div className="mb-4 flex items-start gap-2 rounded-xl border border-[#134E4A]/15 bg-gradient-to-r from-[#F4FBF7]/60 to-[#ECF4EF]/40 px-3 py-2.5">
            <Info className="h-4 w-4 shrink-0 mt-0.5 text-[#134E4A]" />
            <p className="text-xs leading-relaxed text-[#5A6664]">
              <span className="font-semibold text-[#134E4A]">Good to know:</span> {place.goodToKnow}
            </p>
          </div>
        )}

        {/* Map Button */}
        <div className="flex justify-end">
          {place.mapUrl ? (
            <a
              href={place.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#134E4A] bg-transparent px-4 py-2 text-sm font-medium text-[#134E4A] hover:bg-[#F4FBF7] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#134E4A]/20"
            >
              <MapPin className="h-4 w-4" />
              Map
            </a>
          ) : (
            <button
              disabled
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#134E4A]/20 bg-transparent px-4 py-2 text-sm font-medium text-[#5A6664] opacity-50 cursor-not-allowed"
            >
              <MapPin className="h-4 w-4" />
              Map
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Component: StackedPlaceDeck - Simple static vertical list
function StackedPlaceDeck({ places }: { places: Place[] }) {
  if (places.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-[#134E4A]/20 bg-gradient-to-r from-[#F4FBF7] to-[#ECF4EF] p-8 text-center shadow-sm">
        <p className="text-[#4C625E]">No places match the current filters. Try adjusting your selections.</p>
      </div>
    );
  }

  return (
    <div className="relative py-8">
      <div className="space-y-4">
        {places.map((place, index) => (
          <PlaceCard
            key={place.id}
            place={place}
            index={index}
            isActive={false}
            position={0}
          />
        ))}
      </div>
    </div>
  );
}

// Component: CategorySection
function CategorySection({
  category,
  label,
  icon,
  description,
  places,
}: {
  category: PlaceCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  places: Place[];
}) {
  if (places.length === 0) return null;

  return (
    <section className="mb-16">
      <CategorySectionHeader icon={icon} title={label} description={description} />
      <StackedPlaceDeck places={places} />
    </section>
  );
}

// Main Component: ExploreNearby
export default function ExploreNearby() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>("any");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax transform for hero - image moves slower than content
  const heroY = useTransform(scrollY, [0, 500], [0, 30]);

  const filteredPlaces = useMemo(() => {
    let filtered = PLACES;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((place) => place.category === selectedCategory);
    }

    // Filter by distance
    filtered = filtered.filter((place) => matchesDistanceFilter(place.drivingMinutes, distanceFilter));

    return filtered;
  }, [selectedCategory, distanceFilter]);

  const placesByCategory = useMemo(() => {
    const grouped: Partial<Record<PlaceCategory, Place[]>> = {};
    filteredPlaces.forEach((place) => {
      if (!grouped[place.category]) grouped[place.category] = [];
      grouped[place.category]!.push(place);
    });
    return grouped;
  }, [filteredPlaces]);

  const sectionsToShow = useMemo(() => {
    const baseSections: {
      category: PlaceCategory;
      label: string;
      icon: typeof Coffee;
      description: string;
    }[] = [
      {
        category: "food",
        label: "Food & Drinks",
        icon: Coffee,
        description: "From local sodas to beachfront dinners.",
      },
      {
        category: "beach",
        label: "Beaches",
        icon: Waves,
        description: "Surf spots, sunset walks, and chill swim days.",
      },
      {
        category: "grocery",
        label: "Groceries",
        icon: ShoppingCart,
        description: "Stock up on essentials and fresh produce.",
      },
      {
        category: "nightlife",
        label: "Nightlife",
        icon: Moon,
        description: "Bars, live music, and late night spots.",
      },
      {
        category: "medical",
        label: "Clinics & Hospitals",
        icon: Stethoscope,
        description: "Where to go if someone needs a doctor.",
      },
      {
        category: "pharmacy",
        label: "Pharmacies",
        icon: Stethoscope,
        description: "Go here for meds, sunscreen, and basics.",
      },
    ];

    if (selectedCategory === "all") {
      return baseSections
        .filter((section) => (placesByCategory[section.category] || []).length > 0)
        .map((section) => ({
          ...section,
          places: placesByCategory[section.category] || [],
        }));
    }

    const match = baseSections.find((section) => section.category === selectedCategory);
    if (!match) return [];

    const places = placesByCategory[selectedCategory] || [];
    return places.length ? [{ ...match, places }] : [];
  }, [selectedCategory, placesByCategory]);

  return (
    <div className="relative min-h-screen bg-[#FFFDF7] text-foreground overflow-hidden">
      {/* Animated Palm Tree Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <motion.div
          animate={{
            x: [0, -200, 0],
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23134E4A' stroke-width='1.5' fill='none'%3E%3Cpath d='M150 0 L130 70 L150 50 L170 70 Z'/%3E%3Cpath d='M150 50 L110 110 L150 90 L190 110 Z'/%3E%3Cpath d='M150 90 L90 170 L150 150 L210 170 Z'/%3E%3Cpath d='M150 150 L70 230 L150 210 L230 230 Z'/%3E%3Cpath d='M150 210 L150 400'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "300px 400px",
          }}
        />
      </div>

      {/* Hero Section */}
      <ExploreHero heroY={heroY} />

      {/* Category Filters */}
      <CategoryFilters selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      {/* Distance Filter Bar */}
      <DistanceFilterBar distanceFilter={distanceFilter} onDistanceChange={setDistanceFilter} />

      {/* Category Sections */}
      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-4">
        {sectionsToShow.length > 0 ? (
          sectionsToShow.map((section) => (
            <CategorySection
              key={section.category}
              category={section.category}
              label={section.label}
              icon={section.icon}
              description={section.description}
              places={section.places}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border-2 border-[#134E4A]/20 bg-gradient-to-r from-[#F4FBF7] to-[#ECF4EF] p-8 text-center shadow-sm"
          >
            <p className="text-[#4C625E]">No places match the current filters. Try adjusting your selections.</p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href={ALL_PLACES_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#134E4A] bg-gradient-to-r from-[#134E4A] to-[#0F3D2E] px-6 py-3 text-sm font-medium text-white transition hover:shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#134E4A]/20"
          >
            <MapPin className="h-4 w-4" />
            Open all locations in Google Maps
          </a>
        </div>
      </main>
    </div>
  );
}
