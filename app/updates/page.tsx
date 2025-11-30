"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

function UpdatesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 space-y-10">
        {/* Page Header and Planning CTA */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Updates
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
            Help us plan Costa Rica
          </h1>
          <p className="text-base text-slate-600 mb-6 leading-relaxed">
            Help us plan the after party by answering a few quick questions. Before you fill anything out, make sure you have looked at the itinerary so your answers actually match the plans.
          </p>

          {/* Step 1 Card */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-sm p-5 space-y-3">
            <h2 className="text-base md:text-lg font-semibold text-slate-900">
              Step 1 - Read the itinerary
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Start on the Itinerary page so you know what the week looks like, what is already planned, and what is still flexible.
            </p>
            <Link
              href="/itinerary"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-sky-600 text-white hover:bg-sky-700 transition"
            >
              Open the Itinerary
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Money Owed Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mt-6 mb-2">
            What you owe so far
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            These are the only payments needed right now. We will update this section as more group costs get finalized.
          </p>

          {/* Payment Tiles Grid */}
          <div className="grid gap-4 md:grid-cols-2 mb-4">
            {/* Tile 1 - Villa Deposit */}
            <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-sm p-5 flex flex-col gap-3">
              <h3 className="text-base md:text-lg font-semibold text-slate-900">
                Airbnb Villa Deposit
              </h3>
              
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-slate-500">Amount</span>
                <span className="font-semibold text-slate-900">$450 per person</span>
              </div>
              
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-slate-500">Due</span>
                <span className="font-semibold text-slate-900">ASAP</span>
              </div>
              
              <p className="text-sm text-slate-700">
                This locks in your spot at the villa for the trip.
              </p>
              
              <div className="border-t border-slate-100 pt-3 mt-2 text-sm text-slate-700 space-y-1">
                <p className="font-medium text-slate-900 mb-2">How to pay</p>
                <p>Send e-transfer to m.gnanam31@gmail.com</p>
                <p>If you prefer Wealthsimple, send to $mathu</p>
              </div>
            </div>

            {/* Tile 2 - Catamaran Deposit */}
            <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-sm p-5 flex flex-col gap-3">
              <h3 className="text-base md:text-lg font-semibold text-slate-900">
                Catamaran Party Deposit
              </h3>
              
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-slate-500">Amount</span>
                <span className="font-semibold text-slate-900">$100 per person</span>
              </div>
              
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-slate-500">Due</span>
                <span className="font-semibold text-slate-900">ASAP</span>
              </div>
              
              <p className="text-sm text-slate-700">
                This covers your share of the private catamaran party on February 17.
              </p>
              
              <div className="border-t border-slate-100 pt-3 mt-2 text-sm text-slate-700 space-y-1">
                <p className="font-medium text-slate-900 mb-2">How to pay</p>
                <p>Send e-transfer to m.gnanam31@gmail.com</p>
                <p>If you prefer Wealthsimple, send to $mathu</p>
              </div>
            </div>
          </div>

          {/* Tile 3 - Future Costs Info */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 shadow-sm backdrop-blur-sm p-5">
            <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
              More to come
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              No other payments are needed right now. We will add new tiles here as other activities or group costs get locked in so you always know exactly how much you owe and what it is for.
            </p>
          </div>
        </section>

        {/* Trip Questions Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mt-10 mb-2">
            Trip details form
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            We will use a quick form to collect your flight details and activity preferences so we can sort airport rides, activities and room vibes. The form is not live yet, but it is coming soon.
          </p>

          {/* Coming Soon Card */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-sm p-5 space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-slate-900">
              Coming soon
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              We are finalizing the questions. Once this is live, you will be able to fill out your flight info, arrival and departure times, and preferences for activities. Your answers will go straight into a planning spreadsheet on our side.
            </p>
            <div className="space-y-2">
              <button
                disabled
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-slate-200 text-slate-500 cursor-not-allowed"
              >
                Trip questions form coming soon
              </button>
              <p className="text-xs text-slate-500">
                We will ping the group chat once this form is ready.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default UpdatesPage;
