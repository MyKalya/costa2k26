/**
 * Shared day configuration with images and color themes
 */
export interface DayConfig {
  id: string;
  number: number;
  label: string;
  image: string;
  color: string;
}

export const daysConfig: DayConfig[] = [
  {
    id: "day-1",
    number: 1,
    label: "Arrivals",
    image: "/images/day1-banner.png",
    color: "#C46A28", // sunset orange
  },
  {
    id: "day-2",
    number: 2,
    label: "Beach Club",
    image: "/images/day2-banner.png",
    color: "#E8A48F", // peach / coral
  },
  {
    id: "day-3",
    number: 3,
    label: "Free Day",
    image: "/images/day3-banner.png",
    color: "#4AA7A4", // teal night-market
  },
  {
    id: "day-4",
    number: 4,
    label: "Adventure",
    image: "/images/day4-banner.png",
    color: "#3A784F", // deep jungle green
  },
  {
    id: "day-5",
    number: 5,
    label: "Catamaran",
    image: "/images/day5-banner.png",
    color: "#3D829F", // ocean blue
  },
  {
    id: "day-6",
    number: 6,
    label: "Departures",
    image: "/images/day6-banner.png",
    color: "#AFA98A", // muted beige/khaki
  },
];

