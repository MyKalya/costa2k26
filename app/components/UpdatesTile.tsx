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
      {/* Gold pulsing glow halo - like unread notification */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-amber-400/25 via-yellow-400/20 to-amber-500/25 blur-xl opacity-60 animate-pulse" />

      <Link
        href="/updates"
        className="flex items-center gap-3 rounded-2xl border border-amber-300/40 bg-white/60 px-4 py-3 shadow-sm shadow-emerald-900/10 backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-md hover:border-amber-300/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50/80 text-amber-600">
          <Bell className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="absolute -top-0.5 -right-0.5 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-500">
            <span className="h-1 w-1 rounded-full bg-emerald-100" />
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
            Trip updates
          </div>
          <div className="text-xs text-slate-600">
            Tap to see what we need from you
          </div>
        </div>
      </Link>
    </div>
  );
}

