"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import type { LucideIcon } from "lucide-react";
import {
  BedDouble,
  Home,
  Plane,
  CalendarDays,
  Package,
  Gift,
  CircleHelp,
  Megaphone,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/Button";

type NavItem = { href: string; label: string; Icon: LucideIcon };

const navLinks: NavItem[] = [
  { href: "/stay", label: "Our Villa", Icon: Home },
  { href: "/rooms", label: "Rooms", Icon: BedDouble },
  // { href: "/travel", label: "Travel", Icon: Plane }, // Hidden for now
  { href: "/itinerary", label: "Itinerary", Icon: CalendarDays },
  // { href: "/packing", label: "Packing", Icon: Package }, // Hidden for now
  { href: "/explore-tamarindo", label: "Explore Nearby", Icon: Gift },
  { href: "/faq", label: "Trip costs", Icon: CircleHelp },
  // { href: "/updates", label: "Updates", Icon: Megaphone }, // Hidden for now
  // { href: "/guest", label: "Guest 🔒", Icon: Lock }, // Removed
] as const;

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // top threshold for style change
      setIsScrolled(currentY > 80);

      // hide on scroll down, show on scroll up (only after scrolling past 100px)
      if (currentY < 100) {
        setIsHidden(false);
      } else if (currentY > lastScrollY && currentY > 150) {
        setIsHidden(true);
      } else if (currentY < lastScrollY) {
        setIsHidden(false);
      }

      setLastScrollY(currentY);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const main = document.querySelector("main");
    main?.setAttribute("aria-hidden", "true");
    (main as HTMLElement | null)?.setAttribute("inert", "");

    const focusable = menuRef.current?.querySelectorAll<HTMLElement>("a, button");
    if (focusable && focusable.length) {
      focusable[0].focus();
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        previouslyFocused?.focus?.();
      }
      if (event.key === "Tab" && focusable && focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
      previouslyFocused?.focus?.();
      main?.removeAttribute("aria-hidden");
      main?.removeAttribute("inert");
    };
  }, [open]);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-40 transition-transform duration-300 overflow-hidden",
        isHidden && isScrolled ? "-translate-y-full" : "translate-y-0"
      )}
      style={{ margin: 0, padding: 0 }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/drbh1hki1/image/upload/v1764376148/ChatGPT_Image_Nov_28_2025_07_29_02_PM_oa4q8h.png')",
        }}
      />
      
      {/* Glassmorphic effect at 35% opacity */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/35 border-b border-white/10 pointer-events-none" />
      
      <nav className="relative mx-auto flex max-w-5xl items-center justify-between px-4" style={{ height: "56px" }}>
        {/* Left spacer - empty */}
        <div className="w-10" />
        
        {/* Centered brand - white text to pop against background */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 z-10 text-[20px] sm:text-[22px] font-normal text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          style={{ fontFamily: "'Pacifico', cursive" }}
          aria-label="Costa Rica 2026 home"
        >
          Costa2K26
        </Link>
        
        {/* Right menu button - white icon to pop against background */}
        <button
          type="button"
          className="relative z-10 p-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label="Open menu"
        >
          <svg
            className="h-6 w-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-24 sm:pt-28"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/35 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div 
            ref={menuRef} 
            className="relative w-full max-w-sm max-h-[70svh] overflow-hidden rounded-3xl border border-white/20 shadow-2xl"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/drbh1hki1/image/upload/v1764376148/ChatGPT_Image_Nov_28_2025_07_29_02_PM_oa4q8h.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Glassmorphic effect at 35% opacity */}
            <div className="absolute inset-0 backdrop-blur-md bg-white/35 pointer-events-none" />
            
            {/* Content with proper z-index */}
            <div className="relative z-10 flex max-h-[60svh] flex-col space-y-3 overflow-y-auto p-6">
              {navLinks.map(({ href, label, Icon }, index) => (
                <Link
                  key={href}
                  href={href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  className="flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" aria-hidden />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
