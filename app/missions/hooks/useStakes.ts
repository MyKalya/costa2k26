"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, hasSupabase } from "@/lib/supabase";

export interface TodayStats {
  total: number;
  completed: number;
}

export function useStakes() {
  const [currentDay, setCurrentDay] = useState(1);
  const [rewardText, setRewardText] = useState("");
  const [consequenceText, setConsequenceText] = useState("");
  const [todayStatsByPlayer, setTodayStatsByPlayer] = useState<Record<string, TodayStats>>({});
  const [loading, setLoading] = useState(false);

  const fetchStakes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/missions/stakes", { cache: "no-store" });
      const data = await res.json();
      const day = data.currentDay ?? 1;
      const safeDay = Math.min(5, Math.max(1, day));
      setCurrentDay(safeDay);
      const stakesRow = (data.dailyStakes ?? []).find((r: { day: number }) => r.day === safeDay);
      setRewardText(stakesRow?.reward_text ?? "");
      setConsequenceText(stakesRow?.consequence_text ?? "");

      if (!hasSupabase || !supabase) {
        setTodayStatsByPlayer({});
        return;
      }

      const { data: missionIdsData, error: missionsErr } = await supabase
        .from("missions")
        .select("id")
        .eq("day", safeDay)
        .eq("is_active", true);
      if (missionsErr) throw missionsErr;
      const missionIds = (missionIdsData ?? []).map((m) => m.id);
      if (missionIds.length === 0) {
        setTodayStatsByPlayer({});
        return;
      }

      const { data: assignData, error: assignErr } = await supabase
        .from("mission_assignments")
        .select("player_id, is_completed")
        .in("mission_id", missionIds);
      if (assignErr) throw assignErr;

      const byPlayer: Record<string, TodayStats> = {};
      for (const row of assignData ?? []) {
        const pid = row.player_id as string;
        if (!byPlayer[pid]) byPlayer[pid] = { total: 0, completed: 0 };
        byPlayer[pid].total += 1;
        if (row.is_completed) byPlayer[pid].completed += 1;
      }
      setTodayStatsByPlayer(byPlayer);
    } catch (e) {
      console.error("Stakes fetch error", e);
      setCurrentDay(1);
      setRewardText("");
      setConsequenceText("");
      setTodayStatsByPlayer({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStakes();
  }, [fetchStakes]);

  // Refetch when window/tab gets focus so players see latest stakes after admin saves
  useEffect(() => {
    const onFocus = () => fetchStakes();
    window.addEventListener("focus", onFocus);
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") fetchStakes();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [fetchStakes]);

  return {
    currentDay,
    rewardText,
    consequenceText,
    todayStatsByPlayer,
    stakesLoading: loading,
    refetchStakes: fetchStakes,
  };
}
