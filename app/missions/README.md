# Costa 2K26 Missions

Hidden route: **costa2k26.com/missions** (mobile-first game for the trip).

## One-time database setup (no manual Supabase dashboard)

From the project root run:

```bash
pnpm setup-missions-db
```

**Requires:** `DATABASE_URL` in `.env.local` (Supabase: **Project Settings → Database → Connection string → URI**).

The script creates tables, seeds 34 players, and seeds 3 Day 1 missions + 98 assignments. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` so the app uses Supabase. Re-run the script anytime to reset/reseed.

## Copy rules (critical)

- **Never** mention "circles," "groups," "sides," or "cliques" in the player-facing app. Backend group data is for AI pairing and admin only.

## What’s included

- **34 players** — name select, leaderboard, points (see `data/players.ts`). `backend_group` is backend-only.
- **Day 1** — Three pre-loaded missions with exact pairings (see `data/day1Missions.ts`): group mission, paired mission (16 pairs), late-night bonus.
- **Admin (Mathushan & Sherrena)** — Generate missions via OpenAI (Day 2–5): day, tier, count, optional context. Drafts shown; publish to Supabase when connected.
- **WhatsApp** — "Post Proof 📸" uses `NEXT_PUBLIC_MISSIONS_WHATSAPP_LINK`.

## Env vars

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — when set, app can sync players, missions, and points with Supabase.
- `NEXT_PUBLIC_MISSIONS_WHATSAPP_LINK` — WhatsApp group invite for proof posts.
- `OPENAI_API_KEY` — required for Admin “Generate missions” (GPT-4o). Set in Vercel for production.

## Env (see also `.env.example`)

- `DATABASE_URL` — used only by `pnpm setup-missions-db`.
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — app reads/writes players, missions, completions, points.
- `NEXT_PUBLIC_MISSIONS_WHATSAPP_LINK`, `OPENAI_API_KEY` — optional.

## Resetting as a different player

Clear localStorage keys: `costa2k26_missions_player_id`, `costa2k26_missions_completed`, `costa2k26_missions_points`. Reload `/missions` and pick your name again.
