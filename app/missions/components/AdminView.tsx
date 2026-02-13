"use client";

import { useState, useEffect, useCallback } from "react";
import { useMissions } from "../hooks/useMissions";
import { supabase, hasSupabase } from "@/lib/supabase";

const TIERS = [
  { id: "icebreaker", label: "Icebreaker" },
  { id: "comfortable", label: "Comfortable" },
  { id: "collaborative", label: "Collaborative" },
  { id: "fullsend", label: "Full send" },
  { id: "finale", label: "Finale" },
];

interface DraftMission {
  description: string;
  points: number;
  bonus_points?: number;
  is_group_mission?: boolean;
  pairs?: [string, string][];
}

interface CompletedAssignmentRow {
  id: string;
  mission_id: string;
  player_id: string;
  completed_at: string | null;
  mission: { id: string; description: string; points: number; is_active: boolean };
  player: { first_name: string; name: string } | null;
}

export function AdminView({ playerId }: { playerId: string | null }) {
  const { playersWithPoints } = useMissions(playerId);
  const [day, setDay] = useState(2);
  const [tier, setTier] = useState("comfortable");
  const [count, setCount] = useState(4);
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<DraftMission[]>([]);
  const [publishLoading, setPublishLoading] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [completedAssignments, setCompletedAssignments] = useState<CompletedAssignmentRow[]>([]);
  const [manageLoading, setManageLoading] = useState(false);
  const [undoingId, setUndoingId] = useState<string | null>(null);
  const [stakesCurrentDay, setStakesCurrentDay] = useState(1);
  const [stakesByDay, setStakesByDay] = useState<Record<number, { reward_text: string; consequence_text: string }>>({
    1: { reward_text: "", consequence_text: "" },
    2: { reward_text: "", consequence_text: "" },
    3: { reward_text: "", consequence_text: "" },
    4: { reward_text: "", consequence_text: "" },
    5: { reward_text: "", consequence_text: "" },
  });
  const [stakesLoadLoading, setStakesLoadLoading] = useState(true);
  const [stakesSaveLoading, setStakesSaveLoading] = useState(false);
  const [stakesSaveSuccess, setStakesSaveSuccess] = useState(false);
  const [stakesSaveError, setStakesSaveError] = useState<string | null>(null);

  const fetchStakes = useCallback(async () => {
    setStakesLoadLoading(true);
    try {
      const res = await fetch("/api/missions/stakes", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load stakes");
      setStakesCurrentDay(data.currentDay ?? 1);
      const next: Record<number, { reward_text: string; consequence_text: string }> = { 1: { reward_text: "", consequence_text: "" }, 2: { reward_text: "", consequence_text: "" }, 3: { reward_text: "", consequence_text: "" }, 4: { reward_text: "", consequence_text: "" }, 5: { reward_text: "", consequence_text: "" } };
      for (const row of data.dailyStakes ?? []) {
        if (row.day >= 1 && row.day <= 5) {
          next[row.day] = { reward_text: row.reward_text ?? "", consequence_text: row.consequence_text ?? "" };
        }
      }
      setStakesByDay(next);
    } catch (e) {
      console.error("Fetch stakes", e);
    } finally {
      setStakesLoadLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStakes();
  }, [fetchStakes]);

  const handleSaveStakes = async () => {
    setStakesSaveLoading(true);
    setStakesSaveSuccess(false);
    setStakesSaveError(null);
    try {
      const res = await fetch("/api/missions/stakes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentDay: stakesCurrentDay,
          dailyStakes: [1, 2, 3, 4, 5].map((d) => ({
            day: d,
            reward_text: stakesByDay[d]?.reward_text ?? "",
            consequence_text: stakesByDay[d]?.consequence_text ?? "",
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save stakes");
      setStakesSaveSuccess(true);
      await fetchStakes();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Save failed";
      setStakesSaveError(message);
      console.error("Save stakes", e);
    } finally {
      setStakesSaveLoading(false);
    }
  };

  const fetchCompletedAssignments = useCallback(async () => {
    if (!hasSupabase || !supabase) return;
    setManageLoading(true);
    try {
      const { data, error } = await supabase
        .from("mission_assignments")
        .select(
          "id, mission_id, player_id, completed_at, mission:missions(id, description, points, is_active), player:players!player_id(first_name, name)"
        )
        .eq("is_completed", true);
      if (error) throw error;
      const rows: CompletedAssignmentRow[] = (data ?? []).map((row: Record<string, unknown>) => {
        const mission = row.mission as Record<string, unknown>;
        const player = row.player as Record<string, unknown> | null;
        return {
          id: row.id as string,
          mission_id: row.mission_id as string,
          player_id: row.player_id as string,
          completed_at: (row.completed_at as string) ?? null,
          mission: {
            id: mission?.id as string,
            description: (mission?.description as string) ?? "",
            points: (mission?.points as number) ?? 0,
            is_active: (mission?.is_active as boolean) ?? false,
          },
          player: player
            ? { first_name: player.first_name as string, name: player.name as string }
            : null,
        };
      });
      setCompletedAssignments(rows.filter((r) => r.mission.is_active));
    } catch (e) {
      console.error("Fetch completed assignments", e);
      setCompletedAssignments([]);
    } finally {
      setManageLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompletedAssignments();
  }, [fetchCompletedAssignments]);

  const handleAdminUndo = async (assignmentId: string) => {
    setUndoingId(assignmentId);
    try {
      const res = await fetch("/api/missions/undo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, reason: "admin_undo" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Undo failed");
      await fetchCompletedAssignments();
    } catch (e) {
      console.error("Admin undo error", e);
    } finally {
      setUndoingId(null);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setDrafts([]);
    try {
      const res = await fetch("/api/missions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day, tier, count, context: context || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      setDrafts(Array.isArray(data.missions) ? data.missions : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (drafts.length === 0) return;
    setPublishLoading(true);
    setPublishError(null);
    setPublishSuccess(false);
    try {
      const res = await fetch("/api/missions/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day, tier, missions: drafts }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Publish failed");
      setPublishSuccess(true);
      setDrafts([]);
    } catch (e) {
      setPublishError(e instanceof Error ? e.message : "Publish failed");
    } finally {
      setPublishLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 pb-28 pt-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Admin</h2>

      <section className="mb-8 rounded-xl bg-white/10 p-4">
        <h3 className="mb-3 font-semibold text-white">Daily stakes</h3>
        <p className="mb-4 text-sm text-white/80">
          Set the &quot;today&quot; trip day and, for each day, the reward (complete all missions) and consequence (complete none). Players see the day you set as &quot;Current trip day&quot;. If save fails, ensure <code className="rounded bg-white/20 px-1">app_config</code> and <code className="rounded bg-white/20 px-1">daily_stakes</code> exist in Supabase (run schema/setup).
        </p>
        {stakesLoadLoading ? (
          <p className="text-sm text-white/70">Loading…</p>
        ) : (
          <>
            <div className="mb-4">
              <label className="mb-1 block text-xs text-white/70">Current trip day (what &quot;today&quot; is)</label>
              <select
                value={stakesCurrentDay}
                onChange={(e) => setStakesCurrentDay(Number(e.target.value))}
                className="w-full rounded-lg bg-white/10 px-3 py-2 text-white"
              >
                {[1, 2, 3, 4, 5].map((d) => (
                  <option key={d} value={d} className="bg-[#0E3D2F]">
                    Day {d}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((d) => (
                <div key={d} className="rounded-lg border border-white/20 bg-white/5 p-3">
                  <h4 className="mb-2 text-sm font-semibold text-white">Day {d}</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="mb-0.5 block text-xs text-white/60">Reward (complete all missions this day)</label>
                      <input
                        type="text"
                        value={stakesByDay[d]?.reward_text ?? ""}
                        onChange={(e) => setStakesByDay((prev) => ({ ...prev, [d]: { ...prev[d], reward_text: e.target.value } }))}
                        placeholder="e.g. First drink on the hosts"
                        className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40"
                      />
                    </div>
                    <div>
                      <label className="mb-0.5 block text-xs text-white/60">Consequence (complete none this day)</label>
                      <input
                        type="text"
                        value={stakesByDay[d]?.consequence_text ?? ""}
                        onChange={(e) => setStakesByDay((prev) => ({ ...prev, [d]: { ...prev[d], consequence_text: e.target.value } }))}
                        placeholder="e.g. Last pick for transfer seats"
                        className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveStakes}
                disabled={stakesSaveLoading}
                className="rounded-xl bg-[#F3B44C] py-2.5 px-4 font-bold text-[#0E3D2F] disabled:opacity-50"
              >
                {stakesSaveLoading ? "Saving…" : "Save daily stakes"}
              </button>
              {stakesSaveSuccess && <span className="text-sm text-green-300">Saved.</span>}
              {stakesSaveError && (
                <span className="text-sm text-red-300">Failed: {stakesSaveError}</span>
              )}
            </div>
          </>
        )}
      </section>

      <section className="mb-8 rounded-xl bg-white/10 p-4">
        <h3 className="mb-3 font-semibold text-white">Generate missions (AI)</h3>
        <p className="mb-4 text-sm text-white/80">
          Day 1 is pre-loaded. Use this for Days 2–5. Pairings follow backend rules; mission copy never mentions groups.
        </p>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs text-white/70">Day</label>
            <select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="w-full rounded-lg bg-white/10 px-3 py-2 text-white"
            >
              {[2, 3, 4, 5].map((d) => (
                <option key={d} value={d} className="bg-[#0E3D2F]">
                  Day {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/70">Tier</label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="w-full rounded-lg bg-white/10 px-3 py-2 text-white"
            >
              {TIERS.map((t) => (
                <option key={t.id} value={t.id} className="bg-[#0E3D2F]">
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/70">Number of missions</label>
            <input
              type="number"
              min={1}
              max={6}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full rounded-lg bg-white/10 px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/70">Context (optional)</label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g. everyone's at the pool, Roisin has been with Shannon — push her somewhere new"
              rows={2}
              className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50"
            />
          </div>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full rounded-xl bg-[#F3B44C] py-2.5 font-bold text-[#0E3D2F] disabled:opacity-50"
          >
            {loading ? "Generating…" : "Generate missions"}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
      </section>

      {drafts.length > 0 && (
        <section className="mb-8">
          <h3 className="mb-3 font-semibold text-white">Drafts</h3>
          <div className="space-y-4">
            {drafts.map((m, i) => (
              <div key={i} className="rounded-xl border border-white/20 bg-white/5 p-4">
                <p className="text-sm text-white/90">{m.description}</p>
                <p className="mt-1 text-xs text-white/60">
                  {m.points} pts{m.bonus_points ? ` + ${m.bonus_points} bonus` : ""}
                  {m.is_group_mission ? " · Group mission" : ""}
                </p>
                {m.pairs && m.pairs.length > 0 && (
                  <p className="mt-1 text-xs text-white/50">
                    Pairs: {m.pairs.map(([a, b]) => `${a}–${b}`).join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={handlePublish}
              disabled={publishLoading}
              className="rounded-xl bg-green-600 px-4 py-2.5 font-bold text-white disabled:opacity-50"
            >
              {publishLoading ? "Publishing…" : "Publish to Supabase"}
            </button>
          </div>
          {publishError && <p className="mt-2 text-sm text-red-300">{publishError}</p>}
          {publishSuccess && <p className="mt-2 text-sm text-green-300">Published. Players will see these missions.</p>}
        </section>
      )}

      {hasSupabase && (
        <section className="mb-8 rounded-xl bg-white/10 p-4">
          <h3 className="mb-3 font-semibold text-white">Manage active missions</h3>
          <p className="mb-3 text-sm text-white/80">
            Who marked what as complete. Undo reverses completion and subtracts points (no time limit).
          </p>
          {manageLoading ? (
            <p className="text-sm text-white/70">Loading…</p>
          ) : completedAssignments.length === 0 ? (
            <p className="text-sm text-white/70">No completed assignments for active missions.</p>
          ) : (
            <div className="space-y-3">
              {completedAssignments.map((row) => (
                <div
                  key={row.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/20 bg-white/5 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white/90">{row.mission.description}</p>
                    <p className="mt-0.5 text-xs text-white/60">
                      {row.player?.first_name ?? row.player?.name ?? row.player_id} · +{row.mission.points} pts
                      {row.completed_at && (
                        <> · {new Date(row.completed_at).toLocaleString()}</>
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAdminUndo(row.id)}
                    disabled={undoingId === row.id}
                    className="shrink-0 rounded-lg border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 hover:bg-white/20 disabled:opacity-50"
                  >
                    {undoingId === row.id ? "Undoing…" : "Undo"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <div className="rounded-xl bg-white/10 p-4">
        <h3 className="mb-2 font-semibold text-white">Player status</h3>
        <p className="text-sm text-white/70">
          {playersWithPoints.length} players loaded. Add Supabase to sync completions and points across devices.
        </p>
      </div>
    </div>
  );
}
