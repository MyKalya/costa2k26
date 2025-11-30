"use client";

import Link from "next/link";
import { ArrowRight, Calendar, DollarSign, HelpCircle, FileText } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PaymentTile } from "@/app/components/PaymentTile";

function UpdatesPage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 space-y-10">
        {/* Page Header and Planning CTA */}
        <section ref={sectionRef}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7280] mb-2">
            Updates
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#111827] mb-4">
            Help us plan Costa Rica
          </h1>
          <p className="text-base text-[#4B5563] mb-6 leading-relaxed">
            Help us plan the after party by answering a few quick questions. Before you fill anything out, make sure you have looked at the itinerary so your answers actually match the plans.
          </p>

          {/* Step 1 Card - Styled to match Trip Hub */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="group relative block rounded-3xl border border-white/20 p-6 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-filter backdrop-blur-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:-translate-y-[3px] transition-all duration-300 ease-out overflow-hidden"
            style={{
              background: "linear-gradient(to bottom right, #0E3D2F, #1C5A47)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative flex items-start gap-5">
              <motion.div
                className="flex-shrink-0 mt-0.5"
                whileHover={{ y: -2, rotate: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl p-3 shadow-lg backdrop-blur-sm border"
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.15)",
                    borderColor: "rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <Calendar className="h-6 w-6 text-white" strokeWidth={2} />
                </div>
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="text-lg font-semibold text-white leading-tight">
                    Step 1 - Read the itinerary
                  </h2>
                  <span className="flex-shrink-0 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold text-white/90 whitespace-nowrap uppercase tracking-wide border border-white/30">
                    START HERE
                  </span>
                </div>
                <p className="text-sm text-white/80 mb-4 leading-relaxed">
                  Start on the Itinerary page so you know what the week looks like, what is already planned, and what is still flexible.
                </p>
                <Link href="/itinerary">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md transition-shadow duration-200 hover:shadow-lg"
                      style={{ backgroundColor: "#059669" }}
                    >
                      Open the Itinerary
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Money Owed Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-[#111827] mt-6 mb-2">
            What you owe so far
          </h2>
          <p className="text-sm text-[#4B5563] mb-6">
            These are the only payments needed right now. We will update this section as more group costs get finalized.
          </p>

          {/* Payment Tiles Grid */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <PaymentTile
              title="Airbnb Villa Deposit"
              amount="$450 per person"
              due="ASAP"
              description="This locks in your spot at the villa for the trip."
              paymentInstructions={{
                label: "How to pay",
                lines: [
                  "Send e-transfer to m.gnanam31@gmail.com",
                  "If you prefer Wealthsimple, send to $mathu",
                ],
              }}
              icon={DollarSign}
              gradientFrom="#0E3D2F"
              gradientTo="#1C5A47"
              iconBgColor="rgba(16, 185, 129, 0.15)"
              iconBorderColor="rgba(16, 185, 129, 0.3)"
              index={0}
            />

            <PaymentTile
              title="Catamaran Party Deposit"
              amount="$100 per person"
              due="ASAP"
              description="This covers your share of the private catamaran party on February 17."
              paymentInstructions={{
                label: "How to pay",
                lines: [
                  "Send e-transfer to m.gnanam31@gmail.com",
                  "If you prefer Wealthsimple, send to $mathu",
                ],
              }}
              icon={DollarSign}
              gradientFrom="#1F4E3A"
              gradientTo="#2D6B57"
              iconBgColor="rgba(243, 180, 76, 0.15)"
              iconBorderColor="rgba(243, 180, 76, 0.3)"
              index={1}
            />
          </div>

          {/* Tile 3 - Future Costs Info - Styled to match */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
            className="rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm p-6"
          >
            <div className="flex items-start gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl p-3 shadow-sm border border-slate-200"
                style={{
                  backgroundColor: "#F3F4F6",
                }}
              >
                <HelpCircle className="h-6 w-6 text-slate-500" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                  More to come
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  No other payments are needed right now. We will add new tiles here as other activities or group costs get locked in so you always know exactly how much you owe and what it is for.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Trip Questions Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-[#111827] mt-10 mb-2">
            Trip details form
          </h2>
          <p className="text-sm text-[#4B5563] mb-6">
            We will use a quick form to collect your flight details and activity preferences so we can sort airport rides, activities and room vibes. The form is not live yet, but it is coming soon.
          </p>

          {/* Coming Soon Card - Styled to match */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.45, delay: 0.3, ease: "easeOut" }}
            className="group relative block rounded-3xl border border-white/20 p-6 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-filter backdrop-blur-sm overflow-hidden"
            style={{
              background: "linear-gradient(to bottom right, #145A47, #0E3D2F)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative flex items-start gap-5">
              <motion.div
                className="flex-shrink-0 mt-0.5"
                whileHover={{ y: -2, rotate: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl p-3 shadow-lg backdrop-blur-sm border"
                  style={{
                    backgroundColor: "rgba(28, 115, 106, 0.15)",
                    borderColor: "rgba(28, 115, 106, 0.3)",
                  }}
                >
                  <FileText className="h-6 w-6 text-white" strokeWidth={2} />
                </div>
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white leading-tight">
                    Coming soon
                  </h3>
                  <span className="flex-shrink-0 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold text-white/90 whitespace-nowrap uppercase tracking-wide border border-white/30">
                    IN PROGRESS
                  </span>
                </div>
                <p className="text-sm text-white/80 mb-4 leading-relaxed">
                  We are finalizing the questions. Once this is live, you will be able to fill out your flight info, arrival and departure times, and preferences for activities. Your answers will go straight into a planning spreadsheet on our side.
                </p>
                <div className="space-y-2">
                  <button
                    disabled
                    className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold bg-slate-400/50 text-white/60 cursor-not-allowed shadow-sm"
                  >
                    Trip questions form coming soon
                  </button>
                  <p className="text-xs text-white/60">
                    We will ping the group chat once this form is ready.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

export default UpdatesPage;
