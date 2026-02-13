/**
 * Day 1 — Welcome Dinner (Feb 13). Pre-loaded missions and pairings per spec.
 * All copy is player-facing: no mention of groups/circles/sides.
 */
import type { Mission } from "../types";
import { PLAYERS } from "./players";

// Costa Rica UTC-6. Feb 13 2026: 7:30 PM = 01:30 Feb 14 UTC, 8:00 PM = 02:00, 9:00 PM = 03:00
const feb13_1930 = "2026-02-14T01:30:00Z"; // 7:30 PM
const feb13_2000 = "2026-02-14T02:00:00Z"; // 8:00 PM (Mission 2 drops)
const feb13_2100 = "2026-02-14T03:00:00Z"; // 9:00 PM (Mission 3 drops)
const feb14_0600 = "2026-02-14T06:00:00Z"; // midnight

const MISSION_1: Mission = {
  id: "day1-m1-group",
  description:
    "Find someone from a different villa than yours. Learn their name, where they're from, and one thing they're excited about this week. Take a selfie together and post it in the missions WhatsApp group.",
  day: 1,
  tier: "icebreaker",
  points: 10,
  bonus_points: null,
  time_window_start: feb13_1930,
  time_window_end: feb14_0600,
  is_group_mission: true,
  is_active: true,
  created_at: new Date().toISOString(),
};

const MISSION_2: Mission = {
  id: "day1-m2-paired",
  description:
    "You've been paired with a fellow guest. Find them tonight, have a drink with them, and learn one thing about them that would surprise the group. Post a selfie of the two of you doing that in the missions chat.",
  day: 1,
  tier: "icebreaker",
  points: 15,
  bonus_points: null,
  time_window_start: feb13_2000,
  time_window_end: feb14_0600,
  is_group_mission: false,
  is_active: true,
  created_at: new Date().toISOString(),
};

const MISSION_3: Mission = {
  id: "day1-m3-latenight",
  description:
    "Find your mission partner from earlier. Introduce them to one of YOUR closest friends on the trip. The three of you take a photo together.",
  day: 1,
  tier: "icebreaker",
  points: 10,
  bonus_points: null,
  time_window_start: feb13_2100,
  time_window_end: feb14_0600,
  is_group_mission: false,
  is_active: true,
  created_at: new Date().toISOString(),
};

export const DAY1_MISSIONS: Mission[] = [MISSION_1, MISSION_2, MISSION_3];

// Spec pairings for Mission 2 (Person A | Person B). Admins (Mathushan, Sherrena) not in list.
const MISSION_2_PAIRS: [string, string][] = [
  ["p-andrew", "p-januka"],
  ["p-shannon", "p-shreya"],
  ["p-kimia", "p-aatharsha"],
  ["p-raja", "p-supena"],
  ["p-netharrshan", "p-yanushan"],
  ["p-arun", "p-nick"],
  ["p-roisin", "p-athira"],
  ["p-khandeeban", "p-mathan"],
  ["p-madhumita", "p-thithusha"],
  ["p-deleep", "p-thasithan"],
  ["p-rishega", "p-saipiriya"],
  ["p-methuraan", "p-aksaran"],
  ["p-keerthana", "p-saimiruthi"],
  ["p-rajiv", "p-harish"],
  ["p-yothiha", "p-kajamugi"],
  ["p-aruyan", "p-maathushan"],
];

// Mission 3: same pairs as Mission 2 (find your mission partner from earlier)
export function getDay1Partner(playerId: string, missionId: string): (typeof PLAYERS)[0] | null {
  if (missionId === MISSION_1.id) return null;
  if (missionId !== MISSION_2.id && missionId !== MISSION_3.id) return null;
  for (const [a, b] of MISSION_2_PAIRS) {
    if (a === playerId) return PLAYERS.find((p) => p.id === b) ?? null;
    if (b === playerId) return PLAYERS.find((p) => p.id === a) ?? null;
  }
  return null;
}

export function getDay1AssignmentsForPlayer(playerId: string): {
  mission: Mission;
  partner: (typeof PLAYERS)[0] | null;
  assignmentId: string;
}[] {
  const result: { mission: Mission; partner: (typeof PLAYERS)[0] | null; assignmentId: string }[] = [];

  // Mission 1: group — everyone
  result.push({
    mission: MISSION_1,
    partner: null,
    assignmentId: `a-${MISSION_1.id}-${playerId}`,
  });

  // Mission 2: paired (admins don't have a partner per spec)
  const m2Partner = getDay1Partner(playerId, MISSION_2.id);
  result.push({
    mission: MISSION_2,
    partner: m2Partner,
    assignmentId: `a-${MISSION_2.id}-${playerId}`,
  });

  // Mission 3: same partner as Mission 2
  const m3Partner = getDay1Partner(playerId, MISSION_3.id);
  result.push({
    mission: MISSION_3,
    partner: m3Partner,
    assignmentId: `a-${MISSION_3.id}-${playerId}`,
  });

  return result;
}
