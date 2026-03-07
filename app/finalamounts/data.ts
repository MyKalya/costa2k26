export interface ParticipantExpenses {
  day1: {
    secondEtransfer: number;
    groceryHaul: number;
    airportTransfer: number;
    privateChef2: number;
    privateChefTip: number;
    bakeryHaul: number;
  };
  day2: {
    toTam1: number;
    toHP2: number;
    crazyMonkeyBar: number;
    crazyMonkeyBill: number;
  };
  day3: {
    laLeona: number;
    raftingPics: number;
    tourGuidesTip: number;
    santosTip: number;
  };
  day4: {
    shotsTam: number;
    horseback: number;
    chef3: number;
  };
  day5: {
    catamaranTip: number;
    tamarindoRide: number;
    yoga: number;
  };
  day6: {
    staffTip: number;
    airportTransfer: number;
    adjustments: number;
  };
}

export interface Participant {
  name: string;
  totalOwed: number;
  expenses: ParticipantExpenses;
}

function p(
  name: string,
  totalOwed: number,
  se: number,   // secondEtransfer
  gh: number,   // groceryHaul
  at1: number,  // airportTransfer day1
  pc2: number,  // privateChef2
  pct: number,  // privateChefTip
  bh: number,   // bakeryHaul
  tt1: number,  // toTam1
  thp: number,  // toHP2
  cmb: number,  // crazyMonkeyBar
  cmbi: number, // crazyMonkeyBill
  ll: number,   // laLeona
  rp: number,   // raftingPics
  tgt: number,  // tourGuidesTip
  st: number,   // santosTip
  sh: number,   // shotsTam
  hb: number,   // horseback
  ch3: number,  // chef3
  cmt: number,  // catamaranTip
  tr: number,   // tamarindoRide
  yo: number,   // yoga
  stp: number,  // staffTip
  at6: number,  // airportTransfer day6
  adj: number,  // adjustments
): Participant {
  return {
    name,
    totalOwed,
    expenses: {
      day1: { secondEtransfer: se, groceryHaul: gh, airportTransfer: at1, privateChef2: pc2, privateChefTip: pct, bakeryHaul: bh },
      day2: { toTam1: tt1, toHP2: thp, crazyMonkeyBar: cmb, crazyMonkeyBill: cmbi },
      day3: { laLeona: ll, raftingPics: rp, tourGuidesTip: tgt, santosTip: st },
      day4: { shotsTam: sh, horseback: hb, chef3: ch3 },
      day5: { catamaranTip: cmt, tamarindoRide: tr, yoga: yo },
      day6: { staffTip: stp, airportTransfer: at6, adjustments: adj },
    },
  };
}

