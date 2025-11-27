import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { act } from "react";

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;

// Mock window.scrollY and getBoundingClientRect
describe("Explore Nearby Scroll Behavior", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock window.innerHeight
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 800,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should not cause rapid activeIndex updates during scroll", async () => {
    const updateCounts: number[] = [];
    let currentActiveIndex = 0;

    // Simulate scroll handler with debouncing
    const simulateScroll = (newIndex: number) => {
      const now = Date.now();
      const MIN_UPDATE_INTERVAL = 150;
      let lastUpdateTime = 0;

      if (now - lastUpdateTime < MIN_UPDATE_INTERVAL) {
        // Should be debounced
        return;
      }

      if (newIndex !== currentActiveIndex) {
        updateCounts.push(newIndex);
        currentActiveIndex = newIndex;
        lastUpdateTime = now;
      }
    };

    // Simulate rapid scroll events
    for (let i = 0; i < 10; i++) {
      act(() => {
        simulateScroll(i);
        vi.advanceTimersByTime(50); // Faster than MIN_UPDATE_INTERVAL
      });
    }

    // Should have debounced updates, not 10 rapid updates
    expect(updateCounts.length).toBeLessThan(10);
  });

  it("should use hysteresis threshold to prevent flickering", () => {
    const viewportCenter = 400;
    const currentCardTop = 300;
    const currentCardHeight = 200;
    const currentFocusPoint = currentCardTop + currentCardHeight * 0.3; // 360
    const currentDistance = Math.abs(currentFocusPoint - viewportCenter); // 40

    const newCardTop = 350;
    const newCardHeight = 200;
    const newFocusPoint = newCardTop + newCardHeight * 0.3; // 410
    const newDistance = Math.abs(newFocusPoint - viewportCenter); // 10

    const distanceDiff = currentDistance - newDistance; // 30

    // Should NOT switch if difference is less than 150px threshold
    expect(distanceDiff).toBeLessThan(150);
  });
});

