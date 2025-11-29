"use client";

import { Plane, Navigation, WalletCards, Shirt, Home, ShoppingBasket } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const travelCards = [
  {
    icon: Plane,
    title: "Arrival groups",
    body: (
      <>
        <p className="text-[11px] font-semibold text-emerald-700 uppercase tracking-[0.16em] mb-1">
          Feb 13 arrivals
        </p>
        <div className="space-y-2">
          <p>
            <span className="font-semibold text-slate-900">Main group - 2:30 pm arrival</span>
            <br />
            Most guests land around 2:30 pm on February 13.
          </p>
          <p>
            <span className="font-semibold text-slate-900">Second group - 4:30 pm arrival</span>
            <br />
            Thasithan, Aatharsha, Januka, Netharrshan, Khandeeban and Yothia land closer to 4:30 pm.
          </p>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
            We will arrange transport for both groups. If your flight time changes, just let us know.
          </p>
        </div>
      </>
    ),
  },
  {
    icon: Navigation,
    title: "Transport",
    subtitle: "In progress",
    body: (
      <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>We are finalizing whether we use group rentals or private shuttles.</p>
        <p>Either way, transport for both arrival groups will be arranged before we land.</p>
        <p>Return transport on February 18 will be coordinated the same way.</p>
        <p>If you prefer your own rental car there is parking at the villas.</p>
      </div>
    ),
  },
  {
    icon: WalletCards,
    title: "Money",
    body: (
      <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>Costa Rica is very card friendly.</p>
        <p>Still bring some USD for tips, small markets, taxis, parking and last minute buys.</p>
        <p>If you have a card with low foreign transaction fees, this is the time to use it.</p>
      </div>
    ),
  },
  {
    icon: Shirt,
    title: "Dress themes",
    body: (
      <ul className="mt-1.5 space-y-1.5 text-xs sm:text-sm text-slate-600">
        <li>
          <span className="font-semibold text-slate-900">Welcome night - All white.</span> First night hangout. Simple, all white fits for sunset photos and relaxed vibes.
        </li>
        <li>
          <span className="font-semibold text-slate-900">Catamaran day - Main party day</span> Our big party day on the water. We will share more detailed outfit ideas closer to the trip, but think fun beach fits you are happy to be photographed in.
        </li>
      </ul>
    ),
  },
  {
    icon: Home,
    title: "Villa essentials",
    body: (
      <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          For full details, check the <Link href="/stay" className="font-semibold text-emerald-700 underline">Stay</Link> and <Link href="/rooms" className="font-semibold text-emerald-700 underline">Rooms</Link> pages.
        </p>
        <p>High level: our three villas sit next to each other inside a gated community in Hacienda Pinilla.</p>
        <p>Wi Fi is strong in each villa. Door codes and room assignments live on the Rooms page and will be confirmed closer to February.</p>
        <p>A dedicated packing list page is coming in January so you are not guessing what to bring.</p>
      </div>
    ),
  },
  {
    icon: ShoppingBasket,
    title: "Groceries",
    body: (
      <>
        <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>We plan to have the villas pre stocked with groceries for the week so breakfasts and snacks are easy.</p>
          <p>If you have must haves like snacks, drinks or dietary needs, send us a message and we will try to include them when we place the order.</p>
        </div>
        <p className="mt-2 text-[11px] text-emerald-700/80">
          We will confirm closer to February how to send in your requests.
        </p>
      </>
    ),
  },
];

export default function TravelPage() {
  return (
    <main className="min-h-screen bg-slate-950 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Subtle jungle accent behind header */}
      <div className="absolute inset-x-0 -top-8 h-48 opacity-40 pointer-events-none bg-cover bg-center" />
      <div className="absolute inset-x-0 -top-8 h-48 bg-gradient-to-b from-slate-950/80 via-slate-950 to-transparent pointer-events-none" />

      <div className="relative max-w-xl mx-auto px-4 pb-24 pt-6 sm:pt-10">
        {/* Intro header */}
        <section aria-labelledby="travel-heading">
          <p className="text-xs font-semibold tracking-[0.18em] text-emerald-300 uppercase">
            Costa2K26
          </p>
          <h1 id="travel-heading" className="text-3xl sm:text-4xl font-semibold text-slate-50 mt-2">
            Travel and arrival
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
            Closest airport is Liberia (LIR), about one hour from our villas in Hacienda Pinilla. As we finalize logistics we will keep this page updated so you always know what to expect.
          </p>
          <p className="mt-1 text-xs text-emerald-200/80">
            Last updated once we lock flights, transport and groceries.
          </p>
        </section>

        {/* Cards layout */}
        <div className="mt-6 space-y-4 sm:space-y-5">
          {travelCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="relative overflow-hidden rounded-3xl bg-white/95 text-slate-900 shadow-lg shadow-emerald-900/20 border border-emerald-900/10 px-4 py-4 sm:px-5 sm:py-5"
              >
                {/* Top row with icon and title */}
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                    <IconComponent className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-sm font-semibold text-slate-900">
                        {card.title}
                      </h2>
                      {card.subtitle && (
                        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                          {card.subtitle}
                        </span>
                      )}
                    </div>
                    {/* Body text */}
                    <div className="mt-2.5">
                      {card.body}
                    </div>
                  </div>
                </div>

                {/* Subtle decorative gradient stripe */}
                <div className="pointer-events-none absolute inset-x-4 bottom-0 h-1 rounded-full bg-gradient-to-r from-emerald-500 via-lime-400 to-emerald-500 opacity-60" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
