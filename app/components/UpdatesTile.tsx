"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import React from "react";
import clsx from "clsx";

type UpdatesTileProps = {
  className?: string;
};

export function UpdatesTile({ className }: UpdatesTileProps) {
  return (
    <div className={clsx("relative", className)}>
      {/* Gold pulsing glow halo - strong live notification effect */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-amber-400/40 via-yellow-400/35 to-amber-500/40 blur-xl opacity-80 animate-pulse" />
      {/* Additional outer glow ring */}
      <div className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-gradient-to-r from-amber-300/30 via-yellow-300/25 to-amber-400/30 blur-2xl opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }} />

      <Link
        href="/updates"
        className="flex items-center gap-2.5 rounded-full border border-amber-300/40 bg-white/60 px-3 py-2 shadow-sm shadow-emerald-900/10 backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-md hover:border-amber-300/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50/80 text-amber-600 flex-shrink-0">
          <Bell className="h-3 w-3" aria-hidden="true" />
          <span className="absolute -top-0.5 -right-0.5 inline-flex h-2 w-2 items-center justify-center rounded-full bg-emerald-500">
            <span className="h-1 w-1 rounded-full bg-emerald-100" />
          </span>
        </div>

        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-600 leading-tight">
            Trip updates
          </div>
          <div className="text-[10px] text-slate-600 leading-tight">
            Tap to see what we need from you
          </div>
        </div>
      </Link>
    </div>
  );
}