//                   name           total    se      gh      at1    pc2    pct   bh     tt1   thp   cmb    cmbi   ll     rp    tgt   st    sh     hb     ch3    cmt   tr    yo     stp    at6    adj
export const PARTICIPANTS: Participant[] = [
  p("Aatharsha",     503.29,        0,       121.43, 0,     57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 11.53, 0,     53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("Aksaran",       538.15,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 0,    4.30, 3.44, 0,     0,     53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 35.47),
  p("Andrew",        318.09,        230.92,  121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 0,     0,     53.94, 7.10, 8.87, 0,     12.53, 16.23, -402.60),
  p("Arun",          489.77,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 0,     0,     53.94, 7.10, 8.87, 0,     12.53, 16.23, 0),
  p("Aruyan",        472.90,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 11.53, 0,     53.94, 7.10, 8.87, 0,     12.53, 16.23, -28.39),
  p("Athira",        509.34,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 0,     0,     53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("BallerSai",     848.93,        230.92,  121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 11.53, 97.14, 53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("Deleep",        489.77,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 0,     0,     53.94, 7.10, 8.87, 0,     12.53, 16.23, 0),
  p("Harish",        409.75,        0,       121.43, 0,     57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 0,     71.15, 6.65, 4.30, 3.44, 0,     0,     53.94, 0,    0,    0,     12.53, 0,     0),
  p("Januka",        588.91,        0,       121.43, 0,     57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 0,     97.14, 53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("Kajamugi",      618.01,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 11.53, 97.14, 53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("Keerthana",     618.01,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 11.53, 97.14, 53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("Khandee",       425.72,        0,       121.43, 0,     57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 0,     71.15, 6.65, 4.30, 3.44, 0,     0,     53.94, 7.10, 8.87, 0,     12.53, 0,     0),
  p("Kimia",         618.01,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 11.53, 97.14, 53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("Maathushan",    489.77,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 0,     0,     53.94, 7.10, 8.87, 0,     12.53, 16.23, 0),
  p("Madhumita",     618.01,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 11.53, 97.14, 53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("Mathan",        520.87,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 11.53, 0,     53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("Mathushan",     520.87,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 11.53, 0,     53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("Methuraan",     569.85,        0,       121.43, 0,     57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 0,     0,     53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 78.08),
  p("Netharshan",    455.97,        0,       121.43, 0,     57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 0,     0,     53.94, 7.10, 8.87, 0,     12.53, 0,     0),
  p("Nick",          655.72,        230.92,  121.43, 0,     0,     6.68, 6.63,  0,    8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 0,     0,     53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("Priya",         606.48,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 0,     97.14, 53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("Raja",          213.49,        230.92,  121.43, 0,     57.81, 6.68, 6.63,  0,    0,    47.45, 0,     71.15, 0,    0,    0,    0,     0,     53.94, 7.10, 8.87, 0,     12.53, 0,     -411.00),
  p("Rajiv",         472.90,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 11.53, 0,     53.94, 7.10, 8.87, 0,     12.53, 16.23, -28.39),
  p("Rishega",       819.83,        230.92,  121.43, 0,     57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 0,     97.14, 53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("Ro",            414.65,        0,       121.43, 0,     57.81, 6.68, 0,     9.16, 8.60, 47.45, 0,     71.15, 6.65, 4.30, 3.44, 11.53, 0,     53.94, 0,    0,    0,     12.53, 0,     0),
  p("Shannon",       489.77,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 0,     0,     53.94, 7.10, 8.87, 0,     12.53, 16.23, 0),
  p("Sherrena",      618.01,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 11.53, 97.14, 53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("Shreya",        655.72,        230.92,  121.43, 0,     0,     6.68, 6.63,  0,    8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 0,     0,     53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("Supena",        606.48,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 0,     97.14, 53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("Thasithan",     28.85,         0,       121.43, 0,     57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 11.53, 0,     53.94, 7.10, 8.87, 19.57, 12.53, 16.23, -474.44),
  p("Thithusha",     544.81,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 0,     0,     53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 35.47),
  p("Yanushan",      509.34,        0,       121.43, 17.58, 57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 30.24, 71.15, 6.65, 4.30, 3.44, 0,     0,     53.94, 7.10, 8.87, 19.57, 12.53, 16.23, 0),
  p("Yoyo",          425.72,        0,       121.43, 0,     57.81, 6.68, 6.63,  9.16, 8.60, 47.45, 0,     71.15, 6.65, 4.30, 3.44, 0,     0,     53.94, 7.10, 8.87, 0,     12.53, 0,     0),
];

export interface DayConfig {
  label: string;
  date: string;
  gradientFrom: string;
  gradientTo: string;
  darkText?: boolean;
  items: { key: string; label: string }[];
}

export const DAY_CONFIGS: DayConfig[] = [
  {
    label: "Day 1",
    date: "Feb 13",
    gradientFrom: "#0E3D2F",
    gradientTo: "#1C5A47",
    items: [
      { key: "day1.secondEtransfer", label: "Second E-Transfer" },
      { key: "day1.groceryHaul", label: "Grocery Haul" },
      { key: "day1.airportTransfer", label: "Airport Transfer" },
      { key: "day1.bakeryHaul", label: "Bakery Haul" },
    ],
  },
  {
    label: "Day 2",
    date: "Feb 14",
    gradientFrom: "#C17B2A",
    gradientTo: "#A8621E",
    items: [
      { key: "day2.privateChefBBQ", label: "Private Chef BBQ" },
      { key: "day2.toTam1", label: "Transfer to Tamarindo" },
      { key: "day2.toHP2", label: "Transfer to HP" },
      { key: "day2.crazyMonkeyBar", label: "Crazy Monkey Bar Ticket" },
      { key: "day2.crazyMonkeyBill", label: "Crazy Monkey (Bill)" },
    ],
  },
  {
    label: "Day 3",
    date: "Feb 15",
    gradientFrom: "#1C5A47",
    gradientTo: "#0E3D2F",
    items: [
      { key: "day3.laLeona", label: "La Leona" },
      { key: "day3.raftingPics", label: "Rafting Pics" },
      { key: "day3.tourGuidesTip", label: "Tour Guide Tip" },
      { key: "day3.santosTip", label: "Santos Tip" },
    ],
  },
  {
    label: "Day 4",
    date: "Feb 16",
    gradientFrom: "#9B4A1A",
    gradientTo: "#7A3512",
    items: [
      { key: "day4.shotsTam", label: "Shots at Tamarindo" },
      { key: "day4.horseback", label: "Horseback Riding" },
      { key: "day4.chef3", label: "Chef - Ceviche Night" },
    ],
  },
  {
    label: "Day 5",
    date: "Feb 17",
    gradientFrom: "#1C736A",
    gradientTo: "#155C54",
    items: [
      { key: "day5.catamaranTip", label: "Catamaran Tip" },
      { key: "day5.tamarindoRide", label: "Tamarindo Ride" },
      { key: "day5.yoga", label: "Yoga" },
    ],
  },
  {
    label: "Day 6",
    date: "Feb 18",
    gradientFrom: "#4A4035",
    gradientTo: "#6B5A4A",
    items: [
      { key: "day6.staffTip", label: "Staff Tip" },
      { key: "day6.airportTransfer", label: "Airport Transfer" },
      { key: "day6.adjustments", label: "Adjustments" },
    ],
  },
];

export function getExpenseValue(participant: Participant, key: string): number {
  // Combined line: Private Chef BBQ = Private Chef #2 + Private Chef Tip (shown under Day 2)
  if (key === "day2.privateChefBBQ") {
    return (participant.expenses.day1.privateChef2 ?? 0) + (participant.expenses.day1.privateChefTip ?? 0);
  }
  const [day, field] = key.split(".") as [keyof ParticipantExpenses, string];
  const dayExpenses = participant.expenses[day] as Record<string, number>;
  return dayExpenses[field] ?? 0;
}
