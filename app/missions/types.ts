// Backend only — never shown to players. Used for AI pairing logic and admin.
export type BackendGroup =
  | "admin"
  | "sher_a"
  | "sher_b"
  | "sher_bro"
  | "mat_core"
  | "mat_family";

export interface Player {
  id: string;
  name: string;
  first_name: string;
  gender: "M" | "F";
  backend_group: BackendGroup;
  villa: string;
  room: string;
  is_admin: boolean;
  points: number;
  couple_with: string | null; // first name of partner if in a couple
}

export interface Mission {
  id: string;
  description: string;
  day: number;
  tier: string;
  points: number;
  bonus_points: number | null;
  time_window_start: string;
  time_window_end: string;
  is_group_mission: boolean;
  is_active: boolean;
  is_draft?: boolean;
  created_at: string;
}

export interface MissionAssignment {
  id: string;
  mission_id: string;
  player_id: string;
  partner_id: string | null;
  is_completed: boolean;
  completed_at: string | null;
  mission?: Mission;
  partner?: Player;
}

export interface PointLogEntry {
  id: string;
  player_id: string;
  mission_id: string | null;
  points: number;
  reason: string;
  created_at: string;
}
