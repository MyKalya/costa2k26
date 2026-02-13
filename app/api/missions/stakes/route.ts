import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export interface StakesBody {
  currentDay?: number;
  dailyStakes?: { day: number; reward_text: string; consequence_text: string }[];
}

export async function GET() {
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const [configRes, stakesRes] = await Promise.all([
    supabase.from("app_config").select("value").eq("key", "current_day").maybeSingle(),
    supabase.from("daily_stakes").select("day, reward_text, consequence_text").order("day"),
  ]);

  if (configRes.error) return NextResponse.json({ error: configRes.error.message }, { status: 500 });
  if (stakesRes.error) return NextResponse.json({ error: stakesRes.error.message }, { status: 500 });

  const currentDay = configRes.data?.value ? parseInt(configRes.data.value, 10) : 1;
  const dailyStakes = (stakesRes.data ?? []).map((r) => ({
    day: r.day,
    reward_text: r.reward_text ?? "",
    consequence_text: r.consequence_text ?? "",
  }));

  return NextResponse.json({ currentDay, dailyStakes });
}

export async function POST(request: Request) {
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }
  let body: StakesBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  if (body.currentDay !== undefined) {
    const day = Math.min(5, Math.max(1, body.currentDay));
    const { error } = await supabase.from("app_config").upsert({ key: "current_day", value: String(day) }, { onConflict: "key" });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (body.dailyStakes && Array.isArray(body.dailyStakes)) {
    for (const row of body.dailyStakes) {
      const day = Math.min(5, Math.max(1, row.day));
      const { error } = await supabase
        .from("daily_stakes")
        .upsert(
          { day, reward_text: row.reward_text ?? "", consequence_text: row.consequence_text ?? "" },
          { onConflict: "day" }
        );
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
