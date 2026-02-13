import { NextResponse } from "next/server";
import OpenAI from "openai";
import { PLAYERS } from "@/app/missions/data/players";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "" });

const TIER_GUIDE: Record<string, string> = {
  icebreaker: "Low friction. Get people using the app and talking. Simple meet-and-greet style.",
  comfortable: "Still easy but more interaction. Good for Day 2 (e.g. Valentine's theme).",
  collaborative: "Require doing things together: create something, teach each other, team challenges.",
  fullsend: "Memorable, silly, story-worthy. Karaoke, clothing swap, hype person, villa vs villa.",
  finale: "Grand finale: scavenger hunt, superlatives, video messages, awards.",
};

export interface GenerateMissionsBody {
  day: number;
  tier: string;
  count?: number;
  context?: string;
}

export interface DraftMission {
  description: string;
  points: number;
  bonus_points?: number;
  is_group_mission?: boolean;
  pairs?: [string, string][]; // first names
}

function buildRosterForAI(): string {
  return PLAYERS.filter((p) => !p.is_admin).map((p) => 
    `${p.first_name} (Villa ${p.villa.replace("V", "")})`
  ).join(", ");
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OPENAI_API_KEY not set" }, { status: 500 });
  }
  let body: GenerateMissionsBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { day, tier, count = 4, context = "" } = body;
  const tierGuide = TIER_GUIDE[tier] ?? "Fun, casual mission that gets people mixing.";

  const roster = buildRosterForAI();
  const systemPrompt = `You are generating missions for a group trip game in Costa Rica. There are 34 players across 3 villas (14, 15, 16). Mission text is shown to players — keep it fun, casual, and inclusive. Never mention "circles," "groups," "sides," or "cliques" in mission text. Pairings are decided by you; players should feel like random fun pairings.

Pairing rules (for your pairings only — do not mention in mission text):
- Prefer pairing people from different villas.
- Do not pair the same two people twice in one batch.
- Do not pair couples together (e.g. Mathushan-Sherrena, Arun-Athira, etc.). Couples: Mathushan-Sherrena, Aatharsha-Thasitathan, Aksaran-Thithusha, Nick-Shreya, Mathan-Saipiriya, Harish-Roisin, Arun-Athira, Aruyan-Madhumita, Deleep-Shannon, Khandeeban-Yothiha, Kimia-Maathushan, Rishega-Methuraan, Keerthana-Rajiv.
- Mix genders when natural.
- Roisin, Raja, and first-time mixers can get friendly pairings.

Available players (first name, villa): ${roster}

Respond with a single JSON object: { "missions": [ ... ] }. Each mission: { "description": "mission text for players", "points": number, "bonus_points": optional number, "is_group_mission": true for everyone, or "pairs": [ ["FirstName", "FirstName"], ... ] for paired missions }. Use exact first names from the roster.`;

  const userPrompt = `Day ${day}, tier: ${tier}. ${tierGuide}
Generate ${count} missions. ${context ? `Context: ${context}` : ""}
Return JSON: { "missions": [ ... ] }.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });
    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw) as { missions?: DraftMission[] };
    const missions = Array.isArray(parsed.missions) ? parsed.missions : [];
    return NextResponse.json({ missions });
  } catch (e) {
    console.error("OpenAI error", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "OpenAI request failed" },
      { status: 500 }
    );
  }
}
