"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Home, Sailboat, Car, UtensilsCrossed, Palmtree, Wallet, Gift, Ticket, ChevronDown, ChevronUp, CreditCard, Check, Copy } from "lucide-react";
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
        "group relative overflow-hidden rounded-2xl border shadow-lg backdrop-blur-sm transition-all duration-300",
        isDeposit ? "p-4 sm:p-5" : "p-4 sm:p-5",
        cardBorderClass
      )}
      style={{
        background: gradientFrom && gradientTo
          ? `linear-gradient(135deg, ${gradientFrom}15, ${gradientTo}10)`
          : undefined,
        backgroundColor: !gradientFrom ? undefined : "transparent",
      }}
    >
      {/* Caustics texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url('/textures/caustics.webp')",
          backgroundSize: "160% 160%",
          backgroundPosition: "center",
          mixBlendMode: "screen",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
          <div className="flex gap-3 flex-1 min-w-0">
            {/* Icon with glass morphism */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className={clsx(
                "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl shadow-lg backdrop-blur-sm border border-white/20",
                iconBgClass
              )}
              style={{
                backgroundColor: gradientFrom ? `${gradientFrom}20` : undefined,
              }}
            >
              <div className={clsx(iconColorClass, "[&>svg]:h-5 [&>svg]:w-5")}>
                {icon}
              </div>
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-slate-900 mb-0.5">{title}</h3>
              {subtitle && (
                <p className="text-sm text-slate-600 font-medium mb-2">{subtitle}</p>
              )}
              {/* Estimated total - placed under subtitle to fill space */}
              {hasTwoLineAmount && estimatedTotal && (
                <div className="flex flex-col gap-0.5 mt-2">
                  <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">
                    Estimated total
                  </span>
                  <span className={clsx("text-base sm:text-lg font-semibold text-slate-500", amountColorClass)}>
                    {estimatedTotal}
                  </span>
                  {estimatedLabel && (
                    <span className={clsx("text-[9px] font-normal uppercase tracking-wide leading-tight text-slate-400", amountLabelColorClass)}>
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
                  <div className="flex flex-col items-end gap-0.5 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/40 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Deposit now
                    </span>
                    <span className={clsx("text-3xl sm:text-4xl font-bold", amountColorClass)}>
                      {depositNow}
                    </span>
                    {depositLabel && (
                      <span className={clsx("text-[10px] font-semibold uppercase tracking-wide", amountLabelColorClass)}>
                        {depositLabel}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {amount && (
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/40 shadow-sm">
                      <span className={clsx("text-2xl sm:text-3xl font-bold block", amountColorClass)}>
                        {amount}
                      </span>
                    </div>
                  )}
                  {amountLabel && (
                    <span className={clsx("text-[10px] font-semibold uppercase tracking-wide mt-1", amountLabelColorClass)}>
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
          <div className="text-sm text-slate-700 leading-relaxed space-y-2.5 pl-[60px]">
            <div>{children}</div>
            
            {/* Payment instructions - collapsible */}
            {paymentInstructions && (
              <div className="pt-2 mt-2 border-t border-slate-200/60">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1.5 w-full text-left group/payment"
                >
                  <CreditCard className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    How to pay
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-3.5 w-3.5 text-slate-500 ml-auto transition-transform" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 text-slate-500 ml-auto transition-transform" />
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
                      className="flex items-start gap-2 text-xs text-slate-700 hover:text-slate-900 transition-colors w-full text-left group/item"
                    >
                      {copied === "email" ? (
                        <Check className="h-3.5 w-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-slate-400 group-hover/item:text-slate-600 flex-shrink-0 mt-0.5 transition-colors" />
                      )}
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono">m.gnanam31@gmail.com</span>
                        <span className="text-[10px] text-slate-500">Interac e-transfer</span>
                      </div>
                    </button>
                    <button
                      onClick={() => handleCopy("$mathu", "mathu")}
                      className="flex items-start gap-2 text-xs text-slate-700 hover:text-slate-900 transition-colors w-full text-left group/item"
                    >
                      {copied === "mathu" ? (
                        <Check className="h-3.5 w-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-slate-400 group-hover/item:text-slate-600 flex-shrink-0 mt-0.5 transition-colors" />
                      )}
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono">$mathu</span>
                        <span className="text-[10px] text-slate-500">Wealthsimple</span>
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
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const section1InView = useInView(section1Ref, { once: true, margin: "-100px" });
  const section2InView = useInView(section2Ref, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
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
            {/* Eyebrow */}
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] opacity-90 drop-shadow-md">
              Costa2K26
            </p>

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
        {/* Section 1: What we're paying now */}
        <div ref={section1Ref} className="mb-12">
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
            {/* Airbnb Villas */}
            <CostCard
              icon={<Home className="h-6 w-6" aria-hidden="true" />}
              title="Airbnb villas"
              subtitle="Initial deposit"
              depositNow="$450"
              depositLabel="per person"
              estimatedTotal="$650–$680"
              estimatedLabel="per person (we will update this range)"
              paymentInstructions="Send e-transfer to m.gnanam31@gmail.com or Wealthsimple to $mathu."
              gradientFrom="#10B981"
              gradientTo="#059669"
              iconBgClass="bg-emerald-100"
              iconColorClass="text-emerald-700"
              amountColorClass="text-emerald-900"
              amountLabelColorClass="text-emerald-800"
              isDeposit={true}
            >
              <p>
                Our three villas in Hacienda Pinilla cost <span className="font-bold text-emerald-900">$21,390</span> for the group. This first deposit secures our stay. We will update this page with your remaining share after the final host payment.
              </p>
            </CostCard>

            {/* Catamaran Party */}
            <CostCard
              icon={<Sailboat className="h-6 w-6" aria-hidden="true" />}
              title="Catamaran party"
              subtitle="Private sunset cruise"
              depositNow="$100"
              depositLabel="per person"
              estimatedTotal="$150–$180"
              estimatedLabel="per person (includes deposit + final payment)"
              paymentInstructions="Send e-transfer to m.gnanam31@gmail.com or Wealthsimple to $mathu."
              gradientFrom="#14B8A6"
              gradientTo="#0D9488"
              iconBgClass="bg-teal-100"
              iconColorClass="text-teal-700"
              amountColorClass="text-teal-900"
              amountLabelColorClass="text-teal-800"
              isDeposit={true}
            >
              <p>
                This holds our private catamaran for the group. Expect another <span className="font-bold text-teal-900">$50–$80 per person</span> once we confirm final headcount and package.
              </p>
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
                What to plan for
              </h2>
              <span className="px-3 py-1 text-xs font-bold text-amber-700 bg-amber-100 rounded-full border border-amber-200">
                ESTIMATES
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed ml-11">
              Budget for these costs—some are still being finalized.
            </p>
          </motion.div>

          <div className="space-y-4">
            {/* Transport */}
            <CostCard
              icon={<Car className="h-6 w-6" aria-hidden="true" />}
              title="Transport & car rentals"
              subtitle="Getting between airport, villas and activities"
              amount="$100–$120"
              amountLabel="estimate per person"
              gradientFrom="#84CC16"
              gradientTo="#65A30D"
              iconBgClass="bg-lime-100"
              iconColorClass="text-lime-700"
              amountColorClass="text-lime-900"
              amountLabelColorClass="text-lime-800"
            >
              <p>
                We&apos;ll mix rental cars and group transport so people can get around without stress. Final cost depends on flight times and how many cars we end up needing.
              </p>
            </CostCard>

            {/* Group Breakfasts */}
            <CostCard
              icon={<UtensilsCrossed className="h-6 w-6" aria-hidden="true" />}
              title="Group breakfasts"
              subtitle="Easy mornings at the villas"
              amount="$15–$25"
              amountLabel="per breakfast"
              gradientFrom="#F59E0B"
              gradientTo="#D97706"
              iconBgClass="bg-amber-100"
              iconColorClass="text-amber-700"
              amountColorClass="text-amber-900"
              amountLabelColorClass="text-amber-800"
            >
              <p>
                We&apos;re exploring pre arranged family style breakfasts to make mornings easier. Food spots aren&apos;t within walking distance, so this helps everyone start the day with a good meal, coffee, and no hassle before we head out.
              </p>
            </CostCard>

            {/* Activities */}
            <CostCard
              icon={<Palmtree className="h-6 w-6" aria-hidden="true" />}
              title="Activities"
              subtitle="ATVs, beach clubs, spa time & more"
              amountLabel="varies by activity"
              gradientFrom="#0EA5E9"
              gradientTo="#0284C7"
              iconBgClass="bg-sky-100"
              iconColorClass="text-sky-700"
              amountColorClass="text-sky-900"
              amountLabelColorClass="text-sky-800"
            >
              <p>
                Think ATV tours, chasing waterfalls, hot springs, water activities, surf lessons, spa/massage time and whatever else the group is feeling. We&apos;ll share the activity list and pricing soon so you can choose what you&apos;re into.
              </p>
            </CostCard>

            {/* Beach clubs, classes & entrance fees */}
            <CostCard
              icon={<Ticket className="h-6 w-6" aria-hidden="true" />}
              title="Beach clubs, classes & entrance fees"
              subtitle="Day passes, lessons and local spots"
              amount="$10–$50"
              amountLabel="per outing"
              gradientFrom="#F43F5E"
              gradientTo="#E11D48"
              iconBgClass="bg-rose-100"
              iconColorClass="text-rose-700"
              amountColorClass="text-rose-900"
              amountLabelColorClass="text-rose-800"
            >
              <p>
                Think beach club day beds, yoga or fitness classes, surf classes, waterfall or park entrance fees and other small things that pop up while we&apos;re in Costa Rica. Most of these are optional and pay as you go.
              </p>
            </CostCard>

            {/* Spending Money */}
            <CostCard
              icon={<Wallet className="h-6 w-6" aria-hidden="true" />}
              title="Spending money & tips"
              subtitle="Restaurants, drinks and the little extras"
              amountLabel="you decide"
              gradientFrom="#0EA5E9"
              gradientTo="#0284C7"
              iconBgClass="bg-sky-100"
              iconColorClass="text-sky-700"
              amountColorClass="text-sky-900"
              amountLabelColorClass="text-sky-800"
            >
              <p>
                Tamarindo is pretty card friendly, but it&apos;s best to have both USD and colones. USD works for larger purchases, but colones are better for small vendors and local services. Keep in mind you&apos;ll usually get your change back in colones even if you pay in USD. Bring whatever amount feels right for meals out, drinks, snacks, and souvenirs.
              </p>
            </CostCard>

            {/* Donation */}
            <CostCard
              icon={<Gift className="h-6 w-6" aria-hidden="true" />}
              title="Donate to the site creator"
              subtitle="Optional, unserious, but appreciated"
              amountLabel="BTC preferred"
              gradientFrom="#F59E0B"
              gradientTo="#D97706"
              iconBgClass="bg-amber-200"
              iconColorClass="text-amber-800"
              amountColorClass="text-amber-900"
              amountLabelColorClass="text-amber-800"
            >
              <p>
                If you&apos;re enjoying this site, feel free to donate to the creators. Bitcoin preferred. Or, if you&apos;re not into crypto, we&apos;ll accept <span className="font-bold text-amber-900">one free flop in 2026</span> with zero questions asked ;).
              </p>
            </CostCard>
          </div>
        </div>
      </section>
    </main>
  );
}
