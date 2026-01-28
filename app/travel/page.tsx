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
  // For outfit theme cards, use softer, warmer tones that complement pastel backgrounds
  const textColor = isDark ? 'text-white' : (isOutfitTheme ? 'text-slate-700' : 'text-slate-800');
  const textColorMuted = isDark ? 'text-white/90' : (isOutfitTheme ? 'text-slate-600' : 'text-slate-700');
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
            preview="Shuttles from the airport to Tamarindo have been arranged."
            gradientFrom="#0E3D2F"
            gradientTo="#1C5A47"
            iconColor="#10B981"
          >
            <div className="space-y-4">
              <p>
                Shuttles from the airport to Tamarindo have been arranged, so all you have to do is buy your bottles at Duty Free and let us magically transport you to our villas.
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
            preview="All-white welcome party."
            gradientFrom="#F5E6D3"
            gradientTo="#E8D5B7"
            iconColor="#8B6F47"
            isOutfitTheme={true}
          >
            <p>
              Our first night is a relaxed, fun all-white theme. Think bright, breezy, coastal-white outfits. Anything comfortable but cute works.
            </p>
          </TravelAccordionItem>

          {/* Accordion Item 4: Bar Crawl Night */}
          <TravelAccordionItem
            id="puerto-de-sal-outfit"
            title="Bar Crawl Night"
            icon={PartyPopper}
            preview="Light, dreamy, coastal romantic."
            gradientFrom="#FCE7F3"
            gradientTo="#FBCFE8"
            iconColor="#C2185B"
            isOutfitTheme={true}
          >
            <ul className="list-disc list-inside space-y-2">
              <li>Ladies think baby pink, peach, lavender, soft yellow, champagne, pastel coral.</li>
              <li>Men think creams, linen, pale pinks, peach or pastel yellows.</li>
              <li>Bring some cash for tips, shops, random snacks etc.</li>
            </ul>
          </TravelAccordionItem>

          {/* Accordion Item 5: Catamaran Party */}
          <TravelAccordionItem
            id="catamaran-outfit"
            title="Catamaran Party"
            icon={Catamaran}
            preview="Warm coastal tones."
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
                Think colours you see in a sunset: terracotta, deep plums, dusty reds, burnt orange, warm maroons.
              </p>
              <p>
                Swimwear or beach-party outfits.
              </p>
            </div>
          </TravelAccordionItem>

          {/* Section Divider for Activity Updates */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Activity Updates
              </span>
            </div>
          </div>

          {/* Accordion Item 6: Feb 15 Update */}
          <TravelAccordionItem
            title="Feb 15 Update"
            icon={CalendarCheck}
            preview="Waterfall Hike and Tubing - How to prepare."
            gradientFrom="#4AA7A4"
            gradientTo="#3A8B88"
            iconColor="#7DD3FC"
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Pickup Time</h4>
                <p>
                  <strong>8:45AM pickup at the villa</strong>
                </p>
                <p className="mt-2">
                  Please do not be late as the bus will need to leave at 8:45AM at the latest! Please meet at villa 15 ready to leave and make sure to check below on how to prepare and what to bring.
                </p>
              </div>
              <div className="pt-3 border-t border-inherit opacity-70">
                <h4 className="font-semibold mb-3">What to Bring:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Important for women:</strong> Wear bathing suit under your clothes only and make sure to bring clothes that tighten, there is a current during the hike that could potentially pull your clothes down if they are not tight enough.</li>
                  <li>Closed toe shoes, water shoes or sandals with straps <strong>(NO FLIP FLOPS)</strong></li>
                  <li>Keens or chacos are okay to wear</li>
                  <li>Shoes with a good grip</li>
                  <li>Extra clothes to change</li>
                  <li>Extra shoes to change</li>
                  <li>Sunscreen</li>
                  <li>Small bottle of water</li>
                  <li>Towels</li>
                  <li>We provide a dry bag to take your cellphone and water to the tour</li>
                </ul>
              </div>
            </div>
          </TravelAccordionItem>

          {/* Accordion Item 7: Feb 16 Update */}
          <TravelAccordionItem
            title="Feb 16 Update"
            icon={CalendarCheck}
            preview="Tamarindo Activities - Departure times and cash payments."
            gradientFrom="#3A784F"
            gradientTo="#2D5F3F"
            iconColor="#A7C4A0"
          >
            <div className="space-y-4" style={{ color: 'inherit' }}>
              <div style={{ color: 'white' }}>
                <h4 className="font-semibold mb-2" style={{ color: 'white' }}>Departure Times</h4>
                <p style={{ color: 'white' }}>
                  Girls doing horseback riding will need to be ready to leave at the latest by <strong style={{ color: 'white' }}>8:20AM</strong>.
                </p>
                <p style={{ color: 'white' }}>
                  Everyone else will leave the villa at <strong style={{ color: 'white' }}>9:00AM</strong> headed towards Tamarindo.
                </p>
                <p className="mt-2" style={{ color: 'white' }}>
                  Once there, feel free to chill, grab food or drinks prior to your activities.
                </p>
              </div>
              
              <div className="pt-4 border-t border-white/30">
                <h4 className="font-bold text-lg mb-4" style={{ color: 'white' }}>Cash Payments Required</h4>
                <div className="space-y-4 p-5 rounded-xl bg-white border-2 border-red-300 shadow-lg" style={{ color: '#1F2937', backgroundColor: '#FFFFFF' }}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚠️</span>
                    <p className="font-bold text-lg leading-tight" style={{ color: '#991B1B', fontWeight: '700' }}>
                      IMPORTANT: Each activity requires cash payment!
                    </p>
                  </div>
                  <ul className="list-none space-y-2.5 ml-1">
                    <li className="flex items-start gap-2">
                      <span className="font-bold min-w-[100px]" style={{ color: '#991B1B', fontWeight: '700' }}>ATV:</span>
                      <span style={{ color: '#991B1B' }}>$75 cash to pay tour</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold min-w-[100px]" style={{ color: '#991B1B', fontWeight: '700' }}>Kayak:</span>
                      <span style={{ color: '#991B1B' }}>$50 cash to pay tour</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold min-w-[100px]" style={{ color: '#991B1B', fontWeight: '700' }}>Surf Lessons:</span>
                      <span style={{ color: '#991B1B' }}>$55 cash to pay instructor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold min-w-[100px]" style={{ color: '#991B1B', fontWeight: '700' }}>Horseback:</span>
                      <span style={{ color: '#991B1B' }}>Cash for tipping (tour cost already covered)</span>
                    </li>
                  </ul>
                  <p className="mt-4 pt-3 border-t border-red-300 font-semibold text-base leading-relaxed" style={{ color: '#991B1B', fontWeight: '600' }}>
                    Each activity has particular needs and we&apos;re paying cash for the best prices, so be mindful of that and bring enough cash!
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/30">
                <h4 className="font-bold text-lg mb-4" style={{ color: 'white' }}>Activity Details & What to Bring</h4>
                
                <div className="space-y-4">
                  <div className="p-5 rounded-xl border-2 border-slate-300 shadow-lg" style={{ color: '#1F2937', backgroundColor: '#FFFFFF' }}>
                    <h5 className="font-bold text-lg mb-3" style={{ color: '#111827', fontWeight: '700' }}>ATV Tour</h5>
                    <div className="space-y-2 mb-4">
                      <p className="text-base" style={{ color: '#1F2937' }}><strong style={{ color: '#111827', fontWeight: '700' }}>Meet:</strong> <span style={{ color: '#374151' }}>Club 33 Surf Shop @ 10:45AM</span></p>
                      <p className="text-base" style={{ color: '#1F2937' }}><strong style={{ color: '#111827', fontWeight: '700' }}>Cash needed:</strong> <span className="font-bold" style={{ color: '#B91C1C', fontWeight: '700' }}>$75</span></p>
                    </div>
                    <p className="font-semibold mb-2" style={{ color: '#111827', fontWeight: '600' }}>What to bring:</p>
                    <ul className="list-disc list-inside space-y-1.5 text-sm ml-2" style={{ color: '#374151' }}>
                      <li style={{ color: '#374151' }}>Comfortable clothes for ATVs (Bathing suit if you want to swim at the beaches)</li>
                      <li style={{ color: '#374151' }}>Tennis Shoes</li>
                      <li style={{ color: '#374151' }}>Sunblock</li>
                      <li style={{ color: '#374151' }}>Sunglasses</li>
                      <li style={{ color: '#374151' }}>Camera</li>
                      <li style={{ color: '#374151' }}>Cash for tipping</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl border-2 border-slate-300 shadow-lg" style={{ color: '#1F2937', backgroundColor: '#FFFFFF' }}>
                    <h5 className="font-bold text-lg mb-3" style={{ color: '#111827', fontWeight: '700' }}>Kayak Tour</h5>
                    <div className="space-y-2 mb-4">
                      <p className="text-base" style={{ color: '#1F2937' }}><strong style={{ color: '#111827', fontWeight: '700' }}>Meet:</strong> <span style={{ color: '#374151' }}>Pangas restaurant @ 9:45 AM</span></p>
                      <p className="text-base" style={{ color: '#1F2937' }}><strong style={{ color: '#111827', fontWeight: '700' }}>Cash needed:</strong> <span className="font-bold" style={{ color: '#B91C1C', fontWeight: '700' }}>$50</span></p>
                    </div>
                    <p className="font-semibold mb-2" style={{ color: '#111827', fontWeight: '600' }}>What to bring:</p>
                    <ul className="list-disc list-inside space-y-1.5 text-sm ml-2" style={{ color: '#374151' }}>
                      <li style={{ color: '#374151' }}>Comfortable/ Light Clothes</li>
                      <li style={{ color: '#374151' }}>Water Shoes (not required, just be prepared for your shoes to get wet or go barefoot)</li>
                      <li style={{ color: '#374151' }}>Hat</li>
                      <li style={{ color: '#374151' }}>Sunscreen</li>
                      <li style={{ color: '#374151' }}>Bug Spray</li>
                      <li style={{ color: '#374151' }}>Cash for tipping</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl border-2 border-slate-300 shadow-lg" style={{ color: '#1F2937', backgroundColor: '#FFFFFF' }}>
                    <h5 className="font-bold text-lg mb-3" style={{ color: '#111827', fontWeight: '700' }}>Surf Lessons</h5>
                    <div className="space-y-2 mb-4">
                      <p className="text-base" style={{ color: '#1F2937' }}><strong style={{ color: '#111827', fontWeight: '700' }}>Meet:</strong> <span style={{ color: '#374151' }}>Club 33 Surf Shop (time confirmed closer to trip depending on tides)</span></p>
                      <p className="text-base" style={{ color: '#1F2937' }}><strong style={{ color: '#111827', fontWeight: '700' }}>Cash needed:</strong> <span className="font-bold" style={{ color: '#B91C1C', fontWeight: '700' }}>$55</span></p>
                    </div>
                    <p className="font-semibold mb-2" style={{ color: '#111827', fontWeight: '600' }}>What to bring:</p>
                    <ul className="list-disc list-inside space-y-1.5 text-sm ml-2" style={{ color: '#374151' }}>
                      <li style={{ color: '#374151' }}>Swimsuit</li>
                      <li style={{ color: '#374151' }}>Change of clothes</li>
                      <li style={{ color: '#374151' }}>Towel</li>
                      <li style={{ color: '#374151' }}>Sunblock</li>
                      <li style={{ color: '#374151' }}>Flip flops</li>
                      <li style={{ color: '#374151' }}>Cash for tipping</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl border-2 border-slate-300 shadow-lg" style={{ color: '#1F2937', backgroundColor: '#FFFFFF' }}>
                    <h5 className="font-bold text-lg mb-3" style={{ color: '#111827', fontWeight: '700' }}>Horseback Riding</h5>
                    <div className="space-y-2 mb-4">
                      <p className="text-base" style={{ color: '#1F2937' }}><strong style={{ color: '#111827', fontWeight: '700' }}>Meet:</strong> <span style={{ color: '#374151' }}>8:50AM in front of Restaurante Chiringuito</span></p>
                      <p className="text-base" style={{ color: '#1F2937' }}><strong style={{ color: '#111827', fontWeight: '700' }}>Time:</strong> <span style={{ color: '#374151' }}>9:00AM - 11:00AM</span></p>
                      <p className="text-base" style={{ color: '#1F2937' }}><strong style={{ color: '#111827', fontWeight: '700' }}>Cash needed:</strong> <span style={{ color: '#374151' }}>For tipping only</span></p>
                    </div>
                    <p className="font-semibold mb-2" style={{ color: '#111827', fontWeight: '600' }}>What to bring:</p>
                    <ul className="list-disc list-inside space-y-1.5 text-sm ml-2" style={{ color: '#374151' }}>
                      <li style={{ color: '#374151' }}>Long pants</li>
                      <li style={{ color: '#374151' }}>Closed toed shoes</li>
                      <li style={{ color: '#374151' }}>Camera</li>
                      <li style={{ color: '#374151' }}>Hat</li>
                      <li style={{ color: '#374151' }}>Sunscreen</li>
                      <li style={{ color: '#374151' }}>Cash for tipping</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TravelAccordionItem>

        </div>
      </section>
    </main>
  );
}
