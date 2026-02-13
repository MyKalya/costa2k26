"use client";

import { useMissions } from "../hooks/useMissions";

export function LeaderboardView({ playerId }: { playerId: string | null }) {
  const { currentPlayer, playersWithPoints } = useMissions(playerId);

  const sorted = [...playersWithPoints].sort((a, b) => b.points - a.points);

  return (
    <div className="mx-auto max-w-lg px-4 pb-28 pt-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Leaderboard</h2>

      <div className="space-y-2">
        {sorted.map((p, i) => {
          const isYou = currentPlayer?.id === p.id;
          const top3 = i < 3;
          return (
            <div
              key={p.id}
              className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                isYou ? "bg-[#F3B44C]/30 ring-2 ring-[#F3B44C]" : "bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
                  {top3 ? ["🥇", "🥈", "🥉"][i] : i + 1}
                </span>
                <div>
                  <p className="font-semibold text-white">
                    {p.first_name}{" "}
                    {p.name.split(" ").slice(1).join(" ")}
                    {isYou && (
                      <span className="ml-1 text-sm text-[#F3B44C]">(you)</span>
                    )}
                  </p>
                  <p className="text-xs text-white/70">{p.room}</p>
                </div>
              </div>
              <span className="text-lg font-bold text-[#F3B44C]">
                {p.points} pts
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl bg-white/10 p-4 text-sm text-white/90">
        <p className="font-semibold text-white">Rewards</p>
        <ul className="mt-2 space-y-1 text-white/80">
          <li>25 pts — First drink on the hosts</li>
          <li>50 pts — Skip the line for next group activity</li>
          <li>100 pts — First dibs on transfer seats</li>
          <li>150 pts — Choose group activity or restaurant</li>
          <li>Trip winner — Trophy + drinks on the group</li>
        </ul>
      </div>
    </div>
  );
}
