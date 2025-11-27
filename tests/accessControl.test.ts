import { describe, expect, it, vi } from "vitest";

import { AccessCodeManager, copyWifiPassword } from "../lib/roomControls";

describe("AccessCodeManager", () => {
  it("auto-hides access codes after 10 seconds", () => {
    vi.useFakeTimers();
    const manager = new AccessCodeManager(10_000);
    const expireSpy = vi.fn();

    manager.reveal("14-master", expireSpy);
    expect(manager.isVisible("14-master")).toBe(true);

    vi.advanceTimersByTime(9_999);
    expect(expireSpy).not.toHaveBeenCalled();
    expect(manager.isVisible("14-master")).toBe(true);

    vi.advanceTimersByTime(1);
    expect(expireSpy).toHaveBeenCalledWith("14-master");
    expect(manager.isVisible("14-master")).toBe(false);

    vi.useRealTimers();
  });
});

describe("copyWifiPassword", () => {
  it("copies only the Wi-Fi password when available", async () => {
    const writer = vi.fn(() => Promise.resolve());
    const wifi = { ssid: "Bosques14", password: "Puravida14" };

    const success = await copyWifiPassword(wifi, writer);

    expect(success).toBe(true);
    expect(writer).toHaveBeenCalledWith("Puravida14");

    const fail = await copyWifiPassword({ ssid: "NoPass" }, writer);
    expect(fail).toBe(false);
    expect(writer).toHaveBeenCalledTimes(1);
  });
});
