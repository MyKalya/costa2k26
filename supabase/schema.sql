-- Costa 2K26 Missions — Supabase schema
-- Player id is text (e.g. p-mathushan) so app and seed script stay in sync. Run via setup script.

-- Drop in reverse dependency order (for clean re-run)
drop table if exists point_log;
drop table if exists mission_assignments;
drop table if exists missions;
drop table if exists players;

-- Players (34 people). id = app-facing stable id (localStorage, URLs).
create table players (
  id text primary key,
  name text not null,
  first_name text not null,
  gender text not null check (gender in ('M', 'F')),
  backend_group text not null,
  villa text not null,
  room text not null,
  is_admin boolean not null default false,
  points integer not null default 0,
  couple_with text
);

comment on column players.backend_group is 'Backend only. Never shown to players.';

-- Missions
create table missions (
  id uuid primary key default gen_random_uuid(),
  description text not null,
  day integer not null,
  tier text not null,
  points integer not null,
  bonus_points integer,
  time_window_start timestamptz not null,
  time_window_end timestamptz not null,
  is_group_mission boolean not null default false,
  is_active boolean not null default true,
  is_draft boolean not null default false,
  created_at timestamptz not null default now()
);

-- Mission assignments
create table mission_assignments (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions(id) on delete cascade,
  player_id text not null references players(id) on delete cascade,
  partner_id text references players(id) on delete set null,
  is_completed boolean not null default false,
  completed_at timestamptz,
  unique(mission_id, player_id)
);

-- Point log
create table point_log (
  id uuid primary key default gen_random_uuid(),
  player_id text not null references players(id) on delete cascade,
  mission_id uuid references missions(id) on delete set null,
  points integer not null,
  reason text not null,
  created_at timestamptz not null default now()
);

create index idx_mission_assignments_player on mission_assignments(player_id);
create index idx_mission_assignments_mission on mission_assignments(mission_id);
create index idx_point_log_player on point_log(player_id);
