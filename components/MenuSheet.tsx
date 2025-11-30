"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/Button";

const menuLinks = [
  { href: "/stay", label: "Our Villa", icon: "🏡" },
  { href: "/rooms", label: "Rooms", icon: "🛌" },
  // { href: "/travel", label: "Travel", icon: "✈️" }, // Hidden for now
  { href: "/itinerary", label: "Itinerary", icon: "🗓️" },
  // { href: "/packing", label: "Packing", icon: "🧳" }, // Hidden for now
  { href: "/explore-tamarindo", label: "Explore Nearby", icon: "🍹" },
  { href: "/tripcosts", label: "Trip costs", icon: "💰" },
  // { href: "/updates", label: "Updates", icon: "📣" }, // Hidden for now
  // { href: "/guest", label: "Guest 🔒", icon: "🔐" }, // Removed
] as const;

export default function MenuSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="primary" size="md" aria-haspopup="dialog" aria-expanded={open}>
        Menu
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/45 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-t-3xl border border-border bg-surface p-6 shadow-[0_-20px_40px_rgba(0,0,0,0.22)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid gap-3">
              {menuLinks.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center gap-3 rounded-pill border border-border bg-background-subtle px-5 py-3 text-base font-medium text-foreground transition-transform duration-200 hover:-translate-y-1 hover:shadow-hover focus-visible:-translate-y-1 focus-visible:shadow-focus"
                >
                  <span aria-hidden className="text-xl">
                    {icon}
                  </span>
                  <span>{label}</span>
                </Link>
              ))}
              <Button variant="ghost" size="md" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
