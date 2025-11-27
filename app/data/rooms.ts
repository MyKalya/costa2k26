export const VILLAS = {
  "14": {
    name: "Villa 14",
    sleeps: 12,
    beds: 5,
    baths: 6,
    wifi: { ssid: "Bosques14", password: "Puravida14" },
    accessCode: "1418",
    heroImage: "/images/stay/villa 14.avif",
  },
  "15": {
    name: "Villa 15",
    sleeps: 14,
    beds: 6,
    baths: 8,
    wifi: { ssid: "Bosques15", password: "Puravida15" },
    accessCode: "1525",
    heroImage: "/images/stay/villa 15.avif",
  },
  "16": {
    name: "Villa 16",
    sleeps: 14,
    beds: 6,
    baths: 7,
    wifi: { ssid: "Bosques16", password: "Puravida16" },
    accessCode: "1636",
    heroImage: "/images/stay/villa 16.avif",
  },
} as const;

export const ROOMS = [
  {
    villa: "15",
    id: "V15-1 Master",
    bed: "King",
    bath: "Ensuite",
    occupants: ["Mathushan", "Sherrena"],
    note: "Detached suite · Pool access",
    status: "Assigned",
  },
  {
    villa: "15",
    id: "V15-2 Master",
    bed: "King",
    bath: "Ensuite",
    occupants: ["Harish", "Ro"],
    note: "Detached suite · Pool access",
    status: "Assigned",
  },
  {
    villa: "15",
    id: "V15-3",
    bed: "King",
    bath: "Ensuite",
    occupants: [],
    status: "Open",
  },
  {
    villa: "15",
    id: "V15-4",
    bed: "King",
    bath: "Ensuite",
    occupants: ["Aatharsha", "Thasithan"],
    note: "Balcony",
    status: "Assigned",
  },
  {
    villa: "15",
    id: "V15-5",
    bed: "King",
    bath: "Ensuite",
    occupants: ["Thithusha", "Aksaran"],
    note: "Terrace",
    status: "Assigned",
  },
  {
    villa: "15",
    id: "V15-6",
    bed: "Two Queens",
    bath: "Ensuite",
    occupants: ["Andrew", "Abeyan", "Raja", "Haris"],
    note: "Balcony",
    status: "Assigned",
  },
  {
    villa: "16",
    id: "V16-7",
    bed: "King",
    bath: "Ensuite",
    occupants: ["Aryan", "Madhumita"],
    note: "Balcony",
    status: "Assigned",
  },
  {
    villa: "16",
    id: "V16-8",
    bed: "King",
    bath: "Ensuite",
    occupants: ["Maathushan", "Kimia"],
    status: "Assigned",
  },
  {
    villa: "16",
    id: "V16-9",
    bed: "Queen",
    bath: "Ensuite",
    occupants: ["Arun", "Athira"],
    status: "Assigned",
  },
  {
    villa: "16",
    id: "V16-10",
    bed: "4 Single Bunks",
    bath: "Ensuite",
    occupants: [],
    status: "Open",
  },
  {
    villa: "16",
    id: "V16-11",
    bed: "King",
    bath: "Ensuite",
    occupants: ["Deleep", "Shannon"],
    status: "Assigned",
  },
  {
    villa: "16",
    id: "V16-12",
    bed: "King",
    bath: "Ensuite",
    occupants: ["Methuraan", "Rishega"],
    status: "Assigned",
  },
  {
    villa: "14",
    id: "V14-13 Master",
    bed: "King",
    bath: "Ensuite",
    occupants: ["Keerthana", "Rajiv"],
    note: "Detached suite · Pool access",
    status: "Assigned",
  },
  {
    villa: "14",
    id: "V14-14",
    bed: "King",
    bath: "Ensuite",
    occupants: ["Yanushan", "Kajamugi"],
    status: "Assigned",
  },
  {
    villa: "14",
    id: "V14-15",
    bed: "King",
    bath: "Ensuite",
    occupants: [],
    note: "Balcony",
    status: "Open",
  },
  {
    villa: "14",
    id: "V14-16",
    bed: "King",
    bath: "Ensuite",
    occupants: ["Mathan", "Priya"],
    note: "Terrace",
    status: "Assigned",
  },
  {
    villa: "14",
    id: "V14-17",
    bed: "Two Queens",
    bath: "Ensuite",
    occupants: ["Januka", "Supena", "BallerSai"],
    note: "Balcony",
    status: "Assigned",
  },
] as const;

