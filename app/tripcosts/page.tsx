"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Home, Sailboat, Car, UtensilsCrossed, Palmtree, Wallet, Ticket, ChevronDown, ChevronUp, CreditCard, Check, Copy } from "lucide-react";
import { clsx } from "clsx";
import { PalmBackground } from "@/components/PalmBackground";

type CostCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  amount?: string;
  amountLabel?: string;
  depositNow?: string;
  depositLabel?: string;
  estimatedTotal?: string;
  estimatedLabel?: string;
  paymentInstructions?: string;
  cardBgClass?: string;
  cardBorderClass?: string;
  iconBgClass?: string;
  iconColorClass?: string;
  amountColorClass?: string;
  amountLabelColorClass?: string;
  gradientFrom?: string;
  gradientTo?: string;
  children?: React.ReactNode;
  isDeposit?: boolean;
  darkText?: boolean;
};

function CostCard({ 
  icon, 
  title, 
  subtitle, 
  amount, 
  amountLabel,
  depositNow,
  depositLabel,
  estimatedTotal,
  estimatedLabel,
  paymentInstructions,
  cardBgClass = "bg-emerald-50",
  cardBorderClass = "border-emerald-100",
  iconBgClass = "bg-emerald-100",
  iconColorClass = "text-emerald-800",
  amountColorClass = "text-emerald-900",
  amountLabelColorClass = "text-emerald-800",
  gradientFrom,
  gradientTo,
  children,
  isDeposit = false,
  darkText = false,
}: CostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const hasTwoLineAmount = depositNow && estimatedTotal;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={clsx(
        "group relative overflow-hidden rounded-3xl border shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-filter backdrop-blur-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:-translate-y-[3px] transition-all duration-300 ease-out",
        isDeposit ? "p-5 sm:p-6" : "p-5 sm:p-6",
        darkText ? "border-slate-300/40" : "border-white/20"
      )}
      style={{
        background: gradientFrom && gradientTo
          ? `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`
          : undefined,
      }}
    >
      {/* Subtle brightness on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
          <div className="flex gap-3 flex-1 min-w-0">
            {/* Icon with glass morphism */}
            <motion.div
              className="flex-shrink-0 mt-0.5"
              whileHover={{ y: -2, rotate: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className={clsx("flex h-12 w-12 items-center justify-center rounded-2xl p-3 shadow-lg backdrop-blur-sm border", darkText ? "bg-slate-200/60 border-slate-300/40" : "bg-white/15 border-white/20")}>
                {icon}
              </div>
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className={clsx("text-lg font-semibold leading-tight mb-0.5", darkText ? "text-slate-800" : "text-white")}>{title}</h3>
              {subtitle && (
                <p className={clsx("text-sm font-medium mb-2", darkText ? "text-slate-700" : "text-white/80")}>{subtitle}</p>
              )}
              {/* Estimated total - placed under subtitle to fill space */}
              {hasTwoLineAmount && estimatedTotal && (
                <div className="flex flex-col gap-0.5 mt-2">
                  <span className="text-[9px] font-medium text-white/60 uppercase tracking-wider">
                    Estimated total
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-white/90">
                    {estimatedTotal}
                  </span>
                  {estimatedLabel && (
                    <span className="text-[9px] font-normal uppercase tracking-wide leading-tight text-white/60">
                      {estimatedLabel}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Amount display - Deposit only on right */}
          {(amount || amountLabel || hasTwoLineAmount) && (
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              {hasTwoLineAmount ? (
                <>
                  {/* Deposit now - highlighted */}
                  <div className="flex flex-col items-end gap-0.5 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30 shadow-lg">
                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">
                      Deposit now
                    </span>
                    <span className="text-3xl sm:text-4xl font-bold text-white">
                      {depositNow}
                    </span>
                    {depositLabel && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-white/80">
                        {depositLabel}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {amount && (
                    <div className={clsx("backdrop-blur-sm rounded-xl px-4 py-3 border shadow-lg", darkText ? "bg-slate-200/80 border-slate-300/50" : "bg-white/20 border-white/30")}>
                      <span className={clsx("text-2xl sm:text-3xl font-bold block", darkText ? "text-slate-800" : "text-white")}>
                        {amount}
                      </span>
                    </div>
                  )}
                  {amountLabel && (
                    <span className={clsx("text-[10px] font-semibold uppercase tracking-wide mt-1", darkText ? "text-slate-700" : "text-white/80")}>
                      {amountLabel}
                    </span>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Body content */}
        {children && (
          <div className={clsx("text-sm leading-relaxed space-y-2.5", darkText ? "text-slate-700" : "text-white/80")}>
            <div>{children}</div>
            
            {/* Payment instructions - collapsible */}
            {paymentInstructions && (
              <div className={clsx("pt-2 mt-2 border-t", darkText ? "border-slate-300/40" : "border-white/20")}>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1.5 w-full text-left group/payment"
                >
                  <CreditCard className={clsx("h-3.5 w-3.5", darkText ? "text-slate-600" : "text-white/70")} />
                  <span className={clsx("text-xs font-bold uppercase tracking-wide", darkText ? "text-slate-800" : "text-white")}>
                    How to pay
                  </span>
                  {isExpanded ? (
                    <ChevronUp className={clsx("h-3.5 w-3.5 ml-auto transition-transform", darkText ? "text-slate-600" : "text-white/70")} />
                  ) : (
                    <ChevronDown className={clsx("h-3.5 w-3.5 ml-auto transition-transform", darkText ? "text-slate-600" : "text-white/70")} />
                  )}
                </button>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 space-y-2"
                  >
                    <button
                      onClick={() => handleCopy("m.gnanam31@gmail.com", "email")}
                      className={clsx("flex items-start gap-2 text-xs transition-colors w-full text-left group/item", darkText ? "text-slate-800 hover:text-slate-900" : "text-white/90 hover:text-white")}
                    >
                      {copied === "email" ? (
                        <Check className="h-3.5 w-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Copy className={clsx("h-3.5 w-3.5 flex-shrink-0 mt-0.5 transition-colors", darkText ? "text-slate-500 group-hover/item:text-slate-700" : "text-white/50 group-hover/item:text-white/80")} />
                      )}
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono">m.gnanam31@gmail.com</span>
                        <span className={clsx("text-[10px]", darkText ? "text-slate-600" : "text-white/60")}>Interac e-transfer</span>
                      </div>
                    </button>
                    <button
                      onClick={() => handleCopy("$mathu", "mathu")}
                      className={clsx("flex items-start gap-2 text-xs transition-colors w-full text-left group/item", darkText ? "text-slate-800 hover:text-slate-900" : "text-white/90 hover:text-white")}
                    >
                      {copied === "mathu" ? (
                        <Check className="h-3.5 w-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Copy className={clsx("h-3.5 w-3.5 flex-shrink-0 mt-0.5 transition-colors", darkText ? "text-slate-500 group-hover/item:text-slate-700" : "text-white/50 group-hover/item:text-white/80")} />
                      )}
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono">$mathu</span>
                        <span className={clsx("text-[10px]", darkText ? "text-slate-600" : "text-white/60")}>Wealthsimple</span>
                      </div>
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function TripCostsPage() {
  const heroRef = useRef(null);
  const section0Ref = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const section0InView = useInView(section0Ref, { once: true, margin: "-100px" });
  const section1InView = useInView(section1Ref, { once: true, margin: "-100px" });
  const section2InView = useInView(section2Ref, { once: true, margin: "-100px" });

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
              Trip costs overview
            </h1>

            {/* Description */}
            <p className="mb-4 text-base sm:text-lg text-white/90 drop-shadow-md leading-relaxed max-w-xl">
              We want everyone to feel relaxed and in the loop, so here&apos;s a simple breakdown of what we&apos;re planning to spend. Numbers may shift a little as we finalize vendors and headcount, but this should give you a clear estimate.
            </p>

            {/* Helper text */}
            <p className="text-xs text-white/70 italic">
              This page will be updated as we send deposits and get final invoices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
        {/* Section 0: Payments so far */}
        <div ref={section0Ref} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={section0InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-1 w-8 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Payments so far
              </h2>
              <span className="px-3 py-1 text-xs font-bold text-slate-700 bg-slate-200 rounded-full border border-slate-300">
                COMPLETED
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed ml-11">
              These payments have already been collected.
            </p>
          </motion.div>

          <div className="space-y-6">
            {/* Initial Deposit */}
            <CostCard
              icon={<Wallet className="h-6 w-6" strokeWidth={2} style={{ color: "#64748B" }} />}
              title="Initial deposit"
              amount="$550"
              amountLabel="per person"
              gradientFrom="#475569"
              gradientTo="#64748B"
            >
              <div className="space-y-2">
                <p className="font-semibold text-white mb-2">Breakdown:</p>
                <ul className="space-y-1.5 text-sm text-white/90">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                    Airbnb villas deposit: <span className="font-semibold">$450</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                    Catamaran deposit: <span className="font-semibold">$100</span>
                  </li>
                </ul>
              </div>
            </CostCard>
          </div>
        </div>

        {/* Section 1: What we're paying now */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={section1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-1 w-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                What we&apos;re paying now
              </h2>
              <span className="px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-100 rounded-full border border-emerald-200">
                ACTION REQUIRED
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed ml-11">
              This section covers amounts we will actually ask you to send now.
            </p>
          </motion.div>

          <div className="space-y-6">
            {/* Next Payment */}
            <CostCard
              icon={<CreditCard className="h-6 w-6" strokeWidth={2} style={{ color: "#10B981" }} />}
              title="Next payment"
              amount="$330.99"
              amountLabel="per person"
              paymentInstructions="Send e-transfer to m.gnanam31@gmail.com or Wealthsimple to $mathu."
              gradientFrom="#1F4E3A"
              gradientTo="#2D6B57"
            >
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-white mb-2">Breakdown:</p>
                  <ul className="space-y-1.5 text-sm text-white/90">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                      Total Airbnb per person: <span className="font-semibold">$629.12</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                      Already paid: <span className="font-semibold">$450</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                      Remaining Airbnb: <span className="font-semibold">$179.12</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                      Dinners & BBQ: <span className="font-semibold">$100.08</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                      Catamaran remainder: <span className="font-semibold">$51.80</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-white/20">
                  <p className="text-sm text-white/95">
                    <span className="font-semibold">Good news:</span> Airbnb came in at $629.12 per person, lower than our estimate. Catamaran came in at $151.80 per person, at the lowest end of our range. <span className="font-semibold">Feb 13:</span> Private chef arrival dinner is covered by us.
                  </p>
                </div>
              </div>
            </CostCard>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Planning Ahead
            </span>
          </div>
        </div>

        {/* Section 2: What to plan for */}
        <div ref={section2Ref} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={section2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-1 w-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Future payments to expect
              </h2>
              <span className="px-3 py-1 text-xs font-bold text-amber-700 bg-amber-100 rounded-full border border-amber-200">
                ESTIMATES
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed ml-11">
              We will only request money once final costs are locked. Budget for these costs—some are still being finalized.
            </p>
          </motion.div>

          <div className="space-y-4">
            {/* Airport Transportation */}
            <CostCard
              icon={<Car className="h-6 w-6" strokeWidth={2} style={{ color: "#60A5FA" }} />}
              title="Airport transportation & shuttles"
              subtitle="Getting between airport, villas and activities"
              amount="$40–$60"
              amountLabel="estimate per person"
              gradientFrom="#38BDF8"
              gradientTo="#60A5FA"
            >
              <p>
                We&apos;ll mix rental cars and group transport so people can get around without stress. Final cost depends on flight times and how many cars we end up needing.
              </p>
            </CostCard>

            {/* Group Breakfasts */}
            <CostCard
              icon={<UtensilsCrossed className="h-6 w-6" strokeWidth={2} style={{ color: "#F3B44C" }} />}
              title="Group breakfasts"
              subtitle="Easy mornings at the villas"
              amount="$40–$80"
              amountLabel="estimate per person"
              gradientFrom="#D97706"
              gradientTo="#F59E0B"
            >
              <p>
                We&apos;re exploring pre arranged family style breakfasts to make mornings easier. Food spots aren&apos;t within walking distance, so this helps everyone start the day with a good meal, coffee, and no hassle before we head out. Final cost depends on which days we choose to have it prepped at the villa.
              </p>
            </CostCard>

            {/* Snacks Pre-Order */}
            <CostCard
              icon={<UtensilsCrossed className="h-6 w-6" strokeWidth={2} style={{ color: "#F3B44C" }} />}
              title="Snacks for the villas"
              subtitle="Pre-ordered snacks and essentials"
              amountLabel="TBD"
              gradientFrom="#D97706"
              gradientTo="#F59E0B"
            >
              <p>
                We&apos;ll pre-order some snacks and essentials for the villas to make things easier. Final cost will depend on what we order and headcount.
              </p>
            </CostCard>

            {/* La Leona Adventure Day */}
            <CostCard
              icon={<Palmtree className="h-6 w-6" strokeWidth={2} style={{ color: "#10B981" }} />}
              title="La Leona adventure day"
              subtitle="Group activity day"
              amountLabel="TBD"
              gradientFrom="#059669"
              gradientTo="#10B981"
            >
              <p>
                We&apos;re planning a group adventure day at La Leona. Final pricing will be shared once we confirm the details and package.
              </p>
            </CostCard>

            {/* Activities */}
            <CostCard
              icon={<Palmtree className="h-6 w-6" strokeWidth={2} style={{ color: "#10B981" }} />}
              title="Other activities"
              subtitle="ATVs, beach clubs, spa time & more"
              amountLabel="varies by activity"
              gradientFrom="#0E3D2F"
              gradientTo="#1C5A47"
            >
              <p>
                Think ATV tours, chasing waterfalls, hot springs, water activities, surf lessons, spa/massage time and whatever else the group is feeling. We&apos;ll share the activity list and pricing soon so you can choose what you&apos;re into.
              </p>
            </CostCard>

            {/* Beach clubs, classes & entrance fees */}
            <CostCard
              icon={<Ticket className="h-6 w-6" strokeWidth={2} style={{ color: "#FB7185" }} />}
              title="Beach clubs, classes & entrance fees"
              subtitle="Day passes, lessons and local spots"
              amount="$10–$50"
              amountLabel="per outing"
              gradientFrom="#E11D48"
              gradientTo="#F43F5E"
            >
              <p>
                Think beach club day beds, yoga or fitness classes, surf classes, waterfall or park entrance fees and other small things that pop up while we&apos;re in Costa Rica. Most of these are optional and pay as you go.
              </p>
            </CostCard>

            {/* Spending Money */}
            <CostCard
              icon={<Wallet className="h-6 w-6" strokeWidth={2} style={{ color: "#8B8B7A" }} />}
              title="Spending money & tips"
              subtitle="Restaurants, drinks and the little extras"
              amountLabel="you decide"
              gradientFrom="#E8E5E0"
              gradientTo="#D8D5D0"
              darkText={true}
            >
              <p>
                Tamarindo is pretty card friendly, but it&apos;s best to have both USD and colones. USD works for larger purchases, but colones are better for small vendors and local services. Keep in mind you&apos;ll usually get your change back in colones even if you pay in USD. Bring whatever amount feels right for meals out, drinks, snacks, and souvenirs.
              </p>
            </CostCard>
          </div>
        </div>
      </section>
    </main>
  );
}
