"use client";

import { useState, useEffect } from "react";
import { NameSelect } from "./components/NameSelect";
import { MyMissionsView } from "./components/MyMissionsView";
import { LeaderboardView } from "./components/LeaderboardView";
import { AdminView } from "./components/AdminView";
import {
  MissionsTabs,
  type TabId,
} from "./components/MissionsTabs";
import { useMissions } from "./hooks/useMissions";

export default function MissionsPage() {
  const [mounted, setMounted] = useState(false);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [tab, setTab] = useState<TabId>("missions");

  const { currentPlayer, isAdmin } = useMissions(playerId);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const id = localStorage.getItem("costa2k26_missions_player_id");
    setPlayerId(id);
  }, [mounted, currentPlayer?.id]);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white/80">
        Loading...
      </div>
    );
  }

  if (!playerId) {
    return <NameSelect onSelect={() => setPlayerId(localStorage.getItem("costa2k26_missions_player_id"))} />;
  }

  return (
    <>
      {tab === "missions" && <MyMissionsView playerId={playerId} />}
      {tab === "leaderboard" && <LeaderboardView playerId={playerId} />}
      {tab === "admin" && <AdminView playerId={playerId} />}
      <MissionsTabs
        active={tab}
        onSelect={setTab}
        showAdmin={isAdmin}
      />
    </>
  );
}
