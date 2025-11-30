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
      {/* Glow halo */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-amber-400/30 via-yellow-300/25 to-emerald-400/30 blur-xl opacity-70 animate-pulse" />

      <Link
        href="/updates"
        className="flex items-center gap-3 rounded-2xl border border-amber-300/70 bg-white/95 px-4 py-3 shadow-md shadow-emerald-900/20 backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:border-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <Bell className="h-4 w-4" aria-hidden="true" />
          <span className="absolute -top-1 -right-1 inline-flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-100" />
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
            Trip updates
          </div>
          <div className="text-sm font-medium text-slate-900">
            You have important Costa2K26 info
          </div>
          <div className="text-xs text-slate-500">
            Tap to see what we need from you
          </div>
        </div>
      </Link>
    </div>
  );
}

