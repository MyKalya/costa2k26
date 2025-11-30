"use client";

import { Home, Sailboat, Car, UtensilsCrossed, Palmtree, Wallet, Gift, Ticket } from "lucide-react";
import { clsx } from "clsx";

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
  children?: React.ReactNode;
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
  children 
}: CostCardProps) {
  const hasTwoLineAmount = depositNow && estimatedTotal;

  return (
    <div className={clsx("flex flex-col gap-4 rounded-2xl border shadow-sm p-4 sm:p-5", cardBgClass, cardBorderClass)}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex gap-4 flex-1 min-w-0">
          <div className={clsx("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full", iconBgClass)}>
            <div className={clsx(iconColorClass, "[&>svg]:h-5 [&>svg]:w-5")}>
              {icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            {subtitle && (
              <p className="text-sm text-slate-600 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {(amount || amountLabel || hasTwoLineAmount) && (
          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            {hasTwoLineAmount ? (
              <>
                {/* Deposit now */}
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                    Deposit now
                  </span>
                  <span className={clsx("text-2xl sm:text-3xl font-semibold", amountColorClass)}>
                    {depositNow}
                  </span>
                  {depositLabel && (
                    <span className={clsx("text-xs font-medium uppercase tracking-wide", amountLabelColorClass)}>
                      {depositLabel}
                    </span>
                  )}
                </div>
                {/* Estimated total */}
                <div className="flex flex-col items-end gap-0.5 mt-2 pt-2 border-t border-slate-300/50">
                  <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                    Estimated total
                  </span>
                  <span className={clsx("text-xl sm:text-2xl font-semibold", amountColorClass)}>
                    {estimatedTotal}
                  </span>
                  {estimatedLabel && (
                    <span className={clsx("text-[10px] font-medium uppercase tracking-wide leading-tight", amountLabelColorClass)}>
                      {estimatedLabel}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <>
                {amount && (
                  <span className={clsx("text-3xl sm:text-4xl font-semibold", amountColorClass)}>
                    {amount}
                  </span>
                )}
                {amountLabel && (
                  <span className={clsx("text-xs font-medium uppercase tracking-wide", amountLabelColorClass)}>
                    {amountLabel}
                  </span>
                )}
              </>
            )}
          </div>
        )}
      </div>
      {children && (
        <div className="text-sm text-slate-700 leading-relaxed pl-[56px] space-y-3">
          <div>{children}</div>
          {paymentInstructions && (
            <div className="pt-3 mt-3 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-900 uppercase tracking-wide mb-1.5">
                How to pay
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {paymentInstructions}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TripCostsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-xl px-4 py-10 sm:py-14">
        {/* Hero block */}
        <div className="space-y-4 mb-8">
          <p className="text-xs font-semibold tracking-wide uppercase text-slate-500">
            Costa2K26
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
            Trip costs overview
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            We want everyone to feel relaxed and in the loop, so here&apos;s a simple breakdown of what we&apos;re planning to spend for Costa2K26. Numbers may shift a little as we finalize vendors and headcount, but this should give you a clear picture.
          </p>
          <p className="text-xs text-slate-500 italic">
            This page will be updated as we send deposits and get final invoices.
          </p>
        </div>

        {/* What we're paying now */}
        <div className="mt-8 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              WHAT WE&apos;RE PAYING NOW
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              These are deposits we will actually ask you to send. Each tile shows what you pay now and an estimate of the total you can expect for that item.
            </p>
          </div>

          {/* Tile 1 - Airbnb */}
          <CostCard
            icon={<Home className="h-5 w-5" aria-hidden="true" />}
            title="Airbnb villas"
            subtitle="Initial deposit"
            depositNow="$450"
            depositLabel="per person"
            estimatedTotal="$250–$290"
            estimatedLabel="per person (we will update this range once numbers finalize)"
            paymentInstructions="Send e-transfer to m.gnanam31@gmail.com or Wealthsimple to $mathu."
            cardBgClass="bg-emerald-50"
            cardBorderClass="border-emerald-100"
            iconBgClass="bg-emerald-100"
            iconColorClass="text-emerald-800"
            amountColorClass="text-emerald-900"
            amountLabelColorClass="text-emerald-800"
          >
            <p>
              Our three villas in Hacienda Pinilla cost around <span className="font-semibold">$21,390</span> for the group. This first deposit secures our stay. We will update this page with your remaining share after the final host payment.
            </p>
          </CostCard>

          {/* Tile 2 - Catamaran */}
          <CostCard
            icon={<Sailboat className="h-5 w-5" aria-hidden="true" />}
            title="Catamaran party"
            subtitle="Private sunset cruise"
            depositNow="$100"
            depositLabel="per person"
            estimatedTotal="$150–$180"
            estimatedLabel="per person (includes deposit and final payment)"
            paymentInstructions="Send e-transfer to m.gnanam31@gmail.com or Wealthsimple to $mathu."
            cardBgClass="bg-teal-50"
            cardBorderClass="border-teal-100"
            iconBgClass="bg-teal-100"
            iconColorClass="text-teal-800"
            amountColorClass="text-teal-900"
            amountLabelColorClass="text-teal-800"
          >
            <p>
              This holds our private catamaran for the group. This first deposit secures our booking. Expect another amount later once we confirm final headcount and package.
            </p>
          </CostCard>
        </div>

        {/* What to plan for */}
        <div className="mt-8 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              WHAT TO PLAN FOR
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              These are costs we are still finalizing or that will be pay as you go. Use these numbers to budget. We will update this page as details lock in.
            </p>
          </div>

          {/* Tile 3 - Transport */}
          <CostCard
            icon={<Car className="h-5 w-5" aria-hidden="true" />}
            title="Transport & car rentals"
            subtitle="Getting between airport, villas and activities"
            amount="$100–$120"
            amountLabel="estimate per person"
            cardBgClass="bg-lime-50"
            cardBorderClass="border-lime-100"
            iconBgClass="bg-lime-100"
            iconColorClass="text-lime-800"
            amountColorClass="text-lime-900"
            amountLabelColorClass="text-lime-800"
          >
            <p>
              We will mix rental cars and ubers so people can get around without stress. Final cost depends on flight times and how many cars we end up needing.
            </p>
          </CostCard>

          {/* Tile 4 - Breakfasts */}
          <CostCard
            icon={<UtensilsCrossed className="h-5 w-5" aria-hidden="true" />}
            title="Group breakfasts"
            subtitle="Easy mornings at the villas"
            amount="$15–$25"
            amountLabel="per breakfast"
            cardBgClass="bg-amber-50"
            cardBorderClass="border-amber-100"
            iconBgClass="bg-amber-100"
            iconColorClass="text-amber-800"
            amountColorClass="text-amber-900"
            amountLabelColorClass="text-amber-800"
          >
            <p>
              We are looking at pre-arranged breakfasts on a few mornings so you can roll out of bed and go straight into coffee and food. Expect around $20 per breakfast at the villa. It will not be every day, and we will confirm which days closer to the trip.
            </p>
          </CostCard>

          {/* Tile 5 - Activities */}
          <CostCard
            icon={<Palmtree className="h-5 w-5" aria-hidden="true" />}
            title="Activities"
            subtitle="ATVs, beach clubs, spa time and more"
            amountLabel="Varies by activity"
            cardBgClass="bg-sky-50"
            cardBorderClass="border-sky-100"
            iconBgClass="bg-sky-100"
            iconColorClass="text-sky-800"
            amountColorClass="text-sky-900"
            amountLabelColorClass="text-sky-800"
          >
            <p>
              Think ATV tours, spa or massage time, surf lessons and whatever else the group is feeling. We will share a menu of options and pricing closer to the trip so you can pick what you are into.
            </p>
          </CostCard>

          {/* Tile 6 - Beach clubs, classes and entrance fees */}
          <CostCard
            icon={<Ticket className="h-5 w-5" aria-hidden="true" />}
            title="Beach clubs, classes and entrance fees"
            subtitle="Day passes, lessons and local spots"
            amount="$10–$50"
            amountLabel="per outing"
            cardBgClass="bg-rose-50"
            cardBorderClass="border-rose-100"
            iconBgClass="bg-rose-100"
            iconColorClass="text-rose-800"
            amountColorClass="text-rose-900"
            amountLabelColorClass="text-rose-800"
          >
            <p>
              Think beach club day beds, yoga classes, surf classes, waterfall or park entrance fees and similar little costs that pop up while we are in Costa Rica. Most of these are optional and pay as you go, but it helps to budget a bit of flexible cash for them.
            </p>
          </CostCard>

          {/* Tile 7 - Spending money */}
          <CostCard
            icon={<Wallet className="h-5 w-5" aria-hidden="true" />}
            title="Spending money and tips"
            subtitle="Restaurants, drinks and the little extras"
            amountLabel="You decide"
            cardBgClass="bg-sky-50"
            cardBorderClass="border-sky-100"
            iconBgClass="bg-sky-100"
            iconColorClass="text-sky-800"
            amountColorClass="text-sky-900"
            amountLabelColorClass="text-sky-800"
          >
            <p>
              Costa Rica is pretty card friendly, but it really helps to have some USD on hand for tips, small markets, taxis or parking and those random &quot;I need this&quot; moments. Think meals out, drinks, snacks and souvenirs.
            </p>
          </CostCard>

          {/* Tile 8 - Donation */}
          <CostCard
            icon={<Gift className="h-5 w-5" aria-hidden="true" />}
            title="Donate to the site creator"
            subtitle="Optional, unserious, but appreciated"
            amountLabel="BTC preferred"
            cardBgClass="bg-amber-100"
            cardBorderClass="border-amber-200"
            iconBgClass="bg-amber-200"
            iconColorClass="text-amber-800"
            amountColorClass="text-amber-900"
            amountLabelColorClass="text-amber-800"
          >
            <p>
              If you&apos;re enjoying this Costa2K26 site, feel free to donate to the creator — Bitcoin preferred. Or, if you&apos;re not into crypto, I&apos;ll accept <span className="font-semibold">one free flop in 2026</span> with zero questions asked.
            </p>
          </CostCard>
        </div>
      </section>
    </main>
  );
}

