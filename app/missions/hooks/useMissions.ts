"use client";

import { useState, useEffect, useCallback } from "react";
import { PLAYERS, getPlayersWithPoints } from "../data/players";
import { getDay1AssignmentsForPlayer } from "../data/day1Missions";
import { STORAGE_KEY_PLAYER_ID } from "../constants";
import { supabase, hasSupabase } from "@/lib/supabase";
import type { Player } from "../types";

const COMPLETED_KEY = "costa2k26_missions_completed";
const POINTS_KEY = "costa2k26_missions_points";

function getCompletedSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function saveCompletedSet(set: Set<string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(COMPLETED_KEY, JSON.stringify(Array.from(set)));
}

function getPointsMap(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(POINTS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, number>;
  } catch {
    return {};
  }
}

function savePointsMap(map: Record<string, number>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(POINTS_KEY, JSON.stringify(map));
}

interface AssignmentRow {
  assignment: { id: string; mission_id: string; player_id: string; partner_id: string | null; is_completed: boolean; completed_at: string | null };
  mission: { id: string; description: string; day: number; tier: string; points: number; bonus_points: number | null; time_window_start: string; time_window_end: string; is_group_mission: boolean; is_active: boolean; created_at: string };
  partner: { id: string; first_name: string; villa: string; room: string } | null;
}

