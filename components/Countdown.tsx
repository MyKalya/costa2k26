"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
};

const TARGET_DATE = new Date("2026-02-13T00:00:00-05:00").getTime();

function getTimeLeft(): TimeLeft {
  const now = Date.now();
  const diff = TARGET_DATE - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return { days, hours, minutes };
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 60000); // update every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const { days, hours, minutes } = timeLeft;

  return (
    <div className="inline-flex flex-col items-start gap-1 rounded-xl bg-black/10 px-4 py-3 text-left backdrop-blur-sm">
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/70">
        Trip countdown
      </span>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-white">
          {days <= 0 ? "Today" : `${days} days`}
        </span>
      </div>
      {days > 0 && (
        <span className="text-xs text-white/80">
          {hours.toString().padStart(2, "0")}h {minutes.toString().padStart(2, "0")}m until
          February 13, 2026
        </span>
      )}
    </div>
  );
}

