"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Copy, DollarSign } from "lucide-react";
import { clsx } from "clsx";
import { PARTICIPANTS, DAY_CONFIGS, getExpenseValue, type Participant } from "./data";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(n));

function DayCard({
  label,
  date,
  gradientFrom,
  gradientTo,
  items,
  participant,
  index,
}: {
  label: string;
  date: string;
  gradientFrom: string;
  gradientTo: string;
  items: { key: string; label: string }[];
  participant: Participant;
  index: number;
}) {
  const visibleItems = items
    .map((item) => ({ ...item, amount: getExpenseValue(participant, item.key) }))
    .filter((item) => item.amount !== 0);

  if (visibleItems.length === 0) return null;

  const dayTotal = visibleItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
      style={{ background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
    >
      {/* Day header */}
      <div className="px-5 pt-5 pb-3 flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/50">{date}</span>
          <h3 className="text-base font-bold text-white">{label}</h3>
        </div>
        <span className={clsx("text-sm font-semibold tabular-nums", dayTotal < 0 ? "text-emerald-300" : "text-white/80")}>
          {dayTotal < 0 ? `−${fmt(dayTotal)}` : fmt(dayTotal)}
        </span>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-white/15" />

      {/* Line items */}
      <div className="px-5 py-3 space-y-0">
        {visibleItems.map((item, i) => (
          <div
            key={item.key}
            className={clsx(
              "flex items-center justify-between py-2.5 gap-3",
              i < visibleItems.length - 1 && "border-b border-white/10"
            )}
          >
            <span className="text-sm text-white/85 leading-tight">{item.label}</span>
            <span
              className={clsx(
                "text-sm font-semibold tabular-nums flex-shrink-0",
                item.amount < 0 ? "text-emerald-300" : "text-white"
              )}
            >
              {item.amount < 0 ? `−${fmt(item.amount)}` : fmt(item.amount)}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function PaymentInfo() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">How to pay</p>
      <div className="space-y-2">
        <button
          onClick={() => handleCopy("m.gnanam31@gmail.com", "email")}
          className="flex items-center gap-3 w-full text-left group"
        >
          {copied === "email" ? (
            <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
          ) : (
            <Copy className="h-4 w-4 text-slate-400 group-hover:text-slate-600 flex-shrink-0 transition-colors" />
          )}
          <div>
            <p className="text-sm font-mono text-slate-800">m.gnanam31@gmail.com</p>
            <p className="text-xs text-slate-500">Interac e-Transfer</p>
          </div>
        </button>
        <button
          onClick={() => handleCopy("$mathu", "mathu")}
          className="flex items-center gap-3 w-full text-left group"
        >
          {copied === "mathu" ? (
            <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
          ) : (
            <Copy className="h-4 w-4 text-slate-400 group-hover:text-slate-600 flex-shrink-0 transition-colors" />
          )}
          <div>
            <p className="text-sm font-mono text-slate-800">$mathu</p>
            <p className="text-xs text-slate-500">Wealthsimple</p>
          </div>
        </button>
      </div>
      <p className="mt-4 text-xs text-slate-500 leading-relaxed">
        Questions about your amount?{" "}
        <span className="font-medium text-slate-700">Message Mathushan.</span>
      </p>
    </motion.div>
  );
}

export default function FinalAmountsPage() {
  const [selected, setSelected] = useState<Participant | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const breakdownRef = useRef<HTMLDivElement>(null);

  const sorted = [...PARTICIPANTS].sort((a, b) => a.name.localeCompare(b.name));

  const handleSelect = (p: Participant) => {
    setSelected(p);
    setDropdownOpen(false);
    setTimeout(() => {
      breakdownRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative flex min-h-[44vh] w-full items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/drbh1hki1/image/upload/v1764280464/palm-background_pkve1s.png')",
            backgroundColor: "#0E3D2F",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-20 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="mb-4 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
              Costa Rica 2026
            </span>
            <h1 className="mb-3 font-display text-4xl font-bold drop-shadow-md sm:text-5xl">
              Final Amounts
            </h1>
            <p className="text-base text-white/80 sm:text-lg">
              Select your name to see your complete expense breakdown
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">

        {/* Name selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Select your name
          </label>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              className={clsx(
                "flex w-full items-center justify-between rounded-2xl border bg-white px-5 py-4 text-left shadow-sm transition-all duration-200",
                dropdownOpen
                  ? "border-[#0E3D2F] ring-2 ring-[#0E3D2F]/20"
                  : "border-slate-200 hover:border-slate-300"
              )}
            >
              <span
                className={clsx(
                  "text-base font-medium",
                  selected ? "text-slate-900" : "text-slate-400"
                )}
              >
                {selected ? selected.name : "Choose a name…"}
              </span>
              <ChevronDown
                className={clsx(
                  "h-5 w-5 text-slate-400 transition-transform duration-200",
                  dropdownOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  role="listbox"
                  initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  style={{ transformOrigin: "top" }}
                  className="absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white py-2 shadow-xl"
                >
                  {sorted.map((participant) => (
                    <li key={participant.name}>
                      <button
                        role="option"
                        aria-selected={selected?.name === participant.name}
                        onClick={() => handleSelect(participant)}
                        className={clsx(
                          "flex w-full items-center justify-between px-5 py-3 text-left text-sm transition-colors",
                          selected?.name === participant.name
                            ? "bg-[#0E3D2F]/8 font-semibold text-[#0E3D2F]"
                            : "text-slate-700 hover:bg-slate-50"
                        )}
                      >
                        <span>{participant.name}</span>
                        <span className="tabular-nums text-slate-500">{fmt(participant.totalOwed)}</span>
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Breakdown */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.name}
              ref={breakdownRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Total amount card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mb-6 overflow-hidden rounded-3xl shadow-[0_6px_30px_rgba(14,61,47,0.35)]"
                style={{ background: "linear-gradient(135deg, #0E3D2F 0%, #1C5A47 60%, #1C736A 100%)" }}
              >
                <div className="px-6 py-7 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/55 mb-1">
                      Total Amount Owed
                    </p>
                    <p className="font-display text-5xl font-bold text-white tabular-nums sm:text-6xl">
                      {fmt(selected.totalOwed)}
                    </p>
                    <p className="mt-1.5 text-sm text-white/65">
                      {selected.name} · Costa Rica 2026
                    </p>
                  </div>
                  <div className="flex-shrink-0 rounded-2xl bg-white/15 p-4 backdrop-blur-sm border border-white/20">
                    <DollarSign className="h-7 w-7 text-white/80" />
                  </div>
                </div>
              </motion.div>

              {/* Day breakdown header */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mb-4 flex items-center gap-3"
              >
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Expense Breakdown
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </motion.div>

              {/* Day cards */}
              <div className="space-y-3 mb-8">
                {DAY_CONFIGS.map((day, i) => (
                  <DayCard
                    key={day.label}
                    {...day}
                    participant={selected}
                    index={i}
                  />
                ))}
              </div>

              {/* Payment instructions */}
              <PaymentInfo />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 py-16 px-6 text-center"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <DollarSign className="h-7 w-7 text-slate-400" />
            </div>
            <p className="text-base font-semibold text-slate-600">Select your name above</p>
            <p className="mt-1 text-sm text-slate-400">
              Your full expense breakdown will appear here
            </p>
          </motion.div>
        )}
      </section>
    </main>
  );
}
