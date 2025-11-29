"use client";

import { CalendarCheck, Car, Sparkles, Wallet, CloudSun, Home, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";

export default function TravelPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-10 pb-24">
        {/* Hero Section */}
        <section className="mb-10">
          <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase mb-2">
            Travel & Arrival
          </p>
          <p className="text-base text-slate-600 leading-relaxed">
            Closest airport is Liberia LIR — about one hour to the villa.
          </p>
        </section>

        {/* Accordion Sections */}
        <Accordion>
          {/* Section 1 - Groups Arriving */}
          <AccordionItem
            title="Arrival Groups (Feb 13)"
            icon={CalendarCheck}
            preview="Two arrival groups — we&apos;ll coordinate pickups accordingly."
            bgColor="#E8F1EB"
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Group 1 – 2:30 PM</h4>
                <p className="text-slate-700">
                  Almost everyone arrives at this time
                </p>
                <p className="text-slate-700">
                  You&apos;ll be grouped together for transport
                </p>
                <p className="text-slate-700">
                  We&apos;ll share exact instructions in January
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Group 2 – 4:30 PM</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li>Thasithan</li>
                  <li>Aatharsha</li>
                  <li>Januka</li>
                  <li>Netharshan</li>
                  <li>Khandeeban</li>
                  <li>Yothia</li>
                </ul>
                <p className="mt-2 text-slate-700">
                  Separate pickup will be arranged
                </p>
              </div>
              <p className="text-slate-700 pt-2 border-t border-slate-200/50">
                If plans change, let us know so we can update transport
              </p>
            </div>
          </AccordionItem>

          {/* Section 2 - Transport Plan */}
          <AccordionItem
            title="Transport to the Villa"
            icon={Car}
            preview="We&apos;re finalizing between rentals and group shuttles."
            bgColor="#DDEFE3"
          >
            <div className="space-y-3 text-slate-700">
              <p>
                We&apos;re finalizing between rental cars and coordinated shuttles. Either way, transport will be fully arranged for both arrival groups before landing.
              </p>
              <p>
                If your arrival time changes, please update us — it affects how we organize pickups.
              </p>
            </div>
          </AccordionItem>

          {/* Section 3 - Welcome Party Dress Code */}
          <AccordionItem
            title="Arrival Night Theme"
            icon={Sparkles}
            preview="All-white welcome party on Feb 13."
            bgColor="#F8F6F0"
          >
            <p className="text-slate-700">
              Our first night is a relaxed, fun all-white theme. Think bright, breezy, coastal-white outfits. Anything comfortable but cute works.
            </p>
          </AccordionItem>

          {/* Section 4 - Currency */}
          <AccordionItem
            title="Money Tips"
            icon={Wallet}
            preview="Bring USD + use fee-friendly cards."
            bgColor="#F3EEE5"
          >
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>USD works almost everywhere</li>
              <li>Good exchange rates at ATMs, not kiosks</li>
              <li>Use no-FX-fee cards if you have them</li>
              <li>Bring some cash for tips, shops, and random snacks</li>
            </ul>
          </AccordionItem>

          {/* Section 5 - Weather */}
          <AccordionItem
            title="Weather in Tamarindo"
            icon={CloudSun}
            preview="Expect hot, sunny, tropical weather."
            bgColor="#E8F1EB"
          >
            <div className="space-y-3 text-slate-700">
              <p>
                February is dry season — expect hot sun, blue skies, and warm nights.
              </p>
              <div className="weather-widget-placeholder pt-4 border-t border-slate-200/50">
                {/* In future: weather API */}
              </div>
            </div>
          </AccordionItem>

          {/* Section 6 - Villa Essentials */}
          <AccordionItem
            title="Villa Basics"
            icon={Home}
            preview="Wi-Fi, codes, and quick villa info."
            bgColor="#DDEFE3"
          >
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Fast Wi-Fi at all villas</li>
              <li>Door codes will be shared closer to the trip</li>
              <li>
                Full villa details are on the <Link href="/stay" className="font-semibold text-slate-900 underline">Stay</Link> and <Link href="/rooms" className="font-semibold text-slate-900 underline">Rooms</Link> pages
              </li>
              <li>We&apos;ll share a full packing list in January</li>
            </ul>
          </AccordionItem>

          {/* Section 7 - Groceries & Meals */}
          <AccordionItem
            title="Groceries & Breakfast"
            icon={ShoppingBasket}
            preview="We&apos;ll pre-stock groceries — tell us what you want."
            bgColor="#F8F6F0"
          >
            <p className="text-slate-700">
              We&apos;re arranging groceries and breakfast items to be pre-stocked for the group. We&apos;ll share a link for requests so you can add any essentials you want waiting for you.
            </p>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
