import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: Request) {
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }
  let body: { assignmentId: string; reason?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { assignmentId, reason: logReason } = body;
  const pointLogReason = logReason === "admin_undo" ? "admin_undo" : "undo";
  if (!assignmentId || typeof assignmentId !== "string") {
    return NextResponse.json({ error: "assignmentId required" }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const { data: assignment, error: assignErr } = await supabase
    .from("mission_assignments")
    .select("id, mission_id, player_id, is_completed")
    .eq("id", assignmentId)
    .single();

  if (assignErr || !assignment) {
    return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
  }
  if (!assignment.is_completed) {
    return NextResponse.json({ error: "Assignment is not completed" }, { status: 400 });
  }

  const { data: mission, error: missionErr } = await supabase
    .from("missions")
    .select("id, points")
    .eq("id", assignment.mission_id)
    .single();

  if (missionErr || !mission) {
    return NextResponse.json({ error: "Mission not found" }, { status: 404 });
  }

  const points = mission.points ?? 0;

  const { error: updateAssignErr } = await supabase
    .from("mission_assignments")
    .update({ is_completed: false, completed_at: null })
    .eq("id", assignmentId);

  if (updateAssignErr) {
    return NextResponse.json({ error: "Failed to undo assignment" }, { status: 500 });
  }

  const { data: player } = await supabase
    .from("players")
    .select("points")
    .eq("id", assignment.player_id)
    .single();

  const newPoints = Math.max(0, (player?.points ?? 0) - points);

  const { error: updatePlayerErr } = await supabase
    .from("players")
    .update({ points: newPoints })
    .eq("id", assignment.player_id);

  if (updatePlayerErr) {
    return NextResponse.json({ error: "Failed to update player points" }, { status: 500 });
  }

  const { error: logErr } = await supabase.from("point_log").insert({
    player_id: assignment.player_id,
    mission_id: assignment.mission_id,
    points: -points,
    reason: pointLogReason,
  });

  if (logErr) {
    return NextResponse.json({ error: "Failed to log undo" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