export const FLOORS = {
  "14": {
    "Detached Suites": ["V14-13 Master"],
    "Main House 1st Floor": ["V14-14", "V14-15"],
    "Main House 2nd Floor": ["V14-16", "V14-17"],
  },
  "15": {
    "Detached Suites": ["V15-1 Master", "V15-2 Master"],
    "Main House 1st Floor": ["V15-3", "V15-4", "V15-5"],
    "Main House 2nd Floor": ["V15-6"],
  },
  "16": {
    "Detached Suites": ["V16-7", "V16-8"],
    "Main House 1st Floor": ["V16-9", "V16-10"],
    "Main House 2nd Floor": ["V16-11", "V16-12"],
  },
} as const;


export const VILLA_ORDER = ["14", "15", "16"] as const;

export type Zone = {
  id: string;
  name: string;
  description: string;
  rooms: string[];
};

export const ZONES: Record<string, Zone[]> = {
  "14": [
    {
      id: "detached",
      name: "Detached Suites",
      description: "Private suites tucked beside the pool with morning sun.",
      rooms: ["V14-13 Master"],
    },
    {
      id: "main-down",
      name: "Main House Downstairs",
      description: "Ground-floor rooms with quick access to the patio and kitchen.",
      rooms: ["V14-14", "V14-15"],
    },
    {
      id: "main-up",
      name: "Main House Upstairs",
      description: "Second-floor rooms with terraces and shaded balconies.",
      rooms: ["V14-16", "V14-17"],
    },
  ],
  "15": [
    {
      id: "detached",
      name: "Detached Suites",
      description: "Stand-alone pool suites perfect for early risers.",
      rooms: ["V15-1 Master", "V15-2 Master"],
    },
    {
      id: "main-down",
      name: "Main House Downstairs",
      description: "Main house rooms closest to the living room and kitchen hub.",
      rooms: ["V15-3", "V15-4", "V15-5"],
    },
    {
      id: "main-up",
      name: "Main House Upstairs",
      description: "Upper-level retreat with the biggest shared room.",
      rooms: ["V15-6"],
    },
  ],
  "16": [
    {
      id: "casita",
      name: "Detached Suites",
      description: "Quiet casita wing with plenty of privacy and balconies.",
      rooms: ["V16-7", "V16-8"],
    },
    {
      id: "main-down",
      name: "Main House Downstairs",
      description: "Ground level with direct access to the covered patio.",
      rooms: ["V16-9", "V16-10"],
    },
    {
      id: "main-up",
      name: "Main House Upstairs",
      description: "Upper floor with sunrise views and late-night breezes.",
      rooms: ["V16-11", "V16-12"],
    },
  ],
};

export const ROOM_DETAILS: Record<string, { ensuite: boolean; capacity: number; amenities?: string[] }> = {
  "V15-1 Master": { ensuite: true, capacity: 2, amenities: ["Pool access", "Detached suite"] },
  "V15-2 Master": { ensuite: true, capacity: 2, amenities: ["Pool access", "Detached suite"] },
  "V15-3": { ensuite: true, capacity: 2, amenities: ["Garden view"] },
  "V15-4": { ensuite: true, capacity: 2, amenities: ["Balcony"] },
  "V15-5": { ensuite: true, capacity: 2, amenities: ["Terrace"] },
  "V15-6": { ensuite: true, capacity: 4, amenities: ["Large shared suite", "Upstairs"] },
  "V16-7": { ensuite: true, capacity: 2, amenities: ["Balcony"] },
  "V16-8": { ensuite: true, capacity: 2, amenities: ["Balcony"] },
  "V16-9": { ensuite: true, capacity: 2, amenities: ["Patio access"] },
  "V16-10": { ensuite: true, capacity: 4, amenities: ["Bunkroom"] },
  "V16-11": { ensuite: true, capacity: 2, amenities: ["Balcony"] },
  "V16-12": { ensuite: true, capacity: 2, amenities: ["Balcony"] },
  "V14-13 Master": { ensuite: true, capacity: 2, amenities: ["Detached suite", "Pool access"] },
  "V14-14": { ensuite: true, capacity: 2, amenities: ["Garden view"] },
  "V14-15": { ensuite: true, capacity: 2, amenities: ["Balcony"] },
  "V14-16": { ensuite: true, capacity: 2, amenities: ["Terrace"] },
  "V14-17": { ensuite: true, capacity: 4, amenities: ["Balcony"] },
} as const;
