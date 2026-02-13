"use client";

import { useState } from "react";
import { PLAYERS } from "../data/players";
import { STORAGE_KEY_PLAYER_ID } from "../constants";

const PLAYERS_SORTED = [...PLAYERS].sort((a, b) =>
  a.first_name.localeCompare(b.first_name)
);

export function NameSelect({ onSelect }: { onSelect: () => void }) {
  const [selectedId, setSelectedId] = useState<string>("");

  const handleConfirm = () => {
    if (!selectedId) return;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_PLAYER_ID, selectedId);
      onSelect();
    }
  };

  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col items-center justify-center px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-recoleta text-3xl font-bold tracking-tight text-white drop-shadow-sm sm:text-4xl">
          Costa 2K26 Missions
        </h1>
        <p className="mt-3 text-lg text-white/90">
          Welcome to the game. Earn points. Make new friends. Do ridiculous stuff.
        </p>
      </div>

      <div className="w-full max-w-sm">
        <label className="mb-2 block text-sm font-medium text-white/90">
          Who are you?
        </label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full rounded-xl border-2 border-white/30 bg-white/10 px-4 py-3 text-base text-white placeholder-white/50 focus:border-[#F3B44C] focus:outline-none focus:ring-2 focus:ring-[#F3B44C]/50"
        >
          <option value="" className="bg-[#0E3D2F] text-white">
            Pick your name...
          </option>
          {PLAYERS_SORTED.map((p) => (
            <option
              key={p.id}
              value={p.id}
              className="bg-[#0E3D2F] text-white"
            >
              {p.first_name} {p.name.split(" ").slice(1).join(" ")}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={!selectedId}
          className="mt-6 w-full rounded-xl bg-[#F3B44C] px-6 py-4 text-lg font-bold text-[#0E3D2F] shadow-lg transition hover:bg-[#e5a63d] disabled:opacity-50 disabled:hover:bg-[#F3B44C]"
        >
          That&apos;s Me!
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-white/70">
        First names shown; select yourself to see your missions.
      </p>
    </div>
  );
}
