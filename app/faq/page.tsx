"use client";

import { Home, Sailboat, Car, UtensilsCrossed, Palmtree, Wallet, Gift } from "lucide-react";
import { clsx } from "clsx";

type CostCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  amount?: string;
  amountLabel?: string;
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
  cardBgClass = "bg-emerald-50",
  cardBorderClass = "border-emerald-100",
  iconBgClass = "bg-emerald-100",
  iconColorClass = "text-emerald-800",
  amountColorClass = "text-emerald-900",
  amountLabelColorClass = "text-emerald-800",
  children 
}: CostCardProps) {
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
        {(amount || amountLabel) && (
          <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
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
          </div>
        )}
      </div>
      {children && (
        <div className="text-sm text-slate-700 leading-relaxed pl-[56px]">
          {children}
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
              What we&apos;re paying now
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              This section covers amounts we will actually ask you to send.
            </p>
          </div>

          {/* Tile 1 - Airbnb */}
          <CostCard
            icon={<Home className="h-5 w-5" aria-hidden="true" />}
            title="Airbnb villas"
            subtitle="Initial deposit"
            amount="$450"
            amountLabel="per person"
            cardBgClass="bg-emerald-50"
            cardBorderClass="border-emerald-100"
            iconBgClass="bg-emerald-100"
            iconColorClass="text-emerald-800"
            amountColorClass="text-emerald-900"
            amountLabelColorClass="text-emerald-800"
          >
            <p>
              Our three villas in Hacienda Pinilla cost <span className="font-semibold">$21,390</span> for the group. This first deposit secures our stay. We will update this page with your remaining share after the final host payment.
            </p>
          </CostCard>

          {/* Tile 2 - Catamaran */}
          <CostCard
            icon={<Sailboat className="h-5 w-5" aria-hidden="true" />}
            title="Catamaran party"
            subtitle="Private sunset cruise"
            amount="$100"
            amountLabel="deposit per person"
            cardBgClass="bg-teal-50"
            cardBorderClass="border-teal-100"
            iconBgClass="bg-teal-100"
            iconColorClass="text-teal-800"
            amountColorClass="text-teal-900"
            amountLabelColorClass="text-teal-800"
          >
            <p>
              This holds our private catamaran for the group. Expect another <span className="font-semibold">$50–$80 per person</span> once we confirm final headcount and package.
            </p>
          </CostCard>
        </div>

        {/* What to plan for */}
        <div className="mt-8 space-y-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            What to plan for
          </h2>

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
              We&apos;ll mix rental cars and group transport so people can get around without stress. Final cost depends on flight times and how many cars we end up needing.
            </p>
          </CostCard>

          {/* Tile 4 - Breakfasts */}
          <CostCard
            icon={<UtensilsCrossed className="h-5 w-5" aria-hidden="true" />}
            title="Group breakfasts"
            subtitle="Easy mornings at the villas"
            amount="$60–$100"
            amountLabel="estimate per person"
            cardBgClass="bg-amber-50"
            cardBorderClass="border-amber-100"
            iconBgClass="bg-amber-100"
            iconColorClass="text-amber-800"
            amountColorClass="text-amber-900"
            amountLabelColorClass="text-amber-800"
          >
            <p>
              We&apos;re looking at pre-arranged breakfasts so you can roll out of bed and straight into coffee and food. Range depends on the vendor and menu we lock in.
            </p>
          </CostCard>

          {/* Tile 5 - Activities */}
          <CostCard
            icon={<Palmtree className="h-5 w-5" aria-hidden="true" />}
            title="Activities"
            subtitle="ATVs, beach clubs, spa time & more"
            amountLabel="varies by activity"
            cardBgClass="bg-sky-50"
            cardBorderClass="border-sky-100"
            iconBgClass="bg-sky-100"
            iconColorClass="text-sky-800"
            amountColorClass="text-sky-900"
            amountLabelColorClass="text-sky-800"
          >
            <p>
              Think ATV tours, beach clubs, spa/massage time, surf lessons and whatever else the group is feeling. We&apos;ll share a menu of options and pricing closer to the trip so you can pick what you&apos;re into.
            </p>
          </CostCard>

          {/* Tile 6 - Spending money */}
          <CostCard
            icon={<Wallet className="h-5 w-5" aria-hidden="true" />}
            title="Spending money & tips"
            subtitle="Restaurants, drinks and the little extras"
            amountLabel="you decide"
            cardBgClass="bg-sky-50"
            cardBorderClass="border-sky-100"
            iconBgClass="bg-sky-100"
            iconColorClass="text-sky-800"
            amountColorClass="text-sky-900"
            amountLabelColorClass="text-sky-800"
          >
            <p>
              Costa Rica is pretty card-friendly, but it really helps to have some USD on hand for tips, small markets, taxis/parking and those random &quot;I need this&quot; moments. Bring whatever feels right for you. Think meals out, drinks, snacks and souvenirs.
            </p>
          </CostCard>

          {/* Tile 7 - Donation */}
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
              If you&apos;re enjoying this Costa2K26 site, feel free to donate to the creator. Bitcoin preferred. Or, if you&apos;re not into crypto, I&apos;ll accept <span className="font-semibold">one free flop in 2026</span> with zero questions asked.
            </p>
          </CostCard>
        </div>
      </section>
    </main>
  );
}
