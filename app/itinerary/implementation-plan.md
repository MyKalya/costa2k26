# Implementation Plan

## Phase 1: Data Model ✅
- [x] Define TypeScript types
- [x] Create itinerary data structure
- [ ] Populate full 6-day array from table

## Phase 2: Core Components (Current)
- [ ] ItineraryPage (root)
- [ ] DayTimeline (sticky nav)
- [ ] DaySection (day container)

## Phase 3: Day Components
- [ ] DayHeroPanel
- [ ] DayIncludesBand
- [ ] DayTimelineCard
- [ ] DayEventBlock
- [ ] DayTransportStrip
- [ ] DayDetailsAccordion

## Phase 4: Motion & Polish
- [ ] Hero fade-in animations
- [ ] Scroll-based reveals (IntersectionObserver)
- [ ] Active day detection
- [ ] Smooth scroll to sections
- [ ] Hover states
- [ ] Accordion animations

## Phase 5: Styling
- [ ] Apply Playfair Display + Inter
- [ ] Theme colors per day
- [ ] Card shadows and spacing
- [ ] Responsive breakpoints
- [ ] Mobile optimizations

## File Structure
```
app/itinerary/
├── page.tsx                    # Root page component
├── types.ts                    # Prop types (done)
├── components/
│   ├── DayTimeline.tsx        # Sticky nav
│   ├── DaySection.tsx         # Day container
│   ├── DayHeroPanel.tsx       # Hero image + overlay
│   ├── DayIncludesBand.tsx    # Chip band
│   ├── DayTimelineCard.tsx    # Main content card
│   ├── DayEventBlock.tsx      # Time-of-day block
│   ├── DayTransportStrip.tsx  # Transport summary
│   └── DayDetailsAccordion.tsx # Collapsible details
├── motion-spec.md             # Motion guide (done)
└── implementation-plan.md     # This file

app/data/
└── itinerary.ts               # Data model + full array
```

## Key Implementation Notes
1. **Single source of truth**: `itineraryDays` array in `itinerary.ts`
2. **No hardcoded copy**: All text from data
3. **No costs in UI**: Store internally, never render
4. **Mobile first**: Responsive from base up
5. **Performance**: Use `useInView`, `useScroll`, throttle observers
6. **Accessibility**: Proper ARIA labels, keyboard navigation

