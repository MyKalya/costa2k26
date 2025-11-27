"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  Suspense,
  type ForwardedRef,
  type ReactNode,
  type RefObject,
} from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Cigarette,
  Copy,
  Lock,
  Search,
  Snowflake,
  Trash2,
  Wifi,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { VILLAS, ROOMS, ZONES, ROOM_DETAILS, VILLA_ORDER, type Zone } from "@/app/data/rooms";
import { AccessCodeManager, copyWifiPassword } from "@/lib/roomControls";

type VillaId = (typeof VILLA_ORDER)[number];

type AccessState = { visible: boolean; expiresAt: number };

type RoomInfo = ReturnType<typeof toRoomInfo>;

type ZoneConfig = {
  id: string;
  name: string;
  description: string;
  rooms: readonly string[] | string[];
};

type GuestEntry = {
  id: string;
  name: string;
  villa: VillaId;
  roomId: string;
  zoneId: string;
};

const CHECK_IN_UNLOCK = new Date("2026-02-13T07:00:00-06:00").getTime();
const DOOR_REVEAL_MS = 10_000;
const PULSE_DURATION_MS = 1_500;

const QUICK_ACTIONS = [
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
  { id: "door", label: "Door code", icon: Lock },
] as const;

type QuickActionId = (typeof QUICK_ACTIONS)[number]["id"];

type RoomCardProps = {
  room: RoomInfo;
  expanded: boolean;
  onToggle: () => void;
  highlighted: boolean;
  onShareGuest: (villa: string, guestId: string, guestName: string) => void;
};

const HERO_FALLBACK = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop";

function RoomsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialVilla = (searchParams.get("villa") as VillaId | null) ?? VILLA_ORDER[0];
  const initialGuestFromQuery = searchParams.get("guestId") ?? "";

  const [selectedVilla, setSelectedVilla] = useState<VillaId>(
    VILLA_ORDER.includes(initialVilla as VillaId) ? (initialVilla as VillaId) : VILLA_ORDER[0],
  );
  const [selectedGuest, setSelectedGuest] = useState(initialGuestFromQuery);
  const [toast, setToast] = useState<string | null>(null);
  const [highlightRoomId, setHighlightRoomId] = useState<string | null>(null);
  const [expandedZones, setExpandedZones] = useState<Record<string, boolean>>({});
  const [expandedRooms, setExpandedRooms] = useState<Record<string, boolean>>({});
  const [doorState, setDoorState] = useState<Record<VillaId, AccessState>>({} as Record<VillaId, AccessState>);
  const [doorTimerTick, setDoorTimerTick] = useState(Date.now());
  const [activeSheet, setActiveSheet] = useState<"wifi" | "door" | null>(null);
  const [doorInstructionsExpanded, setDoorInstructionsExpanded] = useState(false);
  const [carouselCompact, setCarouselCompact] = useState(false);

  const roomRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const accessManager = useMemo(() => new AccessCodeManager(DOOR_REVEAL_MS), []);

  const guestEntries = useMemo<GuestEntry[]>(() => {
    const entries: GuestEntry[] = [];
    const seen = new Set<string>();
    ROOMS.forEach((room) => {
      const villa = room.villa as VillaId;
      const zoneId = getZoneId(villa, room.id);
      room.occupants.forEach((name) => {
        const id = slugify(name);
        if (!id || seen.has(id)) return;
        seen.add(id);
        entries.push({ id, name, villa, roomId: room.id, zoneId });
      });
    });
    return entries.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const guestMap = useMemo(() => {
    const map: Record<string, GuestEntry> = {};
    guestEntries.forEach((entry) => {
      map[entry.id] = entry;
    });
    return map;
  }, [guestEntries]);

  useEffect(() => () => accessManager.dispose(), [accessManager]);

  useEffect(() => {
    const handleScroll = () => {
      setCarouselCompact(window.scrollY > 140);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    const hasVisible = Object.values(doorState).some((state) => state?.visible);
    if (!hasVisible) return;
    const id = setInterval(() => setDoorTimerTick(Date.now()), 200);
    return () => clearInterval(id);
  }, [doorState]);

  const routerReplace = useCallback(
    (params: Record<string, string | null>) => {
      const current = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (!value) {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });
      const query = current.toString();
      router.replace(query ? `?${query}` : "?", { scroll: false });
    },
    [router, searchParams],
  );

  useEffect(() => {
    routerReplace({
      villa: selectedVilla,
      guestId: selectedGuest || null,
    });
  }, [selectedVilla, selectedGuest, routerReplace]);

  useEffect(() => {
    setExpandedRooms({});
  }, [selectedVilla]);

  useEffect(() => {
    if (!selectedGuest) return;
    const entry = guestMap[selectedGuest];
    if (!entry) return;
    if (entry.villa !== selectedVilla) {
      setSelectedVilla(entry.villa);
      setTimeout(() => focusRoom(entry), 180);
    } else {
      focusRoom(entry);
    }
  }, [selectedGuest, guestMap, selectedVilla]);

  const villaRooms = useMemo(() => ROOMS.filter((room) => room.villa === selectedVilla), [selectedVilla]);

  const roomsByZone = useMemo(() => {
    const grouped: Record<string, RoomInfo[]> = {};
    villaRooms
      .forEach((room) => {
        const zoneId = getZoneId(selectedVilla, room.id);
        grouped[zoneId] ??= [];
        grouped[zoneId].push(toRoomInfo(room));
      });
    return grouped;
  }, [villaRooms, selectedVilla]);

  const fallbackZone = (roomsByZone["unknown"] ?? []).length
    ? [
        {
          id: "unknown",
          name: "Unassigned rooms",
          description: "Rooms waiting on a zone assignment.",
          rooms: (roomsByZone["unknown"] ?? []).map((room) => room.id),
        },
      ]
    : [];

  const zonesForVilla = useMemo(
    () => [...(ZONES[selectedVilla] ?? []), ...fallbackZone],
    [selectedVilla, fallbackZone],
  );

  const emptyState = zonesForVilla.every((zone) => (roomsByZone[zone.id] ?? []).length === 0);

  const doorInfo = doorState[selectedVilla];
  const doorRemaining = doorInfo?.visible ? Math.max(0, doorInfo.expiresAt - doorTimerTick) : 0;
  const doorProgress = doorInfo?.visible ? doorRemaining / DOOR_REVEAL_MS : 0;

  const wifiSheet = activeSheet === "wifi" && VILLAS[selectedVilla]?.wifi ? (
    <BottomSheet onClose={() => setActiveSheet(null)}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-sans text-base font-semibold text-foreground">Villa Wi-Fi</h3>
          <p className="text-sm text-muted">Tap copy to send to your clipboard.</p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            handleCopyWifi();
            setActiveSheet(null);
          }}
        >
          Copy all
        </Button>
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <InfoRow label="SSID" value={VILLAS[selectedVilla]!.wifi!.ssid} />
        <InfoRow label="Password" value={VILLAS[selectedVilla]!.wifi!.password} mono />
      </div>
    </BottomSheet>
  ) : null;

  const doorCode = VILLAS[selectedVilla]?.accessCode;
  const doorSheet = activeSheet === "door" && doorCode ? (
    <BottomSheet
      onClose={() => {
        setActiveSheet(null);
        setDoorInstructionsExpanded(false);
      }}
    >
      <div>
        <h3 className="font-sans text-base font-semibold text-foreground">
          Door Code for Villa {selectedVilla}
        </h3>
        <div className="mt-6">
          <div>
            <span className="font-sans text-3xl font-bold text-foreground">{doorCode}</span>
          </div>
          <div className="my-4 border-t border-border" />
          <button
            type="button"
            onClick={() => setDoorInstructionsExpanded((prev) => !prev)}
            className="flex w-full items-center justify-between gap-4 text-left"
            aria-expanded={doorInstructionsExpanded}
          >
            <span className="text-sm font-semibold text-foreground">How to use the lock</span>
            <ChevronDown
              className={`h-4 w-4 flex-shrink-0 text-muted transition-transform ${
                doorInstructionsExpanded ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>
          {doorInstructionsExpanded && (
            <div className="mt-3 text-sm leading-relaxed text-muted">
              <p>
                Tap the display to wake it up. A set of random numbers will light up. Press all the illuminated
                numbers, then enter the code. After entering the code, tap the lock icon in the bottom right to unlock
                the door. When leaving, press the same button to activate the deadbolt and lock the home.
              </p>
            </div>
          )}
        </div>
      </div>
    </BottomSheet>
  ) : null;

  const heroImage = "/media/villas/villas.avif";

  return (
    <div className="bg-background text-foreground">
      <div className="bg-[#FFFDF7]">
        <header className="mx-auto mt-4 w-full max-w-6xl px-4 pb-4">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-hover">
            <div className="absolute inset-0">
              <Image
                src={heroImage}
                alt={`${VILLAS[selectedVilla]?.name ?? "Costa Rica villa"}`}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background" />
            </div>
            <div className="relative z-10 flex flex-col gap-3 px-6 py-10 text-center text-white sm:px-10 sm:py-12">
              <h1 className="font-recoleta text-[clamp(2.5rem,7vw,4rem)] uppercase tracking-[0.04em]">Your Villa & Room Assignments</h1>
              <p className="text-base text-white/85 sm:text-lg">Find your room, your villa, and your crew.</p>
            </div>
          </div>
        </header>

        <VillaCarousel
          ref={carouselRef}
          compact={carouselCompact}
          selected={selectedVilla}
          onSelect={(villa) => {
            setSelectedVilla(villa);
            setSelectedGuest("");
            window.scrollTo({ top: carouselRef.current?.offsetTop ?? 0, behavior: "smooth" });
          }}
        />

        <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6">
        <section className="space-y-4">
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
            <VillaQuickActions
              villaId={selectedVilla}
              meta={VILLAS[selectedVilla]}
              onAction={(id) => {
                if (id === "wifi") setActiveSheet("wifi");
                if (id === "door") setActiveSheet("door");
              }}
            />
            <GuestFinder
              options={guestEntries}
              selectedGuestId={selectedGuest}
              onSelect={(entry) => setSelectedGuest(entry.id)}
              onClear={() => setSelectedGuest("")}
            />
          </div>

          {emptyState ? (
            <div className="rounded-2xl border border-border bg-surface p-6 text-sm text-muted">
              No rooms in this villa.
            </div>
          ) : (
            <div className="space-y-4">
              {zonesForVilla.map((zone, index) => {
                const rooms = roomsByZone[zone.id] ?? [];
                const zoneKey = `${selectedVilla}-${zone.id}`;
                const expanded = expandedZones[zoneKey] ?? true;
                return (
                  <AnimatedZoneSection
                    key={zoneKey}
                    zone={zone}
                    expanded={expanded}
                    isFirst={index === 0}
                    onToggle={() =>
                      setExpandedZones((prev) => ({ ...prev, [zoneKey]: !expanded }))
                    }
                    rooms={rooms}
                    expandedRooms={expandedRooms}
                    onToggleRoom={(roomId) =>
                      setExpandedRooms((prev) => ({ ...prev, [roomId]: !prev[roomId] }))
                    }
                    roomRefs={roomRefs}
                    highlightedRoomId={highlightRoomId}
                    onShareGuest={handleShareGuestLink}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>
      </div>

      {/* House Rules Section */}
      <AnimatedHouseRules />

      {toast ? <Toast message={toast} /> : null}
      {wifiSheet}
      {doorSheet}
    </div>
  );

  function handleCopyWifi() {
    const wifi = VILLAS[selectedVilla]?.wifi;
    if (!wifi) {
      setToast("No Wi-Fi password available");
      return;
    }
    copyWifiPassword(wifi)
      .then((success) => setToast(success ? `Password copied for ${wifi.ssid}` : "No Wi-Fi password available"))
      .catch(() => setToast("Unable to copy password"));
  }

  function handleCopyDoor() {
    const code = VILLAS[selectedVilla]?.accessCode;
    if (!code) {
      setToast("No door code available");
      return;
    }
    navigator.clipboard
      .writeText(code)
      .then(() => setToast("Door code copied"))
      .catch(() => setToast("Unable to copy code"));
  }

  function handleDoorReveal() {
    if (Date.now() < CHECK_IN_UNLOCK) {
      setToast("For check-in only");
      return;
    }
    const state = doorState[selectedVilla];
    if (state?.visible) {
      accessManager.hide(selectedVilla);
      setDoorState((prev) => ({ ...prev, [selectedVilla]: { visible: false, expiresAt: 0 } }));
      return;
    }
    accessManager.reveal(selectedVilla, (id) => {
      setDoorState((prev) => ({ ...prev, [id as VillaId]: { visible: false, expiresAt: 0 } }));
    });
    setDoorState((prev) => ({
      ...prev,
      [selectedVilla]: { visible: true, expiresAt: Date.now() + DOOR_REVEAL_MS },
    }));
  }

  function focusRoom(entry: GuestEntry) {
    setExpandedZones((prev) => ({ ...prev, [`${entry.villa}-${entry.zoneId}`]: true }));
    setTimeout(() => {
      const el = roomRefs.current[entry.roomId];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightRoomId(entry.roomId);
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const duration = mediaQuery.matches ? 0 : PULSE_DURATION_MS;
        if (duration > 0) {
          setTimeout(() => setHighlightRoomId((current) => (current === entry.roomId ? null : current)), duration);
        } else {
          setHighlightRoomId((current) => (current === entry.roomId ? null : current));
        }
      }
    }, 220);
  }

  function handleShareGuestLink(villa: string, guestId: string, guestName: string) {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}/rooms?villa=${villa}&guestId=${guestId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => setToast(`Share link copied for ${guestName}`))
      .catch(() => setToast("Unable to copy link"));
  }
}

export default function RoomsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <RoomsPageContent />
    </Suspense>
  );
}

const VillaCarousel = forwardRef<HTMLDivElement, {
  compact: boolean;
  selected: VillaId;
  onSelect: (villa: VillaId) => void;
}>(function VillaCarousel({ compact, selected, onSelect }, ref) {
  return (
    <div className={`sticky z-40 mt-4 border-b border-border bg-[#ECF4EF] px-4 transition-all ${compact ? "top-0 shadow-card" : "top-6"}`}>
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 py-3">
        <button
          type="button"
          className="hidden h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent sm:flex"
          onClick={() => scrollCarousel(ref as RefObject<HTMLDivElement>, "left")}
          aria-label="Scroll villas left"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div ref={ref} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
          {VILLA_ORDER.map((villaId) => {
            const meta = VILLAS[villaId];
            const active = selected === villaId;
            const image = meta?.heroImage ?? "/media/villas/villas.avif";
            return (
              <button
                key={villaId}
                type="button"
                onClick={() => onSelect(villaId)}
                className={`group relative flex w-52 shrink-0 snap-center flex-col overflow-hidden rounded-2xl border bg-surface text-left shadow-card transition-all focus-visible:ring-2 focus-visible:ring-accent hover:scale-105 hover:shadow-md ${
                  active ? "border-[#134E4A] shadow-hover" : "border-border hover:border-[#134E4A]/40"
                }`}
              >
                <div className="relative h-28 w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={meta?.name ?? `Villa ${villaId}`}
                    fill
                    sizes="(max-width: 768px) 208px, 208px"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#134E4A]/20 via-[#134E4A]/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="flex flex-col gap-1 px-4 py-3">
                  <span className="text-sm font-semibold text-foreground">{meta?.name ?? `Villa ${villaId}`}</span>
                  <span className="text-xs text-muted">Sleeps {meta?.sleeps ?? "--"} • {meta?.beds ?? "-"} beds • {ROOMS.filter((room) => room.villa === villaId).length} rooms</span>
                </div>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="hidden h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent sm:flex"
          onClick={() => scrollCarousel(ref as RefObject<HTMLDivElement>, "right")}
          aria-label="Scroll villas right"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
});

const VillaQuickActions = ({
  villaId,
  meta,
  onAction,
}: {
  villaId: VillaId;
  meta?: (typeof VILLAS)[VillaId];
  onAction: (id: QuickActionId) => void;
}) => (
  <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 className="font-sans text-lg font-semibold text-[#134E4A]">{meta?.name ?? `Villa ${villaId}`}</h2>
      <p className="text-sm text-[#4C625E]">
        Sleeps {meta?.sleeps ?? "--"} • {meta?.beds ?? "-"} beds • {ROOMS.filter((room) => room.villa === villaId).length} rooms
      </p>
    </div>
    <div className="flex flex-wrap items-center gap-2">
      {QUICK_ACTIONS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onAction(id)}
          className="inline-flex items-center gap-2 rounded-pill border border-[#134E4A] bg-transparent px-3 py-2 text-xs font-medium text-[#134E4A] transition hover:bg-[#F4FBF7] focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Icon className="h-4 w-4" aria-hidden />
          {label}
        </button>
      ))}
    </div>
  </div>
);

const GuestFinder = ({
  options,
  selectedGuestId,
  onSelect,
  onClear,
}: {
  options: GuestEntry[];
  selectedGuestId: string;
  onSelect: (entry: GuestEntry) => void;
  onClear: () => void;
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!selectedGuestId) {
      setQuery("");
      return;
    }
    const match = options.find((option) => option.id === selectedGuestId);
    if (match) {
      setQuery(match.name);
    }
  }, [selectedGuestId, options]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return options;
    return options.filter((option) => option.name.toLowerCase().includes(value));
  }, [options, query]);

  return (
    <div ref={containerRef} className="relative w-full sm:max-w-xs">
      <label htmlFor="guest-select" className="text-xs font-semibold uppercase tracking-wide text-muted">
        Find a guest
      </label>
      <div className="mt-1 flex items-center gap-2 rounded-pill border border-border bg-background-subtle px-4 py-2 shadow-card focus-within:border-[#134E4A] focus-within:ring-2 focus-within:ring-[#134E4A]/20">
        <Search className="h-4 w-4 text-muted" aria-hidden />
        <input
          id="guest-select"
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search guest list"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted outline-none"
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
        />
        {query ? (
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => {
              setQuery("");
              onClear();
              inputRef.current?.focus();
              setOpen(false);
            }}
            aria-label="Clear selection"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      {open && filtered.length ? (
        <ul
          role="listbox"
          className="absolute left-0 right-0 z-40 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-border bg-surface p-2 shadow-hover"
        >
          {filtered.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                role="option"
                className="flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2 text-left text-sm text-foreground transition hover:bg-background-subtle focus-visible:ring-2 focus-visible:ring-accent"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setQuery(option.name);
                  onSelect(option);
                  setOpen(false);
                }}
              >
                <span className="font-medium">{option.name}</span>
                <span className="text-xs text-muted">
                  Villa {option.villa} • {option.roomId}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

const AnimatedHouseRules = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto mt-6 w-full max-w-6xl rounded-3xl bg-[#F4FBF7] px-4 py-8 pb-24"
    >
      <div className="mb-6">
        <h2 className="font-sans text-2xl font-semibold text-[#134E4A] sm:text-3xl">House Rules</h2>
        <p className="mt-2 text-sm text-[#4C625E]">
          Same rules for all villas. Quick recap before you arrive.
        </p>
      </div>
      <div className="mx-auto max-w-2xl space-y-3">
        {[
          {
            title: "Smoking Policy",
            content: "No smoking or vaping indoors. Evidence of smoking incurs a $500 fee. Outdoor smoking only.",
            icon: Cigarette,
          },
          {
            title: "Air Conditioning & Electricity",
            content:
              "Set A/C around 72°F / 22°C. Keep doors and windows closed while it's running, and turn it off when you leave the room. The villa charges a $50 USD fee any time A/C is found running with doors open or when no one is in the room.",
            icon: Snowflake,
          },
          {
            title: "Garbage & Pickup",
            content: "Trash collection Mon, Wed, Fri mornings. Bins by the garage. Close lids at night.",
            icon: Trash2,
          },
        ].map((rule) => {
          const key = `rule-${rule.title}`;
          const IconComponent = rule.icon;
          return (
            <HouseRuleCard key={key} rule={rule} IconComponent={IconComponent} />
          );
        })}
      </div>
      <div className="mt-6 text-left">
        <a
          href="/stay#house-rules"
          className="text-sm font-medium text-[#134E4A] underline transition hover:text-[#134E4A]/80"
        >
          See more details on the Stay page
        </a>
      </div>
    </motion.section>
  );
};

const HouseRuleCard = ({
  rule,
  IconComponent,
}: {
  rule: { title: string; content: string };
  IconComponent: React.ComponentType<{ className?: string }>;
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`overflow-hidden rounded-2xl border bg-white shadow-card transition ${expanded ? "border-[#134E4A]" : "border-border"}`}>
      <button
        type="button"
        className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition hover:bg-background-subtle focus-visible:ring-2 focus-visible:ring-accent ${expanded ? "bg-[#F4FBF7]" : ""}`}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <IconComponent className="h-5 w-5 flex-shrink-0 text-[#134E4A] sm:h-6 sm:w-6" />
          <h3 className="font-sans text-base font-semibold text-foreground sm:text-lg">{rule.title}</h3>
        </div>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-muted transition-transform ${expanded ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {expanded && (
        <div className="border-t border-border px-4 pb-3 pt-2">
          <p className="text-sm leading-relaxed text-muted sm:text-base">{rule.content}</p>
        </div>
      )}
    </div>
  );
};

const AnimatedZoneSection = ({
  zone,
  expanded,
  onToggle,
  rooms,
  expandedRooms,
  onToggleRoom,
  roomRefs,
  highlightedRoomId,
  onShareGuest,
  isFirst,
}: {
  zone: ZoneConfig;
  expanded: boolean;
  onToggle: () => void;
  rooms: RoomInfo[];
  expandedRooms?: Record<string, boolean>;
  onToggleRoom?: (roomId: string) => void;
  roomRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  highlightedRoomId: string | null;
  onShareGuest: (villa: string, guestId: string, guestName: string) => void;
  isFirst?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <ZoneSection
        zone={zone}
        expanded={expanded}
        onToggle={onToggle}
        rooms={rooms}
        expandedRooms={expandedRooms}
        onToggleRoom={onToggleRoom}
        roomRefs={roomRefs}
        highlightedRoomId={highlightedRoomId}
        onShareGuest={onShareGuest}
        isFirst={isFirst}
      />
    </motion.div>
  );
};

const ZoneSection = ({
  zone,
  expanded,
  onToggle,
  rooms,
  expandedRooms,
  onToggleRoom,
  roomRefs,
  highlightedRoomId,
  onShareGuest,
  isFirst,
}: {
  zone: ZoneConfig;
  expanded: boolean;
  onToggle: () => void;
  rooms: RoomInfo[];
  expandedRooms?: Record<string, boolean>;
  onToggleRoom?: (roomId: string) => void;
  roomRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  highlightedRoomId: string | null;
  onShareGuest: (villa: string, guestId: string, guestName: string) => void;
  isFirst?: boolean;
}) => (
  <section className="rounded-2xl border-l-2 border-l-[#DDEEE8] border-r border-b border-t border-border bg-surface shadow-card">
    <button
      type="button"
      className={`flex w-full items-center justify-between px-4 py-3 text-left focus-visible:ring-2 focus-visible:ring-accent`}
      onClick={onToggle}
      aria-expanded={expanded}
    >
      <div>
        <h3 className="inline-block rounded-full bg-[#F4FBF7] px-3 py-1 text-base font-semibold text-[#134E4A]">
          {zone.name}
        </h3>
        {zone.description ? <p className="mt-1.5 text-sm leading-tight text-[#4C625E]">{zone.description}</p> : null}
      </div>
      <ChevronDown className={`h-5 w-5 flex-shrink-0 text-muted transition ${expanded ? "rotate-180" : "rotate-0"}`} />
    </button>
    {expanded ? (
      <div className="border-t border-border px-4 pb-4">
        {rooms.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {rooms.map((room) => (
              <ForwardRoomCard
                key={room.id}
                room={room}
                expanded={Boolean(expandedRooms?.[room.id])}
                onToggle={() => onToggleRoom?.(room.id)}
                highlighted={highlightedRoomId === room.id}
                onShareGuest={onShareGuest}
                ref={(node) => {
                  roomRefs.current[room.id] = node;
                }}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-border bg-background-subtle px-4 py-3 text-sm text-muted">
            No rooms in this section.
          </p>
        )}
      </div>
    ) : null}
  </section>
);

const RoomCard = (
  { room, expanded, onToggle, highlighted, onShareGuest }: RoomCardProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const cardClasses = `group relative flex flex-col gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-card transition hover:-translate-y-0.5 hover:border-[#134E4A] hover:shadow-hover focus-within:ring-2 focus-within:ring-accent ${
    expanded ? "border-[#134E4A]" : ""
  } ${highlighted ? "highlight-pulse" : ""}`;

  const hasGuests = room.assignments.length > 0;
  const shortAmenities = room.amenities.slice(0, 2).join(", ") || "";

  return (
    <div ref={ref} id={room.id} className={cardClasses}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h4 className="text-base font-semibold text-foreground">{room.label}</h4>
            {room.ensuite ? (
              <span className="rounded-pill border border-[#134E4A] bg-white px-2 py-[2px] text-[11px] text-[#134E4A]">Ensuite</span>
            ) : null}
            {!hasGuests ? (
              <span className="rounded-pill border border-primary px-2 py-[2px] text-[11px] text-primary">Available</span>
            ) : null}
          </div>
          {shortAmenities ? (
            <p className="mt-1 text-xs text-primary/70">{shortAmenities}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="rounded-full p-1 text-muted transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Toggle room details"
          aria-expanded={expanded}
        >
          <ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : "rotate-0"}`} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {room.assignments.length ? (
          room.assignments.map((guest) => (
            <PersonChip
              key={guest.id}
              name={guest.name}
              villa={room.villa}
              guestId={guest.id}
              onShare={() => onShareGuest(room.villa, guest.id, guest.name)}
            />
          ))
        ) : (
          <span className="text-xs text-muted">Assigning soon</span>
        )}
      </div>

      {expanded ? (
        <div className="space-y-2 text-xs text-muted">
          {room.amenities.length ? (
            <p>
              <span className="font-medium text-foreground">Amenities:</span>{" "}
              <span className="text-primary/80">{room.amenities.join(", ")}</span>
            </p>
          ) : null}
          <p>
            <span className="font-medium text-foreground">Capacity:</span> {formatCapacity(room.capacity)}
          </p>
          {room.note ? <p className="italic text-muted">{room.note}</p> : null}
        </div>
      ) : null}
    </div>
  );
};

