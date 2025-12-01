"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { CalendarCheck, Car, Sparkles, PartyPopper, Sailboat as Catamaran, Backpack, ChevronDown } from "lucide-react";
import { PalmBackground } from "@/components/PalmBackground";
import type { LucideIcon } from "lucide-react";


interface TravelAccordionItemProps {
  title: string;
  icon: LucideIcon;
  preview: string;
  children: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  iconColor: string;
  isOutfitTheme?: boolean;
  id?: string;
}

function TravelAccordionItem({
  title,
  icon: Icon,
  preview,
  children,
  gradientFrom,
  gradientTo,
  iconColor,
  isOutfitTheme = false,
  id,
}: TravelAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Helper function to determine if a hex color is dark
  const isDarkBackground = (hex: string): boolean => {
    // Remove # if present
    const color = hex.replace('#', '');
    // Convert to RGB
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  };

  // Check if background is dark (use the darker of the two gradient colors)
  const isDark = isDarkBackground(gradientFrom) || isDarkBackground(gradientTo);
  
  // Text colors based on background
  const textColor = isDark ? 'text-white' : 'text-slate-800';
  const textColorMuted = isDark ? 'text-white/90' : 'text-slate-700';
  const textColorLight = isDark ? 'text-white/80' : 'text-slate-600';
  const borderColor = isDark ? 'border-white/20' : 'border-slate-300/30';
  const badgeBg = isDark ? 'bg-white/20' : 'bg-white/40';
  const badgeText = isDark ? 'text-white/90' : 'text-slate-800';
  const badgeBorder = isDark ? 'border-white/30' : 'border-white/50';

  // Open accordion if hash matches
  useEffect(() => {
    if (id && window.location.hash === `#${id}`) {
      setIsOpen(true);
      // Scroll to element after a brief delay to ensure it's rendered
      setTimeout(() => {
        if (ref.current) {
          ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  }, [id]);

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-3xl border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-filter backdrop-blur-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:-translate-y-[3px] transition-all duration-300 ease-out"
      style={{
        background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      {/* Subtle brightness on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-5 sm:px-6 sm:py-6 flex items-center justify-between gap-4 text-left relative z-10"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Icon with glass morphism */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ y: -2, rotate: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl p-3 shadow-lg bg-white/15 backdrop-blur-sm border border-white/20">
              <Icon className="h-6 w-6" strokeWidth={2} style={{ color: iconColor }} />
            </div>
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`text-lg sm:text-xl font-bold ${textColor} leading-tight drop-shadow-sm`}>
                {title}
              </h3>
              {isOutfitTheme && (
                <span className={`px-2 py-0.5 text-[10px] font-bold ${badgeText} ${badgeBg} rounded-full border ${badgeBorder} uppercase tracking-wide drop-shadow-sm`}>
                  Outfit Theme
                </span>
              )}
            </div>
            <p className={`text-sm ${textColorMuted} leading-relaxed font-medium drop-shadow-sm`}>
              {preview}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`flex-shrink-0 h-5 w-5 ${textColorMuted} transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 relative z-10">
              <div className={`pt-4 border-t ${borderColor}`}>
                <div className={`text-base leading-relaxed space-y-3 font-medium ${isDark ? 'text-white [&_h4]:text-white [&_p]:text-white/90 [&_li]:text-white/90 [&_.text-slate-800]:text-white/90 [&_.text-slate-700]:text-white/90' : 'text-slate-800 [&_h4]:text-slate-800 [&_p]:text-slate-700 [&_li]:text-slate-700 [&_.text-slate-800]:text-slate-800 [&_.text-slate-700]:text-slate-700'}`}>
                  {children}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TravelPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative flex min-h-[50vh] w-full items-center justify-center overflow-hidden"
      >
        {/* Background with palm texture */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/drbh1hki1/image/upload/v1764280464/palm-background_pkve1s.png')",
            backgroundColor: "#0E3D2F",
          }}
        >
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/60" />
        </div>

        {/* Palm background decoration */}
        <PalmBackground className="opacity-20" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-center px-4 text-center text-white py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center max-w-2xl"
          >
            {/* Main Title */}
            <h1 className="mb-6 font-display text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-md leading-tight">
              Travel & Arrival
            </h1>

            {/* Description */}
            <p className="mb-4 text-base sm:text-lg text-white/90 drop-shadow-md leading-relaxed max-w-xl">
              Closest airport is Liberia LIR, about one hour to the villa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="space-y-6">
          {/* Accordion Item 1: Arrival Groups (Feb 13) */}
          <TravelAccordionItem
            title="Arrival Groups (Feb 13)"
            icon={CalendarCheck}
            preview="Two arrival groups, we'll coordinate pickups accordingly."
            gradientFrom="#0E3D2F"
            gradientTo="#1C5A47"
            iconColor="#10B981"
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Group 1 – 2:30 PM</h4>
                <p>
                  Most people arrive in this group.
                </p>
                <p>
                  You&apos;ll be grouped into rental cars with a designated driver.
                </p>
                <p>
                  Full instructions will be shared in January.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Group 2 – 4:30 PM</h4>
                <p>
                  A separate rental car group will be arranged for this arrival time.
                </p>
              </div>
              <p className="pt-2 border-t" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(148, 163, 184, 0.3)' }}>
                If plans change, let us know so we can update transport
              </p>
            </div>
          </TravelAccordionItem>

          {/* Accordion Item 2: Transport to the Villa */}
          <TravelAccordionItem
            title="Transport to the Villa"
            icon={Car}
            preview="We&apos;re finalizing between rentals and group shuttles."
            gradientFrom="#145A47"
            gradientTo="#0E3D2F"
            iconColor="#1C736A"
          >
            <div className="space-y-3">
              <p>
                We&apos;re finalizing between rental cars and coordinated shuttles. Either way, transport will be fully arranged for both arrival groups before landing.
              </p>
              <p>
                If your arrival time changes, please update us — it affects how we organize pickups.
              </p>
            </div>
          </TravelAccordionItem>

          {/* Section Divider for Outfit Themes */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Outfit Themes
              </span>
            </div>
          </div>

          {/* Accordion Item 3: Arrival Night */}
          <TravelAccordionItem
            title="Arrival Night"
            icon={Sparkles}
            preview="All-white welcome party on Feb 13."
            gradientFrom="#F5E6D3"
            gradientTo="#E8D5B7"
            iconColor="#8B6F47"
            isOutfitTheme={true}
          >
            <p>
              Our first night is a relaxed, fun all-white theme. Think bright, breezy, coastal-white outfits. Anything comfortable but cute works.
            </p>
          </TravelAccordionItem>

          {/* Accordion Item 4: Puerto de Sal Beach Club */}
          <TravelAccordionItem
            id="puerto-de-sal-outfit"
            title="Puerto de Sal Beach Club"
            icon={PartyPopper}
            preview="Light, dreamy, coastal romantic. Ultra flattering."
            gradientFrom="#FCE7F3"
            gradientTo="#FBCFE8"
            iconColor="#C2185B"
            isOutfitTheme={true}
          >
            <ul className="list-disc list-inside space-y-2">
              <li>Ladies think baby pink, peach, lavender, soft yellow, champagne, pastel coral.</li>
              <li>Men think creams, linen, pale pinks, peach, light grey or pastel yellows.</li>
              <li>Bring some cash for tips, shops, random snacks etc.</li>
            </ul>
          </TravelAccordionItem>

          {/* Accordion Item 5: Catamaran Party */}
          <TravelAccordionItem
            id="catamaran-outfit"
            title="Catamaran Party"
            icon={Catamaran}
            preview="Warm, romantic sunset palette."
            gradientFrom="#D4C4E0"
            gradientTo="#C5A8D6"
            iconColor="#8B6B9F"
            isOutfitTheme={true}
          >
            <div className="space-y-3">
              <p>
                This is our biggest party day, so we&apos;re running a sunset theme.
              </p>
              <p>
                Think colours you see in a Tamarindo sunset: terracotta, deep plums, dusty reds, burnt orange, reddish/marroons, warm sunset.
              </p>
              <p>
                Swimwear or beach-party outfits in this palette will look great.
              </p>
            </div>
          </TravelAccordionItem>

          {/* Accordion Item 6: Packing List (Coming Soon) */}
          <TravelAccordionItem
            title="Packing List"
            icon={Backpack}
            preview="Full packing guide coming in January."
            gradientFrom="#3B82F6"
            gradientTo="#2563EB"
            iconColor="#93C5FD"
          >
            <ul className="list-disc list-inside space-y-2">
              <li>A full packing list is coming soon with basics for the villa, adventure days, and beach days. Themed-night details are already on this page so you can plan outfits early.</li>
              <li>We&apos;ll share it in January as activities and details finalize, but this itinerary should give you a solid head start.</li>
            </ul>
          </TravelAccordionItem>
        </div>
      </section>
    </main>
  );
}
