"use client";

import { Home, Sailboat, Car, UtensilsCrossed, Palmtree, Wallet, Gift } from "lucide-react";
import { clsx } from "clsx";

type CostCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  amount?: string;
  amountNote?: string;
  badge?: string;
  bgClass?: string;
  iconColorClass?: string;
  children?: React.ReactNode;
};

function CostCard({ icon, title, subtitle, amount, amountNote, badge, bgClass = "bg-emerald-50", iconColorClass = "text-emerald-800", children }: CostCardProps) {
  const borderClass = bgClass === "bg-amber-50" ? "border-amber-200" : "border-slate-200";
  const iconBgClass = bgClass === "bg-amber-50" ? "bg-amber-100" : bgClass;
  
  return (
    <div className={clsx("flex flex-col gap-3 rounded-2xl border bg-white/80 shadow-sm p-4 sm:p-5", borderClass)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3 flex-1 min-w-0">
          <div className={clsx("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full", iconBgClass)}>
            <div className={clsx(iconColorClass, "[&>svg]:h-5 [&>svg]:w-5")}>
              {icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-semibold text-slate-900">{title}</h3>
              {badge && (
                <span className="text-xs font-medium text-slate-500">{badge}</span>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-slate-600 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 text-right">
          {amount && (
            <p className="text-lg font-semibold text-emerald-800">{amount}</p>
          )}
          {amountNote && (
            <p className="text-xs text-slate-500 mt-0.5">{amountNote}</p>
          )}
        </div>
      </div>
      {children && (
        <div className="text-sm text-slate-600 leading-relaxed pl-[52px]">
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
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            What we&apos;re paying now
          </h2>

          {/* Tile 1 - Airbnb */}
          <CostCard
            icon={<Home className="h-5 w-5" aria-hidden="true" />}
            title="Airbnb villas"
            subtitle="Initial deposit"
            amount="$450"
            badge="per person"
            bgClass="bg-emerald-50"
            iconColorClass="text-emerald-800"
          >
            <p>
              Our three villas in Hacienda Pinilla come to a total of <span className="font-medium">$21,390</span> for the group. This first deposit secures our stay. Once we send the second and final deposit to the hosts, we&apos;ll share the remaining amount per person.
            </p>
          </CostCard>

          {/* Tile 2 - Catamaran */}
          <CostCard
            icon={<Sailboat className="h-5 w-5" aria-hidden="true" />}
            title="Catamaran party"
            subtitle="Private sunset cruise"
            amount="$100"
            amountNote="deposit per person"
            bgClass="bg-teal-50"
            iconColorClass="text-teal-800"
          >
            <p>
              This holds our private catamaran for the group. Expect another <span className="font-medium">$50–$80 per person</span> once we lock our final headcount and package. We&apos;ll confirm the exact total before anything else is due.
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
            amountNote="estimate per person"
            bgClass="bg-lime-50"
            iconColorClass="text-lime-800"
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
            amountNote="estimate per person"
            bgClass="bg-amber-50"
            iconColorClass="text-amber-800"
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
            amountNote="varies by activity"
            bgClass="bg-sky-50"
            iconColorClass="text-sky-800"
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
            amountNote="you decide"
            bgClass="bg-slate-50"
            iconColorClass="text-slate-800"
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
            amountNote="BTC preferred"
            bgClass="bg-amber-50"
            iconColorClass="text-amber-700"
          >
            <p>
              If you&apos;re enjoying this Costa2K26 site, feel free to donate to the creator. Bitcoin preferred. Or, if you&apos;re not into crypto, I&apos;ll accept one free flop in 2026 with zero questions asked.
            </p>
          </CostCard>
        </div>
      </section>
    </main>
  );
}
