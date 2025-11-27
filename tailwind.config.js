/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Jungle luxury theme
        background: "#FFFDF7", // Warm sand
        surface: "#FFFFFF", // White cards
        "text-primary": "#1F2933", // Deep charcoal
        "text-muted": "#6B7280", // Muted text
        "accent-1": "#0E3D2F", // Deep jungle green
        "accent-2": "#1C736A", // Ocean teal
        highlight: "#F3B44C", // Mango gold
        border: "#E7E4DF", // Borders/lines
        // Legacy colors for compatibility
        "background-subtle": "#F8FAF9",
        primary: "#0E3D2F",
        "primary-hover": "#0A2F22",
        accent: "#F3B44C",
        foreground: "#1F2933",
        "muted-foreground": "#6B7280",
        success: "#1E9D73",
        error: "#E24E3A",
        "contrast-dark": "#0E2E22",
      },
      fontFamily: {
        display: ["Playfair Display", "var(--font-recoleta)", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "var(--font-sans)", "system-ui", "ui-sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.04)",
        hover: "0 6px 16px rgba(0,0,0,0.08)",
        focus: "0 0 0 4px rgba(215,162,95,0.35)",
      },
      borderRadius: {
        card: "16px",
        pill: "9999px",
      },
      transitionTimingFunction: {
        natural: "cubic-bezier(0.25, 0.8, 0.25, 1)",
      },
      backgroundImage: {
        "day1-jungle": "linear-gradient(135deg, #0E3D2F 0%, #1C5A47 100%)",
        "day2-beach": "linear-gradient(135deg, #F3B44C 0%, #E8964C 50%, #D67E3C 100%)",
        "day3-forest": "linear-gradient(135deg, #1C5A47 0%, #2D6B57 50%, #0E3D2F 100%)",
        "day4-adventure": "linear-gradient(135deg, #E8964C 0%, #D67E3C 50%, #B85E2C 100%)",
        "day5-catamaran": "linear-gradient(135deg, #1C736A 0%, #2A9D91 50%, #1C736A 100%)",
        "day6-departures": "linear-gradient(135deg, #E8D5B7 0%, #F3E8D8 50%, #E8D5B7 100%)",
      },
    },
  },
  plugins: [],
};
