# Itinerary Page Component System

## Component Hierarchy

```
ItineraryPage (root)
├── Hero Section
│   ├── Background image with gradient overlay
│   ├── Eyebrow text
│   ├── H1 title
│   ├── Subtitle copy
│   └── Date range pill
│
├── DayTimeline (sticky navigation)
│   └── TimelineItem[] (horizontal scroll on mobile)
│
└── DaySection[] (one per day)
    ├── DayHeroPanel
    │   ├── Background image (day-specific)
    │   ├── Gradient overlay (theme color)
    │   ├── Day label ("Day 1")
    │   ├── Date ("Fri Feb 13")
    │   ├── Title ("Arrivals and Welcome Party")
    │   └── Subtitle (tone-setting sentence)
    │
    ├── DayIncludesBand
    │   └── IncludeChip[] (3-6 visual chips)
    │
    ├── DayTimelineCard
    │   └── DayEventBlock[] (Morning | Afternoon | Evening | Night)
    │       └── DayEvent[] (bullet list items)
    │
    ├── DayTransportStrip
    │   └── Transport icons + text summary
    │
    └── DayDetailsAccordion (optional)
        └── Collapsible content for extra context
```

## Component Responsibilities

### ItineraryPage
- Root container
- Manages active day state
- Handles scroll intersection for timeline highlighting
- Coordinates smooth scrolling to day sections

### DayTimeline
- Sticky horizontal navigation bar
- Desktop: pinned below hero on scroll
- Mobile: horizontal scrollable pill bar
- Highlights active day based on scroll position

### DaySection
- Individual day container
- Handles visibility detection for timeline sync
- Implements smooth scroll anchor
- Manages day-specific layout and spacing

### DayHeroPanel
- Full-width hero image with gradient overlay
- Day-specific imagery and theme color
- Overlay text content (day number, date, title, subtitle)
- Subtle fade-in animation on mount

### DayIncludesBand
- Horizontal band of visual chips
- Slightly overlaps hero image
- Shows key activities/features for the day
- Each chip: icon + label + gradient background

### DayTimelineCard
- Main content card sitting on hero background
- Groups events by time of day (Morning/Afternoon/Evening/Night)
- Clean bullet list layout
- Soft shadows, rounded corners, ample spacing

### DayEventBlock
- Single time-of-day section within timeline card
- Shows time range pill (if applicable)
- Renders list of events for that period

### DayTransportStrip
- Compact strip showing transport options
- Icons + simple text summary
- No prices displayed

### DayDetailsAccordion
- Collapsible drawer for additional context
- Contains: food notes, adventure options, optional activities
- Only renders if `details` exist for the day

## Styling Guidelines

- **Colors**: Deep jungle green (#134E4A) primary, theme colors per day
- **Typography**: Playfair Display (headings), Inter (body)
- **Spacing**: Generous breathing room, soft rounded corners (2rem)
- **Shadows**: Light, soft shadows on cards
- **Motion**: Subtle fades, gentle scale, light parallax (never cheesy)
- **Background**: Soft ivory/off-white (#FFFDF7 or similar)

## Data Flow

1. **ItineraryData** loaded from `/app/data/itinerary.ts`
2. Days array passed to **DayTimeline** for navigation
3. Each **DaySection** receives individual **ItineraryDay** object
4. Props flow down through component hierarchy
5. Active day state managed at **ItineraryPage** level
6. Scroll intersection updates timeline

## Interaction Patterns

- **Timeline click**: Smooth scroll to corresponding day section
- **Scroll**: Timeline highlights active day automatically
- **Details accordion**: Expand/collapse with smooth animation
- **Hero images**: Subtle parallax on scroll (light, not distracting)
- **Page load**: Hero fades in with upward text animation