export function useMissions(externalPlayerId?: string | null) {
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [pointsMap, setPointsMap] = useState<Record<string, number>>({});
  const [supabasePlayers, setSupabasePlayers] = useState<Player[] | null>(null);
  const [supabaseAssignments, setSupabaseAssignments] = useState<AssignmentRow[] | null>(null);
  const [loading, setLoading] = useState(false);

  const effectivePlayerId = externalPlayerId ?? playerId;

  useEffect(() => {
    const id = localStorage.getItem(STORAGE_KEY_PLAYER_ID);
    setPlayerId(id);
    setCompleted(getCompletedSet());
    setPointsMap(getPointsMap());
  }, [externalPlayerId]);

  const fetchFromSupabase = useCallback(async () => {
    if (!hasSupabase || !supabase || !effectivePlayerId) {
      setSupabasePlayers(null);
      setSupabaseAssignments(null);
      return;
    }
    setLoading(true);
    try {
      const { data: playersData, error: playersError } = await supabase
        .from("players")
        .select("id, name, first_name, gender, backend_group, villa, room, is_admin, points, couple_with");
      if (playersError) throw playersError;
      setSupabasePlayers((playersData ?? []) as Player[]);

      const { data: assignmentsData, error: assignError } = await supabase
        .from("mission_assignments")
        .select(`
          id,
          mission_id,
          player_id,
          partner_id,
          is_completed,
          completed_at,
          mission:missions(id, description, day, tier, points, bonus_points, time_window_start, time_window_end, is_group_mission),
          partner:players!partner_id(id, first_name, villa, room)
        `)
        .eq("player_id", effectivePlayerId);
      if (assignError) throw assignError;
      const rows: AssignmentRow[] = (assignmentsData ?? []).map((row: Record<string, unknown>) => {
        const mission = row.mission as Record<string, unknown>;
        const partner = row.partner as Record<string, unknown> | null;
        return {
          assignment: {
            id: row.id as string,
            mission_id: row.mission_id as string,
            player_id: row.player_id as string,
            partner_id: (row.partner_id as string) ?? null,
            is_completed: row.is_completed as boolean,
            completed_at: (row.completed_at as string) ?? null,
          },
          mission: {
            id: mission?.id as string,
            description: mission?.description as string,
            day: mission?.day as number,
            tier: mission?.tier as string,
            points: mission?.points as number,
            bonus_points: (mission?.bonus_points as number) ?? null,
            time_window_start: mission?.time_window_start as string,
            time_window_end: mission?.time_window_end as string,
            is_group_mission: mission?.is_group_mission as boolean,
            is_active: true,
            created_at: "",
          },
          partner: partner
            ? { id: partner.id as string, first_name: partner.first_name as string, villa: partner.villa as string, room: partner.room as string }
            : null,
        };
      });
      setSupabaseAssignments(rows);
    } catch (e) {
      console.error("Supabase fetch error", e);
    } finally {
      setLoading(false);
    }
  }, [effectivePlayerId]);

  useEffect(() => {
    fetchFromSupabase();
  }, [fetchFromSupabase]);

  const basePlayer = effectivePlayerId
    ? (supabasePlayers ?? PLAYERS).find((p) => p.id === effectivePlayerId)
    : null;
  const currentPlayer: Player | null = basePlayer
    ? {
        ...basePlayer,
        points: supabasePlayers ? (basePlayer as Player).points ?? 0 : (pointsMap[basePlayer.id] ?? 0),
      }
    : null;
  const isAdmin = currentPlayer?.is_admin ?? false;

  const useSupabaseData = hasSupabase && supabaseAssignments !== null;

  const assignmentsWithPartner: AssignmentRow[] = useSupabaseData
    ? supabaseAssignments ?? []
    : (currentPlayer ? getDay1AssignmentsForPlayer(currentPlayer.id) : []).map((row) => ({
        assignment: {
          id: row.assignmentId,
          mission_id: row.mission.id,
          player_id: currentPlayer!.id,
          partner_id: row.partner?.id ?? null,
          is_completed: false,
          completed_at: null,
        },
        mission: row.mission,
        partner: row.partner,
      }));

  const completedSet = useSupabaseData
    ? new Set((supabaseAssignments ?? []).filter((a) => a.assignment.is_completed).map((a) => a.assignment.id))
    : completed;

  const markComplete = useCallback(
    async (assignmentId: string, points: number) => {
      if (!currentPlayer) return;
      if (hasSupabase && supabase) {
        const row = (supabaseAssignments ?? []).find((a) => a.assignment.id === assignmentId);
        if (!row) return;
        try {
          await supabase.from("mission_assignments").update({ is_completed: true, completed_at: new Date().toISOString() }).eq("id", assignmentId);
          await supabase.from("point_log").insert({ player_id: currentPlayer.id, mission_id: row.assignment.mission_id, points, reason: "mission_complete" });
          await supabase.from("players").update({ points: (currentPlayer.points ?? 0) + points }).eq("id", currentPlayer.id);
        } catch (e) {
          console.error("Mark complete error", e);
          return;
        }
        setSupabaseAssignments((prev) =>
          (prev ?? []).map((a) =>
            a.assignment.id === assignmentId
              ? { ...a, assignment: { ...a.assignment, is_completed: true, completed_at: new Date().toISOString() } }
              : a
          )
        );
        setSupabasePlayers((prev) =>
          (prev ?? []).map((p) => (p.id === currentPlayer.id ? { ...p, points: (p.points ?? 0) + points } : p))
        );
      } else {
        setCompleted((prev) => {
          const next = new Set(prev);
          next.add(assignmentId);
          saveCompletedSet(next);
          return next;
        });
        setPointsMap((prev) => {
          const next = { ...prev };
          next[currentPlayer.id] = (next[currentPlayer.id] ?? 0) + points;
          savePointsMap(next);
          return next;
        });
      }
    },
    [currentPlayer, supabaseAssignments]
  );

  const undoComplete = useCallback(
    async (assignmentId: string) => {
      if (!hasSupabase) return;
      try {
        const res = await fetch("/api/missions/undo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ assignmentId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Undo failed");
        await fetchFromSupabase();
      } catch (e) {
        console.error("Undo error", e);
      }
    },
    [fetchFromSupabase]
  );

  const playersWithPoints = supabasePlayers
    ? supabasePlayers.map((p) => ({ ...p, points: p.points ?? 0 }))
    : getPlayersWithPoints(pointsMap);

  return {
    playerId: effectivePlayerId,
    currentPlayer,
    isAdmin,
    loading,
    assignments: assignmentsWithPartner.map((a) => ({
      ...a,
      isCompleted: completedSet.has(a.assignment.id),
    })),
    markComplete,
    undoComplete,
    isAssignmentCompleted: (id: string) => completedSet.has(id),
    playersWithPoints,
    pointsMap,
  };
}
