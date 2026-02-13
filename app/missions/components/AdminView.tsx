"use client";

import { useState } from "react";
import { useMissions } from "../hooks/useMissions";

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

      <div className="rounded-xl bg-white/10 p-4">
        <h3 className="mb-2 font-semibold text-white">Player status</h3>
        <p className="text-sm text-white/70">
          {playersWithPoints.length} players loaded. Add Supabase to sync completions and points across devices.
        </p>
      </div>
    </div>
  );
}
