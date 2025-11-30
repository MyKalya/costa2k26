"use client";

import { InfoTile } from "@/app/components/InfoTile";
import { HelpCircle, DollarSign, Calendar } from "lucide-react";

const updatesTiles = [
  {
    id: "help-plan",
    title: "Help us plan",
    badge: "ACTION NEEDED",
    description: "Answer a few quick questions so we can sort out arrivals, activities, and payments.",
    buttonLabel: "Start questions",
    href: "/updates/form",
    icon: HelpCircle,
    gradientFrom: "#0E3D2F",
    gradientTo: "#1C5A47",
    iconBgColor: "rgba(16, 185, 129, 0.15)", // emerald with transparency
    iconBorderColor: "rgba(16, 185, 129, 0.3)",
    ctaColor: "#059669", // emerald 600
  },
  {
    id: "money-owed",
    title: "What you owe so far",
    badge: "IMPORTANT",
    description: "Airbnb and catamaran deposits are ready. We will update the rest as things lock in.",
    buttonLabel: "View payment info",
    href: "/updates/payments",
    icon: DollarSign,
    gradientFrom: "#1F4E3A",
    gradientTo: "#2D6B57",
    iconBgColor: "rgba(243, 180, 76, 0.15)", // mango gold with transparency
    iconBorderColor: "rgba(243, 180, 76, 0.3)",
    ctaColor: "#F3B44C", // mango gold
  },
  {
    id: "itinerary-reminder",
    title: "Check the itinerary",
    badge: "LIVE AND UPDATING",
    description: "Make sure you review the full plan before answering the questions.",
    buttonLabel: "View itinerary",
    href: "/itinerary",
    icon: Calendar,
    gradientFrom: "#145A47",
    gradientTo: "#0E3D2F",
    iconBgColor: "rgba(28, 115, 106, 0.15)", // ocean teal with transparency
    iconBorderColor: "rgba(28, 115, 106, 0.3)",
    ctaColor: "#1C736A", // ocean teal
  },
];

export default function Updates() {
  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      <div className="max-w-4xl mx-auto px-5 py-10 sm:py-14">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7280] mb-2">
            Our trip hub
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-3 leading-tight">
            Updates & Action Items
          </h1>
          <p className="text-sm text-[#4B5563] max-w-xl">
            Here&apos;s what we need from you and what&apos;s been updated.
          </p>
        </div>

        {/* Tiles */}
        <div className="space-y-6">
          {updatesTiles.map((tile, index) => (
            <InfoTile
              key={tile.id}
              title={tile.title}
              badge={tile.badge}
              description={tile.description}
              buttonLabel={tile.buttonLabel}
              href={tile.href}
              icon={tile.icon}
              gradientFrom={tile.gradientFrom}
              gradientTo={tile.gradientTo}
              iconBgColor={tile.iconBgColor}
              iconBorderColor={tile.iconBorderColor}
              ctaColor={tile.ctaColor}
              index={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
