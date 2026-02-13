import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PLAYERS } from "@/app/missions/data/players";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export interface DraftMission {
  description: string;
  points: number;
  bonus_points?: number;
  is_group_mission?: boolean;
  pairs?: [string, string][];
}

export interface PublishBody {
  day: number;
  tier: string;
  missions: DraftMission[];
}

// Costa Rica UTC-6: today start/end as ISO strings for time_window
function getCostaRicaDayWindow(): { start: string; end: string } {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);
  end.setUTCHours(30, 0, 0, 0); // midnight next day UTC
  return { start: start.toISOString(), end: end.toISOString() };
}

// Map first_name -> player id (first match; unique first names for our roster)
const firstNameToId = new Map<string, string>();
for (const p of PLAYERS) {
  if (!firstNameToId.has(p.first_name)) firstNameToId.set(p.first_name, p.id);
}

function resolvePlayerId(firstName: string): string | null {
  return firstNameToId.get(firstName) ?? null;
}

export async function POST(req: Request) {
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  let body: PublishBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { day, tier, missions } = body;
  if (!Number.isInteger(day) || !tier || !Array.isArray(missions) || missions.length === 0) {
    return NextResponse.json({ error: "Missing day, tier, or missions" }, { status: 400 });
  }

  const { start: time_window_start, end: time_window_end } = getCostaRicaDayWindow();

  try {
    for (const m of missions) {
      const { data: missionRow, error: missionErr } = await supabase
        .from("missions")
        .insert({
          description: m.description,
          day,
          tier,
          points: m.points,
          bonus_points: m.bonus_points ?? null,
          time_window_start,
          time_window_end,
          is_group_mission: m.is_group_mission ?? false,
          is_active: true,
          is_draft: false,
        })
        .select("id")
        .single();
      if (missionErr || !missionRow) {
        console.error("Mission insert error", missionErr);
        return NextResponse.json({ error: missionErr?.message ?? "Failed to insert mission" }, { status: 500 });
      }
      const missionId = missionRow.id as string;

      if (m.is_group_mission) {
        for (const p of PLAYERS) {
          await supabase.from("mission_assignments").insert({ mission_id: missionId, player_id: p.id, partner_id: null });
        }
      } else if (m.pairs && m.pairs.length > 0) {
        for (const [nameA, nameB] of m.pairs) {
          const idA = resolvePlayerId(nameA);
          const idB = resolvePlayerId(nameB);
          if (!idA || !idB) continue;
          await supabase.from("mission_assignments").insert({ mission_id: missionId, player_id: idA, partner_id: idB });
          await supabase.from("mission_assignments").insert({ mission_id: missionId, player_id: idB, partner_id: idA });
        }
      }
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Publish error", e);
    return NextResponse.json({ error: e instanceof Error ? e.message : "Publish failed" }, { status: 500 });
  }
}
