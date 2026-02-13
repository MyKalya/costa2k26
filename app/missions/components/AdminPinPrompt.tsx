"use client";

import { useState, FormEvent } from "react";

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN ?? "8181";

interface AdminPinPromptProps {
  onVerified: () => void;
}

export function AdminPinPrompt({ onVerified }: AdminPinPromptProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (pin === ADMIN_PIN) {
      onVerified();
    } else {
      setError("Wrong PIN. Try again.");
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 pb-28 pt-6">
      <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
        <h2 className="mb-2 text-xl font-bold text-white">Admin access</h2>
        <p className="mb-4 text-sm text-white/80">Enter the 4-digit PIN to open the admin panel.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            placeholder="••••"
            className="w-full rounded-xl bg-white/10 px-4 py-3 text-center text-lg tracking-[0.5em] text-white placeholder-white/40"
          />
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-[#F3B44C] py-2.5 font-bold text-[#0E3D2F]"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}