const ForwardRoomCard = forwardRef<HTMLDivElement, RoomCardProps>(RoomCard);

function PersonChip({ name, villa, guestId, onShare }: { name: string; villa: string; guestId: string; onShare: () => void }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
  return (
    <button
      type="button"
      onClick={onShare}
      className="inline-flex items-center gap-2 rounded-pill border border-border px-3 py-1 text-xs font-medium text-foreground transition hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={`Copy share link for ${name} in villa ${villa}`}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background-subtle text-[11px] text-[#134E4A]">
        {initials || "•"}
      </span>
      {name}
    </button>
  );
}

const Toast = ({ message }: { message: string }) => (
  <div className="toast text-sm">{message}</div>
);

const BottomSheet = ({ children, onClose }: { children: ReactNode; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/45">
    <button type="button" className="flex-1" onClick={onClose} aria-label="Dismiss" />
    <div className="rounded-t-3xl border border-border bg-surface p-6 shadow-[0_-16px_40px_rgba(0,0,0,0.28)] backdrop-blur">
      {children}
    </div>
  </div>
);

const InfoRow = ({ label, value, mono }: { label: string; value: string; mono?: boolean }) => (
  <div className="flex items-center justify-between rounded-pill border border-border bg-background-subtle px-4 py-3 text-sm text-foreground">
    <span className="text-muted">{label}</span>
    <span className={mono ? "font-mono" : "font-semibold"}>{value}</span>
  </div>
);

function toRoomInfo(room: (typeof ROOMS)[number]) {
  const meta = ROOM_DETAILS[room.id] ?? { ensuite: true, capacity: 2, amenities: [] };
  return {
    villa: room.villa,
    id: room.id,
    label: room.id,
    bedType: room.bed,
    ensuite: meta.ensuite,
    capacity: meta.capacity,
    amenities: meta.amenities ?? [],
    assignments: getAssignments(room.id, room.occupants),
    note: "note" in room ? room.note : "",
    status: room.status,
  };
}

function getAssignments(roomId: string, occupants: readonly string[]) {
  return occupants.map((name) => ({ id: slugify(name) || slugify(roomId), name }));
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getZoneId(villa: VillaId, roomId: string) {
  const zones: Zone[] = ZONES[villa] ?? [];
  for (const zone of zones) {
    if (zone.rooms.includes(roomId)) {
      return zone.id;
    }
  }
  return "unknown";
}

function formatCapacity(capacity?: number) {
  if (!capacity) return "Fits 2";
  return capacity === 1 ? "Fits 1" : `Fits ${capacity}`;
}

function scrollCarousel(ref: RefObject<HTMLDivElement>, direction: "left" | "right") {
  const el = ref.current;
  if (!el) return;
  const distance = el.clientWidth * 0.7;
  el.scrollBy({ left: direction === "left" ? -distance : distance, behavior: "smooth" });
}
