"use client";

import { Target, Trophy, Settings } from "lucide-react";

export type TabId = "missions" | "leaderboard" | "admin";

interface MissionsTabsProps {
  active: TabId;
  onSelect: (tab: TabId) => void;
  showAdmin: boolean;
}

const TABS: { id: TabId; label: string; Icon: typeof Target }[] = [
  { id: "missions", label: "My Missions", Icon: Target },
  { id: "leaderboard", label: "Leaderboard", Icon: Trophy },
  { id: "admin", label: "Admin", Icon: Settings },
];

export function MissionsTabs({
  active,
  onSelect,
  showAdmin,
}: MissionsTabsProps) {
  const tabs = showAdmin ? TABS : TABS.filter((t) => t.id !== "admin");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex border-t border-white/20 bg-[#0E3D2F]/95 backdrop-blur-md safe-area-pb">
      <div className="mx-auto flex w-full max-w-lg">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`flex flex-1 flex-col items-center gap-1 py-3 text-sm transition ${
              active === id
                ? "text-[#F3B44C]"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Icon className="h-6 w-6" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
