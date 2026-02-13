"use client";

import { useState, useEffect } from "react";
import { NameSelect } from "./components/NameSelect";
import { MyMissionsView } from "./components/MyMissionsView";
import { LeaderboardView } from "./components/LeaderboardView";
import { AdminView } from "./components/AdminView";
import { AdminPinPrompt } from "./components/AdminPinPrompt";
import {
  MissionsTabs,
  type TabId,
} from "./components/MissionsTabs";
import { useMissions } from "./hooks/useMissions";

const STORAGE_KEY_ADMIN_VERIFIED = "costa2k26_admin_pin_verified";

export default function MissionsPage() {
  const [mounted, setMounted] = useState(false);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [tab, setTab] = useState<TabId>("missions");
  const [adminPinVerified, setAdminPinVerified] = useState(false);

  const { currentPlayer, isAdmin } = useMissions(playerId);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const id = localStorage.getItem("costa2k26_missions_player_id");
    setPlayerId(id);
  }, [mounted, currentPlayer?.id]);

  // Reset admin PIN verification when switching away from Mathushan
  useEffect(() => {
    if (currentPlayer?.id !== "p-mathushan") {
      setAdminPinVerified(false);
      if (typeof sessionStorage !== "undefined") sessionStorage.removeItem(STORAGE_KEY_ADMIN_VERIFIED);
    }
  }, [currentPlayer?.id]);

  // Restore session-only PIN verification (same tab)
  useEffect(() => {
    if (!mounted || !isAdmin) return;
    const verified = sessionStorage.getItem(STORAGE_KEY_ADMIN_VERIFIED);
    if (verified === "1") setAdminPinVerified(true);
  }, [mounted, isAdmin]);

  const handleAdminVerified = () => {
    setAdminPinVerified(true);
    sessionStorage.setItem(STORAGE_KEY_ADMIN_VERIFIED, "1");
  };

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

  const showAdminTab = isAdmin;
  const showAdminContent = tab === "admin" && (adminPinVerified ? true : false);

  return (
    <>
      {tab === "missions" && <MyMissionsView playerId={playerId} />}
      {tab === "leaderboard" && <LeaderboardView playerId={playerId} />}
      {tab === "admin" && !adminPinVerified && <AdminPinPrompt onVerified={handleAdminVerified} />}
      {tab === "admin" && adminPinVerified && <AdminView playerId={playerId} />}
      <MissionsTabs
        active={tab}
        onSelect={setTab}
        showAdmin={showAdminTab}
      />
    </>
  );
}
