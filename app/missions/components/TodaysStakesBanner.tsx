"use client";

import { Gift, AlertTriangle } from "lucide-react";

interface TodaysStakesBannerProps {
  currentDay: number;
  rewardText: string;
  consequenceText: string;
  loading?: boolean;
}

export function TodaysStakesBanner({
  currentDay,
  rewardText,
  consequenceText,
  loading,
}: TodaysStakesBannerProps) {
  if (loading) {
    return (
      <div className="mb-6 rounded-2xl border-2 border-[#F3B44C]/40 bg-[#0E3D2F]/80 p-4">
        <p className="text-sm text-white/70">Loading today&apos;s stakes…</p>
      </div>
    );
  }

  const hasReward = rewardText.trim().length > 0;
  const hasConsequence = consequenceText.trim().length > 0;
  if (!hasReward && !hasConsequence) {
    return (
      <div className="mb-6 rounded-2xl border-2 border-white/20 bg-white/5 p-4">
        <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-white/90">
          Today&apos;s Stakes — Day {currentDay}
        </h3>
        <p className="text-sm text-white/60">No reward or consequence set for today yet.</p>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-2xl border-2 border-[#F3B44C]/50 bg-[#0E3D2F]/90 p-4 shadow-lg">
      <h3 className="mb-3 text-center text-sm font-bold uppercase tracking-wide text-[#F3B44C]">
        Today&apos;s Stakes — Day {currentDay}
      </h3>
      <div className="space-y-3">
        {hasReward && (
          <div className="flex gap-2 rounded-xl bg-green-500/20 p-3">
            <Gift className="h-5 w-5 shrink-0 text-green-400" aria-hidden />
            <div>
              <p className="text-xs font-semibold uppercase text-green-300">Complete all missions today</p>
              <p className="mt-0.5 text-sm text-white">{rewardText}</p>
            </div>
          </div>
        )}
        {hasConsequence && (
          <div className="flex gap-2 rounded-xl bg-red-500/20 p-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-red-400" aria-hidden />
            <div>
              <p className="text-xs font-semibold uppercase text-red-300">Complete none today</p>
              <p className="mt-0.5 text-sm text-white">{consequenceText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
