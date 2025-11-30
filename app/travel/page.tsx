"use client";

import { CalendarCheck, Car, Sparkles, PartyPopper, Sailboat as Catamaran, Backpack } from "lucide-react";
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
          {/* Accordion Item 1: Arrival Groups (Feb 13) */}
          <AccordionItem
            title="Arrival Groups (Feb 13)"
            icon={CalendarCheck}
            preview="Two arrival groups — we'll coordinate pickups accordingly."
            bgColor="#E8F1EB"
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Group 1 – 2:30 PM</h4>
                <p className="text-slate-700">
                  Most people arrive in this group.
                </p>
                <p className="text-slate-700">
                  You&apos;ll be grouped into rental cars with a designated driver.
                </p>
                <p className="text-slate-700">
                  Full instructions will be shared in January.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Group 2 – 4:30 PM</h4>
                <p className="text-slate-700">
                  A separate rental car group will be arranged for this arrival time.
                </p>
              </div>
              <p className="text-slate-700 pt-2 border-t border-slate-200/50">
                If plans change, let us know so we can update transport
              </p>
            </div>
          </AccordionItem>

          {/* Accordion Item 2: Transport to the Villa */}
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

          {/* Accordion Item 3: Arrival Night Theme */}
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

          {/* Accordion Item 4: Puerto de Sal Beach Club */}
          <AccordionItem
            title="Puerto de Sal Beach Club"
            icon={PartyPopper}
            preview="Light, dreamy, coastal romantic. Ultra flattering."
            bgColor="#F3EEE5"
          >
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Ladies think baby pink, peach, lavender, soft yellow, champagne, pastel coral.</li>
              <li>Men think creams, linen, pale pinks, peach, light grey or pastel yellows.</li>
              <li>Bring some cash for tips, shops, random snacks etc.</li>
            </ul>
          </AccordionItem>

          {/* Accordion Item 5: Party on the Sea (Catamaran Theme) */}
          <AccordionItem
            title="Party on the Sea"
            icon={Catamaran}
            preview="Warm, romantic sunset palette."
            bgColor="#E8F1EB"
          >
            <div className="space-y-3 text-slate-700">
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
          </AccordionItem>

          {/* Accordion Item 6: Packing List (Coming Soon) */}
          <AccordionItem
            title="Packing List"
            icon={Backpack}
            preview="Full packing guide coming in January."
            bgColor="#DDEFE3"
          >
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>A full packing list is coming soon with basics for the villa, adventure days, and beach days. Themed-night details are already on this page so you can plan outfits early.</li>
              <li>We&apos;ll share it in January as activities and details finalize, but this itinerary should give you a solid head start.</li>
            </ul>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
