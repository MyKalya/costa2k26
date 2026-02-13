/**
 * One-time setup: creates missions tables and seeds 34 players + Day 1 missions from app data.
 * Run: pnpm setup-missions-db
 * Requires: DATABASE_URL in .env.local (Supabase: Project Settings > Database > Connection string > URI)
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import dotenv from "dotenv";
import { PLAYERS } from "../app/missions/data/players";
import { DAY1_MISSIONS, getDay1AssignmentsForPlayer } from "../app/missions/data/day1Missions";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

dotenv.config({ path: join(root, ".env.local") });
dotenv.config({ path: join(root, ".env") });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("Missing DATABASE_URL. Add to .env.local (Supabase: Project Settings > Database > Connection string > URI)");
  process.exit(1);
}

// Fixed UUIDs for Day 1 missions in DB (map from DAY1_MISSIONS string id)
const MISSION_UUIDS: Record<string, string> = {
  "day1-m1-group": "a0000001-0001-4000-8000-000000000001",
  "day1-m2-paired": "a0000002-0002-4000-8000-000000000002",
  "day1-m3-latenight": "a0000003-0003-4000-8000-000000000003",
};

const client = new pg.Client({ connectionString: DATABASE_URL });

async function run() {
  await client.connect();
  try {
    console.log("1. Running schema (drop + create tables)...");
    const schemaPath = join(root, "supabase", "schema.sql");
    const schema = readFileSync(schemaPath, "utf8");
    await client.query(schema);

    console.log("2. Seeding 34 players from players.ts...");
    for (const p of PLAYERS) {
      await client.query(
        `insert into players (id, name, first_name, gender, backend_group, villa, room, is_admin, couple_with)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         on conflict (id) do update set name = $2, first_name = $3, gender = $4, backend_group = $5, villa = $6, room = $7, is_admin = $8, couple_with = $9`,
        [p.id, p.name, p.first_name, p.gender, p.backend_group, p.villa, p.room, p.is_admin, p.couple_with]
      );
    }

    console.log("3. Seeding Day 1 missions from day1Missions.ts...");
    for (const m of DAY1_MISSIONS) {
      const uuid = MISSION_UUIDS[m.id];
      if (!uuid) continue;
      await client.query(
        `insert into missions (id, description, day, tier, points, bonus_points, time_window_start, time_window_end, is_group_mission, is_active, is_draft)
         values ($1::uuid, $2, $3, $4, $5, $6, $7::timestamptz, $8::timestamptz, $9, true, false)
         on conflict (id) do nothing`,
        [
          uuid,
          m.description,
          m.day,
          m.tier,
          m.points,
          m.bonus_points,
          m.time_window_start,
          m.time_window_end,
          m.is_group_mission,
        ]
      );
    }

    console.log("4. Seeding mission assignments from day1Missions.ts...");
    for (const player of PLAYERS) {
      const rows = getDay1AssignmentsForPlayer(player.id);
      for (const row of rows) {
        const missionUuid = MISSION_UUIDS[row.mission.id];
        if (!missionUuid) continue;
        await client.query(
          `insert into mission_assignments (mission_id, player_id, partner_id) values ($1::uuid, $2, $3) on conflict (mission_id, player_id) do nothing`,
          [missionUuid, player.id, row.partner?.id ?? null]
        );
      }
    }

    console.log("Done. Tables created and seeded: players (34), missions (3), mission_assignments (98).");
  } finally {
    await client.end();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
