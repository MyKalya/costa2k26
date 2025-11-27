"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";

const doorCodes = [
  { label: "Villa 14", value: "1418" },
  { label: "Villa 15", value: "1525" },
  { label: "Villa 16", value: "1636" },
];

const wifiNetworks = [
  { label: "Bosques14", value: "Puravida14" },
  { label: "Bosques15", value: "Puravida15" },
  { label: "Bosques16", value: "Puravida16" },
];

export default function GuestPage() {
  return (
    <section className="section">
      <div className="mx-auto grid max-w-2xl gap-6">
        <header className="text-center">
          <h1 className="font-recoleta text-[clamp(2rem,6vw,3.4rem)] uppercase tracking-tight text-foreground">
            Guest Hub
          </h1>
          <p className="mt-1 text-sm text-muted">For our group only.</p>
        </header>

        <div className="grid gap-4">
          <DetailsCard title="Door codes">
            <p className="text-sm text-muted">
              Tap the code then pound sign. Hold until the keypad flashes green and you hear the latch click.
            </p>
            <div className="mt-3 grid gap-2">
              {doorCodes.map((code) => (
                <CopyRow key={code.label} label={code.label} value={code.value} />
              ))}
            </div>
          </DetailsCard>

          <DetailsCard title="Wi-Fi">
            <p className="text-sm text-muted">Networks are per villa. Passwords are case-sensitive.</p>
            <div className="mt-3 grid gap-2">
              {wifiNetworks.map((network) => (
                <CopyRow key={network.label} label={network.label} value={network.value} helper={network.value} />
              ))}
            </div>
          </DetailsCard>

          <DetailsCard title="House rules">
            <ul className="grid gap-2 text-sm text-muted">
              <li>Keep A/C off when doors or windows are open.</li>
              <li>Lights off when you leave a room.</li>
              <li>Close doors at night to keep critters outside.</li>
              <li>$50 fee for lost keys or broken wristbands.</li>
            </ul>
          </DetailsCard>

          <DetailsCard title="Garbage days">
            <p className="text-sm text-muted">
              Pickups Monday, Wednesday, and Friday mornings. Bin is by the garage—secure the lid so raccoons don’t party.
            </p>
          </DetailsCard>

          <DetailsCard title="Emergency">
            <p className="text-sm text-muted">
              Dial <span className="font-semibold text-foreground">911</span>. Address: Bosques Villas #14–16, Hacienda Pinilla.
            </p>
          </DetailsCard>
        </div>
      </div>
    </section>
  );
}

function DetailsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-card border border-border bg-surface p-5 shadow-card">
      <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-foreground">
        {title}
        <span className="text-sm text-muted transition-transform duration-200 ease-natural group-open:rotate-90">
          ›
        </span>
      </summary>
      <div className="mt-3 space-y-3 text-sm text-muted">{children}</div>
    </details>
  );
}

function CopyRow({ label, value, helper }: { label: string; value: string; helper?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Card className="flex items-center justify-between gap-3 border border-border px-4 py-3">
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        {helper ? <div className="text-xs text-muted">{helper}</div> : null}
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-pill border border-border px-3 py-1 text-xs font-semibold text-foreground transition-colors duration-150 ease-natural hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={`Copy ${label}`}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </Card>
  );
}
