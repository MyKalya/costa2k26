"use client";

import { useMissions } from "../hooks/useMissions";
import { useStakes } from "../hooks/useStakes";
import { TodaysStakesBanner } from "./TodaysStakesBanner";
import { CheckCircle2, AlertCircle, MinusCircle } from "lucide-react";

type TodayStatus = "all" | "some" | "none" | "no-missions";

function getTodayStatus(
  playerId: string,
  todayStatsByPlayer: Record<string, { total: number; completed: number }>
): TodayStatus {
  const stats = todayStatsByPlayer[playerId];
  if (!stats || stats.total === 0) return "no-missions";
  if (stats.completed === stats.total) return "all";
  if (stats.completed === 0) return "none";
  return "some";
}

export function LeaderboardView({ playerId }: { playerId: string | null }) {
  const { currentPlayer, playersWithPoints } = useMissions(playerId);
  const { currentDay, rewardText, consequenceText, todayStatsByPlayer, stakesLoading } = useStakes();

  const sorted = [...playersWithPoints].sort((a, b) => b.points - a.points);

  return (
    <div className="mx-auto max-w-lg px-4 pb-28 pt-6">
      <h2 className="mb-4 text-2xl font-bold text-white">Leaderboard</h2>

      <TodaysStakesBanner
        currentDay={currentDay}
        rewardText={rewardText}
        consequenceText={consequenceText}
        loading={stakesLoading}
      />

      <div className="space-y-2">
        {sorted.map((p, i) => {
          const isYou = currentPlayer?.id === p.id;
          const top3 = i < 3;
          const todayStatus = getTodayStatus(p.id, todayStatsByPlayer);
          const statusStyles = {
            all: "border-l-4 border-green-500 bg-green-500/10",
            some: "border-l-4 border-amber-500 bg-amber-500/5",
            none: "border-l-4 border-red-500 bg-red-500/10",
            "no-missions": "",
          };
          const rowClass = [
            "flex items-center justify-between rounded-xl px-4 py-3",
            isYou ? "bg-[#F3B44C]/30 ring-2 ring-[#F3B44C]" : "bg-white/10",
            statusStyles[todayStatus],
          ].join(" ");

          return (
            <div key={p.id} className={rowClass}>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
                  {top3 ? ["🥇", "🥈", "🥉"][i] : i + 1}
                </span>
                <div className="flex items-center gap-2">
                  <TodayStatusIcon status={todayStatus} />
                  <div>
                    <p className="font-semibold text-white">
                      {p.first_name} {p.name.split(" ").slice(1).join(" ")}
                      {isYou && (
                        <span className="ml-1 text-sm text-[#F3B44C]">(you)</span>
                      )}
                    </p>
                    <p className="text-xs text-white/70">
                      {p.room}
                      {todayStatus !== "no-missions" && (
                        <span className="ml-1">
                          — {todayStatus === "all" && "All done today"}
                          {todayStatus === "some" && "In progress today"}
                          {todayStatus === "none" && "None done today"}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <span className="text-lg font-bold text-[#F3B44C]">{p.points} pts</span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl bg-white/10 p-4 text-sm text-white/90">
        <p className="font-semibold text-white">Overall</p>
        <p className="mt-1 text-white/80">
          Points and rankings are for bragging rights. Today&apos;s stakes above are the main motivator.
        </p>
      </div>
    </div>
  );
}

function TodayStatusIcon({ status }: { status: TodayStatus }) {
  const className = "h-5 w-5 shrink-0";
  if (status === "all") return <CheckCircle2 className={`${className} text-green-400`} aria-label="All missions done today" />;
  if (status === "some") return <AlertCircle className={`${className} text-amber-400`} aria-label="Some missions done today" />;
  if (status === "none") return <MinusCircle className={`${className} text-red-400`} aria-label="No missions done today" />;
  return null;
}
