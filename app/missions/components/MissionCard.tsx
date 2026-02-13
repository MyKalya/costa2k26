"use client";

import type { Mission } from "../types";
import { WHATSAPP_PROOF_LINK } from "../constants";

interface PartnerInfo {
  first_name: string;
  villa: string;
  room: string;
}

interface MissionCardProps {
  mission: Mission;
  partner: PartnerInfo | null;
  assignmentId: string;
  isCompleted: boolean;
  onMarkComplete: () => void;
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Costa_Rica",
    });
  } catch {
    return "";
  }
}

export function MissionCard({
  mission,
  partner,
  assignmentId,
  isCompleted,
  onMarkComplete,
}: MissionCardProps) {
  const endTime = formatTime(mission.time_window_end);

  return (
    <div className="rounded-2xl border-2 border-white/20 bg-white/10 p-4 backdrop-blur-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-[#F3B44C]/90 px-2.5 py-0.5 text-xs font-bold text-[#0E3D2F]">
          {mission.tier}
        </span>
        <span className="text-sm text-white/80">
          Complete by {endTime || "end of day"}
        </span>
      </div>
      <p className="mb-3 text-base leading-relaxed text-white">
        {mission.description}
      </p>
      {partner && (
        <p className="mb-2 text-sm font-semibold text-[#F3B44C]">
          With: {partner.first_name} · Villa {partner.villa.replace("V", "")}
        </p>
      )}
      <p className="mb-3 text-xs text-white/70">
        {mission.points} pts
        {mission.bonus_points ? ` + ${mission.bonus_points} bonus` : ""}
      </p>
      <div className="flex flex-wrap gap-2">
        {!isCompleted ? (
          <>
            <button
              type="button"
              onClick={onMarkComplete}
              className="rounded-xl bg-[#F3B44C] px-4 py-2.5 font-bold text-[#0E3D2F] shadow transition active:scale-[0.98]"
            >
              Mark Complete
            </button>
            <a
              href={WHATSAPP_PROOF_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border-2 border-white/40 bg-white/10 px-4 py-2.5 font-semibold text-white transition hover:bg-white/20"
            >
              Post Proof 📸
            </a>
          </>
        ) : (
          <span className="rounded-xl bg-white/20 px-4 py-2.5 font-semibold text-white">
            ✓ Completed
          </span>
        )}
      </div>
    </div>
  );
}
