"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, MessageCircle, Waves, Flame, Home, Leaf, Dumbbell, Shield, ChevronLeft, ChevronRight, X, Cigarette, Snowflake, Trash2, UtensilsCrossed, Sparkles, MapPin, Car, Gift } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { videoConfig } from "@/lib/videoConfig";

const HIGHLIGHTS = [
  {
    text: "3 Pools + Cold Plunge + Sauna",
    icon: Waves,
  },
  {
    text: "Outdoor Kitchen + BBQ + Fire Pit",
    icon: Flame,
  },
  {
    text: "Full Kitchens + Living Areas",
    icon: Home,
  },
  {
    text: "Open-Air Rancho for Yoga",
    icon: Leaf,
  },
  {
    text: "70-Foot Lap Pool + Gym at the near by club",
    icon: Dumbbell,
  },
  {
    text: "Gated Community + Housekeeping",
    icon: Shield,
  },
] as const;

const VILLA_DETAILS = [
  {
    id: "14",
    name: "Villa 14",
    sleeps: 12,
    beds: 5,
    baths: 6,
    image: "/media/villas/villa 14.avif",
  },
  {
    id: "15",
    name: "Villa 15",
    sleeps: 14,
    beds: 6,
    baths: 8,
    image: "/media/villas/villa 15.avif",
  },
  {
    id: "16",
    name: "Villa 16",
    sleeps: 14,
    beds: 6,
    baths: 7,
    image: "/media/villas/villa 16.avif",
  },
] as const;

const HOUSE_RULES = [
  {
    title: "Smoking Policy",
    content: "No smoking or vaping indoors. Evidence of smoking incurs a $500 fee. Outdoor smoking only.",
    icon: Cigarette,
  },
  {
    title: "Air Conditioning & Electricity",
    content: "Set A/C around 72°F / 22°C. Keep doors and windows closed while it's running, and turn it off when you leave the room. The villa charges a $50 USD fee any time A/C is found running with doors open or when no one is in the room.",
    icon: Snowflake,
  },
  {
    title: "Garbage & Pickup",
    content: "Trash collection Mon, Wed, Fri mornings. Bins by the garage. Close lids at night.",
    icon: Trash2,
  },
] as const;

const SERVICES = [
  {
    text: "Cocktail and snack service until 2 PM (we provide the groceries)",
    icon: Sparkles,
  },
  {
    text: "Daily housekeeping and laundry",
    icon: Home,
  },
  {
    text: "Concierge for transport, tours, and spa",
    icon: MessageCircle,
  },
  {
    text: "Five Rental cars onsite",
    icon: Car,
  },
  {
    text: "Adventure add ons",
    icon: Gift,
  },
] as const;

