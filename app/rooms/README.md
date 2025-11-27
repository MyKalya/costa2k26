# Rooms Feature Notes

## Data assumptions

- Room records are sourced from `app/data/rooms.ts` via the exported `VILLAS`, `ROOMS`, `ZONES`, and `ROOM_DETAILS` objects.
- Guest assignments are derived from the `occupants` string arrays. We generate lightweight guest ids by slugifying the guest name (e.g. `Mathushan` → `mathushan`).
- Zone definitions are static and map room ids to high-level groupings (Detached Suites, Main House, Casita, etc.).
- Amenity lists, capacities, and ensuite flags live in `ROOM_DETAILS`. Missing data falls back to sensible defaults (capacity 2, ensuite true).
- Direction links and host contact details are currently stubbed in the UI and should be replaced once the real API provides those fields (`meta.directions`, `meta.hostContact`).
- Door-code visibility is gated to the check-in window (Feb 13, 2026 @ 07:00 CR time). Adjust `CHECK_IN_UNLOCK` in the page if the schedule changes.

## Wiring real APIs later

1. Replace the static exports in `app/data/rooms.ts` with a data fetching layer (REST/GraphQL) that resolves the same shape:
   ```ts
   type Villa = {
     id: string;
     name: string;
     sleeps: number;
     beds: number;
     baths: number;
     wifi: { ssid: string; password: string };
     doorCode: string;
     directionsUrl: string;
     hostContact: string; // WhatsApp link or phone number
     zones: Zone[];
   };
   ```

2. Supply structured guest objects with persistent ids so shareable deep links remain stable (`guest.id`).

3. Move quick-action targets (Maps URL, WhatsApp link) into the API payload for each villa.

4. When integrating server data, keep the local transformations (slugging guest ids, fallback amenities) in place as a safety net.

5. If the API can expose real-time occupancy, update the `ROOM_DETAILS` helper to ingest that metadata and remove the static fallbacks.

## Testing

- `pnpm test` runs Vitest coverage for access-code timers and Wi-Fi clipboard behaviour.
- The Rooms page relies on client-side interactions—use Cypress/Playwright to cover the carousel, quick actions, and search workflow when end-to-end tests are added.
