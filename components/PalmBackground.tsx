"use client";

import React from "react";
import clsx from "clsx";

type PalmBackgroundProps = {
  className?: string;
};

export function PalmBackground({ className }: PalmBackgroundProps) {
  return (
    <div
      className={clsx(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="absolute -right-20 -top-10 h-80 w-80 opacity-15"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top-right palm frond */}
        <g stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round">
          <path d="M40 260 C 80 210, 140 190, 260 150" />
          <path d="M60 260 C 95 220, 150 200, 260 165" />
          <path d="M80 260 C 110 230, 165 210, 260 180" />
          {/* small leaves coming off the stem */}
          <path d="M130 220 C 115 200, 105 190, 95 185" />
          <path d="M150 212 C 135 192, 125 182, 115 176" />
          <path d="M170 204 C 155 184, 145 174, 135 168" />
        </g>
      </svg>

      <svg
        className="absolute -left-32 bottom-0 h-72 w-72 opacity-12"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bottom-left palm frond */}
        <g stroke="rgba(255,255,255,0.6)" strokeWidth="1.3" strokeLinecap="round">
          <path d="M260 40 C 200 80, 135 120, 40 180" />
          <path d="M260 60 C 205 95, 145 130, 50 185" />
          <path d="M260 80 C 210 110, 155 140, 60 190" />
          <path d="M190 100 C 205 120, 215 130, 225 136" />
          <path d="M170 112 C 185 132, 195 142, 205 148" />
          <path d="M150 124 C 165 144, 175 154, 185 160" />
        </g>
      </svg>
    </div>
  );
}

