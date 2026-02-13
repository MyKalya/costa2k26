"use client";

import { useMissions } from "../hooks/useMissions";
import { MissionCard } from "./MissionCard";

export function MyMissionsView({ playerId }: { playerId: string | null }) {
  const { currentPlayer, assignments, markComplete } = useMissions(playerId);

  if (!currentPlayer) return null;

  const active = assignments.filter((a) => !a.isCompleted);
  const done = assignments.filter((a) => a.isCompleted);

  return (
    <div className="mx-auto max-w-lg px-4 pb-28 pt-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            {currentPlayer.first_name}
          </h2>
          <p className="text-sm text-white/80">
            {currentPlayer.points ?? 0} points
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/90">
          Active missions
        </h3>
        {active.length === 0 ? (
          <p className="rounded-2xl border border-white/20 bg-white/5 p-4 text-white/70">
            No active missions right now. Check back later or enjoy the trip!
          </p>
        ) : (
          <div className="space-y-4">
            {active.map((a) => (
              <MissionCard
                key={a.assignment.id}
                mission={a.mission}
                partner={a.partner}
                assignmentId={a.assignment.id}
                isCompleted={a.isCompleted}
                onMarkComplete={() =>
                  markComplete(a.assignment.id, a.mission.points)
                }
              />
            ))}
          </div>
        )}
      </section>

      {done.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/70">
            Completed
          </h3>
          <div className="space-y-4">
            {done.map((a) => (
              <div
                key={a.assignment.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 opacity-90"
              >
                <p className="text-sm text-white/90 line-through">
                  {a.mission.description}
                </p>
                <p className="mt-1 text-xs text-white/60">
                  +{a.mission.points} pts
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