export default function Stay() {
  const [expandedRules, setExpandedRules] = useState<Record<string, boolean>>({});
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const houseRulesRef = useRef<HTMLDivElement>(null);
  const outdoorLivingRef = useRef<HTMLDivElement>(null);
  const wellnessRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const arrivalRef = useRef<HTMLDivElement>(null);
  const howStayWorksRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(highlightsRef, { once: true, margin: "-100px" });
  const howStayWorksInView = useInView(howStayWorksRef, { once: true, margin: "-100px" });
  const houseRulesInView = useInView(houseRulesRef, { once: true, margin: "-50px" });
  const outdoorLivingInView = useInView(outdoorLivingRef, { once: true, margin: "-50px" });
  const wellnessInView = useInView(wellnessRef, { once: true, margin: "-50px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-50px" });
  const arrivalInView = useInView(arrivalRef, { once: true, margin: "-50px" });

  const OUTDOOR_LIVING_BULLETS = [
    "Three pools, jacuzzi, cold plunge, sauna",
    "Shaded rancho for yoga or dinner",
    "Fire pit, BBQ, loungers for late nights",
  ] as const;

  const WELLNESS_BULLETS = [
    "70-foot lap pool and shallow area",
    "Private fitness studio access",
    "Minutes from beach club, golf course, and coastal trails",
  ] as const;

  // Image carousel - using actual AVIF files from /public/media/villas/
  const stayImages = [
    "/media/villas/1.avif",
    "/media/villas/2.avif",
    "/media/villas/3.avif",
    "/media/villas/4.avif",
    "/media/villas/5.avif",
    "/media/villas/6.avif",
    "/media/villas/7.avif",
    "/media/villas/8.avif",
    "/media/villas/10.avif",
    "/media/villas/12.jpeg",
    "/media/villas/13.avif",
    "/media/villas/14.avif",
    "/media/villas/15.avif",
  ].map((path, i) => ({
    src: path,
    alt: `Villa preview ${i + 1}`,
  }));

  const goToNextImage = () => {
    setCarouselIndex((prev) => (prev + 1) % stayImages.length);
    setLightboxIndex((prev) => (prev + 1) % stayImages.length);
  };

  const goToPreviousImage = () => {
    setCarouselIndex((prev) => (prev - 1 + stayImages.length) % stayImages.length);
    setLightboxIndex((prev) => (prev - 1 + stayImages.length) % stayImages.length);
  };

  const openLightbox = (index: number) => {
    setScrollPosition(window.scrollY);
    setLightboxIndex(index);
    setCarouselIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // Restore scroll position after a brief delay
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 100);
  };

  const handleCarouselInteraction = () => {
    setIsAutoplayPaused(true);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoplayPaused(false), 10000);
  };

  // Autoplay carousel (paused when user interacts)
  useEffect(() => {
    if (stayImages.length <= 1 || isAutoplayPaused || lightboxOpen) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % stayImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [stayImages.length, isAutoplayPaused, lightboxOpen]);

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        goToPreviousImage();
      } else if (e.key === "ArrowRight") {
        goToNextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, lightboxIndex, stayImages.length]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  // Touch/swipe support for mobile carousel
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      goToNextImage();
      handleCarouselInteraction();
    }
    if (isRightSwipe) {
      goToPreviousImage();
      handleCarouselInteraction();
    }
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-14 sm:py-20 min-h-[60vh]">
        {/* Background image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/drbh1hki1/image/upload/v1764280464/palm-background_pkve1s.png')",
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-[1] bg-black/40" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Text block */}
          <div className="space-y-4 text-[#F7F3EA]">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#D5E6DD]">
              Our Costa Stay
            </p>

            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
              Where we&apos;re staying
            </h1>

            <p className="text-sm sm:text-base md:text-lg max-w-2xl text-[#ECF2EE]">
              Three villas side by side, one big home base. A spot to chill, link up, turn up, recover, and repeat.
            </p>
          </div>

          {/* Video card */}
          <div className="w-full rounded-3xl overflow-hidden shadow-[0_22px_60px_rgba(0,0,0,0.45)] bg-[#021712]">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/P4GQP5FozYo?rel=0&modestbranding=1&playsinline=1&autoplay=1&mute=1&controls=1"
                title="Our Costa2K26 Stay"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTAs Section */}
      <section className="bg-[#FAF8F2] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button as={Link} href="/rooms" variant="primary" size="lg" className="shadow-hover w-full max-w-xs sm:w-auto">
                Find Your Room
              </Button>
              <Button
                as="a"
                href="https://maps.google.com/?q=Diamante+del+Bosque+Bosques+de+Pinilla"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="w-full max-w-xs sm:w-auto"
              >
                Get Directions
              </Button>
            </div>
            {/* Scroll guidance - centered */}
            <p className="text-center text-sm text-muted">
              Keep scrolling for photos, room layouts, and villa details.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Highlights Grid */}
      <section className="border-b border-border bg-background pb-12 pt-8 sm:pb-16 sm:pt-12">
        <div className="container-wrap" ref={highlightsRef}>
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {HIGHLIGHTS.map((highlight) => {
              const IconComponent = highlight.icon;
              return (
                <motion.div
                  key={highlight.text}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                >
                  <Card className="flex items-center gap-4 p-4 shadow-card transition-all duration-200 hover:scale-[1.02] hover:shadow-hover sm:p-5">
                    <div className="flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
                    </div>
                    <span className="text-xs font-medium text-foreground sm:text-sm md:text-base">
                      {highlight.text}
                    </span>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* About the Stay */}
      <section className="border-b border-border bg-background pt-12 pb-16">
        <div className="container-wrap">
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-foreground sm:text-xl">
            Three pools, open terraces, and a rancho built for core memories and chaos. Core memories coming right up, with everyone we love in one ridiculously beautiful spot.
          </p>
          <div className="mt-10 overflow-hidden rounded-2xl border border-border shadow-hover">
            <div
              ref={carouselRef}
              className="relative aspect-[16/9] w-full"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {stayImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    idx === carouselIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => openLightbox(idx)}
                    className="h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    aria-label={`View ${img.alt} in fullscreen`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </button>
                </div>
              ))}
              
              {/* Left/Right Arrow Controls (desktop) */}
              <div className="absolute inset-y-0 left-0 flex items-center px-4 sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    goToPreviousImage();
                    handleCarouselInteraction();
                  }}
                  className="hidden rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:block"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    goToNextImage();
                    handleCarouselInteraction();
                  }}
                  className="hidden rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:block"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Dots Navigation */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {stayImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCarouselIndex(idx);
                      handleCarouselInteraction();
                    }}
                    className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      idx === carouselIndex ? "w-8 bg-white" : "w-2 bg-white/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-6 sm:top-6"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Lightbox Image Container */}
          <div
            className="relative h-full w-full max-h-[90vh] max-w-7xl"
            onClick={(e) => e.stopPropagation()}
          >
            {stayImages.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  idx === lightboxIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1920}
                  height={1080}
                  className="max-h-full max-w-full object-contain"
                  priority
                />
              </div>
            ))}

            {/* Lightbox Navigation Arrows */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPreviousImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-all hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:left-6"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToNextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-all hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-6"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Lightbox Dots */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {stayImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(idx);
                    setCarouselIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    idx === lightboxIndex ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sleeping Arrangements */}
      <section className="border-b border-border bg-background pt-12 pb-16">
        <div className="container-wrap">
          <div className="mb-8 text-center">
            <h2 className="font-sans text-2xl font-semibold text-foreground sm:text-3xl">Sleeping Arrangements</h2>
            <p className="mt-2 text-sm text-muted sm:text-base">
              Everyone gets their own space with ensuite comfort across three villas.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-5">
            {VILLA_DETAILS.map((villa) => (
              <Card key={villa.id} className="overflow-hidden shadow-card transition-all hover:shadow-hover">
                <Link
                  href="/rooms"
                  className="flex flex-col sm:flex-row"
                >
                  {/* Villa Thumbnail */}
                  <div className="relative h-48 w-full flex-shrink-0 sm:h-32 sm:w-48">
                    <Image
                      src={villa.image}
                      alt={villa.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 192px"
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Villa Info */}
                  <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                    <div>
                      <h3 className="mb-2 font-sans text-lg font-semibold text-foreground sm:text-xl">
                        {villa.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-background-subtle px-3 py-1 text-xs font-medium text-foreground">
                          {villa.sleeps} guests
                        </span>
                        <span className="rounded-full bg-background-subtle px-3 py-1 text-xs font-medium text-foreground">
                          {villa.beds} beds
                        </span>
                        <span className="rounded-full bg-background-subtle px-3 py-1 text-xs font-medium text-foreground">
                          {villa.baths} baths
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground sm:text-sm">
                      View room assignments →
                    </p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground sm:text-sm">
            Check the <Link href="/rooms" className="font-semibold text-foreground underline">Rooms page</Link> for full details on who&apos;s where.
          </p>
        </div>
      </section>

      {/* How Your Stay Works - Unified Section */}
      <section ref={howStayWorksRef} className="border-b border-border bg-background-subtle py-16 sm:py-20">
        <div className="container-wrap">
          <motion.div
            initial="hidden"
            animate={howStayWorksInView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {/* Main Section Title */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="mb-12 text-center sm:mb-16"
            >
              <h2 className="font-sans text-3xl font-semibold text-foreground sm:text-4xl">How Your Stay Works</h2>
            </motion.div>

            {/* Wrapper Card with subtle background and rounded corners on desktop */}
            <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-lg sm:rounded-3xl sm:shadow-xl">
              <div className="space-y-6 p-6 sm:space-y-8 sm:p-8 lg:space-y-10 lg:p-10">
                {/* House Rules */}
                <div ref={houseRulesRef}>
                  <motion.div
                    initial="hidden"
                    animate={houseRulesInView ? "visible" : "hidden"}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.08,
                        },
                      },
                    }}
                  >
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                        },
                      }}
                      className="mb-4 text-center"
                    >
                      <h3 className="mb-2 font-sans text-xl font-semibold text-foreground sm:text-2xl">House Rules</h3>
                      <p className="text-xs text-muted-foreground sm:text-sm">Quick rules so we avoid surprise fees</p>
                    </motion.div>
                    <div className="mx-auto max-w-2xl space-y-2 rounded-lg border border-border bg-background-subtle p-4 sm:space-y-3 sm:p-5">
                      {HOUSE_RULES.map((rule, idx) => {
                        const key = `rule-${rule.title}`;
                        const expanded = expandedRules[key] ?? false;
                        const IconComponent = rule.icon;
                        return (
                          <motion.div
                            key={key}
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 + idx * 0.05 },
                              },
                            }}
                          >
                            <Card className="overflow-hidden shadow-sm transition-all hover:shadow-md">
                              <button
                                type="button"
                                className="flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left transition hover:bg-background-subtle focus-visible:ring-2 focus-visible:ring-accent sm:px-5 sm:py-3"
                                onClick={() => setExpandedRules((prev) => ({ ...prev, [key]: !expanded }))}
                                aria-expanded={expanded}
                              >
                                <div className="flex items-center gap-3">
                                  <IconComponent className="h-4 w-4 flex-shrink-0 text-primary sm:h-5 sm:w-5" />
                                  <h4 className="font-sans text-sm font-semibold text-foreground sm:text-base">
                                    {rule.title}
                                  </h4>
                                </div>
                                <ChevronDown
                                  className={`h-4 w-4 flex-shrink-0 text-muted transition-transform ${
                                    expanded ? "rotate-180" : ""
                                  }`}
                                  aria-hidden
                                />
                              </button>
                              {expanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="border-t border-border px-4 pb-3 pt-2.5 sm:px-5 sm:pb-4 sm:pt-3"
                                >
                                  <p className="text-xs leading-relaxed text-muted sm:text-sm">{rule.content}</p>
                                </motion.div>
                              )}
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>

                {/* Outdoor Living */}
                <div ref={outdoorLivingRef}>
                  <motion.div
                    initial="hidden"
                    animate={outdoorLivingInView ? "visible" : "hidden"}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.08,
                        },
                      },
                    }}
                  >
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                        },
                      }}
                      className="mb-4 text-center"
                    >
                      <div className="mb-3 flex justify-center gap-3">
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.05 },
                            },
                          }}
                        >
                          <Waves className="h-5 w-5 text-primary" />
                        </motion.div>
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.08 },
                            },
                          }}
                        >
                          <Flame className="h-5 w-5 text-primary" />
                        </motion.div>
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.11 },
                            },
                          }}
                        >
                          <Leaf className="h-5 w-5 text-primary" />
                        </motion.div>
                      </div>
                      <h3 className="font-sans text-xl font-semibold text-foreground sm:text-2xl">Outdoor Living</h3>
                    </motion.div>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
                        },
                      }}
                      className="mx-auto max-w-2xl"
                    >
                      <ul className="space-y-2 text-center">
                        {OUTDOOR_LIVING_BULLETS.map((bullet, idx) => (
                          <motion.li
                            key={idx}
                            variants={{
                              hidden: { opacity: 0, y: 15 },
                              visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.13 + idx * 0.04 },
                              },
                            }}
                            className="text-sm leading-relaxed text-muted sm:text-base"
                          >
                            {bullet}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Panoramic Image Strip */}
                <motion.div
                  initial="hidden"
                  animate={outdoorLivingInView ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 },
                    },
                  }}
                  className="overflow-hidden rounded-xl shadow-hover"
                >
                  <div className="relative aspect-[3/1] w-full">
                    <Image
                      src="/media/villas/villa 15.avif"
                      alt="Villa exterior"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                      className="object-cover object-center"
                    />
                  </div>
                </motion.div>

                {/* Wellness & Recreation */}
                <div ref={wellnessRef}>
                  <motion.div
                    initial="hidden"
                    animate={wellnessInView ? "visible" : "hidden"}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.08,
                        },
                      },
                    }}
                  >
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                        },
                      }}
                      className="mb-4 text-center"
                    >
                      <div className="mb-3 flex justify-center gap-3">
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.05 },
                            },
                          }}
                        >
                          <Dumbbell className="h-5 w-5 text-primary" />
                        </motion.div>
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.08 },
                            },
                          }}
                        >
                          <Waves className="h-5 w-5 text-primary" />
                        </motion.div>
                      </div>
                      <h3 className="font-sans text-xl font-semibold text-foreground sm:text-2xl">
                        Wellness & Recreation
                      </h3>
                    </motion.div>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
                        },
                      }}
                      className="mx-auto max-w-2xl"
                    >
                      <ul className="space-y-2 text-center">
                        {WELLNESS_BULLETS.map((bullet, idx) => (
                          <motion.li
                            key={idx}
                            variants={{
                              hidden: { opacity: 0, y: 15 },
                              visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.13 + idx * 0.04 },
                              },
                            }}
                            className="text-sm leading-relaxed text-muted sm:text-base"
                          >
                            {bullet}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Services */}
                <div ref={servicesRef}>
                  <motion.div
                    initial="hidden"
                    animate={servicesInView ? "visible" : "hidden"}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.06,
                        },
                      },
                    }}
                  >
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                        },
                      }}
                      className="mb-4 text-center"
                    >
                      <h3 className="font-sans text-xl font-semibold text-foreground sm:text-2xl">Services</h3>
                    </motion.div>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
                        },
                      }}
                      className="mx-auto max-w-2xl"
                    >
                      <ul className="space-y-2.5 text-left">
                        {SERVICES.map((service, idx) => {
                          const IconComponent = service.icon;
                          return (
                            <motion.li
                              key={idx}
                              variants={{
                                hidden: { opacity: 0, y: 15 },
                                visible: {
                                  opacity: 1,
                                  y: 0,
                                  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.12 + idx * 0.04 },
                                },
                              }}
                              className="flex items-center gap-3"
                            >
                              <IconComponent className="h-5 w-5 flex-shrink-0 text-primary" />
                              <span className="text-sm leading-relaxed text-muted sm:text-base">
                                {idx === 3 ? (
                                  <>
                                    <span className="font-semibold text-foreground">Five Rental cars onsite</span> Available for small group outings. Let us know before taking one. Try to roll in groups of five so everyone can get around easily.
                                  </>
                                ) : idx === 4 ? (
                                  <>
                                    <span className="font-semibold text-foreground">Adventure add ons</span> Short excursions and pricing are linked in the itinerary. Fill out the interest sheet if you want in.
                                  </>
                                ) : (
                                  service.text
                                )}
                              </span>
                            </motion.li>
                          );
                        })}
                      </ul>
                      <motion.p
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.25 },
                          },
                        }}
                        className="mt-4 text-center text-xs text-muted-foreground sm:text-sm"
                      >
                        The concierge will confirm timing and details when we check in.
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Arrival & Directions */}
                <div ref={arrivalRef}>
                  <motion.div
                    initial="hidden"
                    animate={arrivalInView ? "visible" : "hidden"}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.06,
                        },
                      },
                    }}
                  >
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                        },
                      }}
                      className="mb-4 text-center"
                    >
                      <div className="mb-3 flex justify-center gap-3">
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.05 },
                            },
                          }}
                        >
                          <MapPin className="h-5 w-5 text-primary" />
                        </motion.div>
                      </div>
                      <h3 className="font-sans text-xl font-semibold text-foreground sm:text-2xl">
                        Arrival & Directions
                      </h3>
                    </motion.div>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
                        },
                      }}
                      className="mx-auto max-w-2xl"
                    >
                      <p className="mb-6 text-center text-sm leading-relaxed text-muted sm:text-base">
                        Diamante del Bosque is inside Bosques de Pinilla. Follow the map pin to the entrance, drive
                        straight to the last roundabout. Our villas (14, 15, and 16) are the second, third, and fourth
                        homes on the right.
                      </p>
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.18 },
                          },
                        }}
                        className="flex flex-col items-center gap-3"
                      >
                        <Button
                          as="a"
                          href="https://maps.app.goo.gl/VHFngx2VcZpBWymr9"
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="primary"
                          size="lg"
                          className="shadow-hover"
                        >
                          Open in Google Maps
                        </Button>
                        <p className="text-center text-xs text-muted-foreground sm:text-sm">
                          Tip: Screenshot the pin before your flight in case you lose signal.
                        </p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="bg-background-subtle py-8">
        <div className="container-wrap">
          <Card className="border border-border bg-surface px-6 py-4 text-center shadow-card">
            <p className="text-sm text-muted">
              Looking for your room or Wi-Fi? Check the{" "}
              <Link href="/rooms" className="font-semibold text-foreground underline">
                Rooms page
              </Link>{" "}
              for assignments and codes.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}