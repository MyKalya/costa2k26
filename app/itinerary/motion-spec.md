# Motion & Interaction Specification

## Motion Principles
- **No scroll jacking** - Simple scroll-based reveal only
- **Subtle and smooth** - Never cheesy or jarring
- **Performance first** - Use GPU-accelerated properties (transform, opacity)
- **Respect reduced motion** - Check `prefers-reduced-motion`

## Hero Section Motion
```typescript
// Background image
- Initial: scale 0.98, opacity 0
- Animate: scale 1.0, opacity 1
- Duration: 700ms
- Easing: easeOut

// Headline & subtitle
- Initial: y: 12-16px, opacity 0
- Animate: y: 0, opacity 1
- Duration: 400-500ms
- Delay: 100-150ms
- Easing: easeOut
```

## Sticky DayTimeline Motion
```typescript
// Active day pill
- Scale: 1.0 → 1.05 on active
- Opacity: 0.7 → 1.0 on active
- Background: outline → filled (jungle green)
- Transition: 200ms easeOut

// Click scroll
- Behavior: smooth scroll to DaySection anchor
- Offset: account for sticky nav height
```

## DaySection Reveal Motion
```typescript
// DayHeroPanel
- Initial: opacity 0, y: 20px
- Animate: opacity 1, y: 0
- Duration: 600ms
- Easing: easeOut

// DayIncludesBand chips
- Initial: opacity 0, x: -20px
- Animate: opacity 1, x: 0
- Stagger: 80-120ms per chip
- Duration: 400ms

// DayTimelineCard
- Initial: opacity 0, y: 12px
- Animate: opacity 1, y: 0
- Duration: 500ms
- Delay: 100ms after hero
- Easing: easeOut
```

## Active Section Highlighting
```typescript
// Active section (centered in viewport)
- Shadow: enhanced (shadow-lg → shadow-xl)
- Saturation: slightly increased via CSS filter
- Scale: 1.0 (or very subtle 1.01)

// Inactive sections
- Opacity: 0.85
- Saturation: slightly reduced
- Blur: none (keep readable)
```

## Include Chip Hover
```typescript
// Hover state
- Scale: 1.0 → 1.03
- Shadow: subtle increase
- Gradient: intensity increase (via opacity/contrast)
- Y: 0 → -2px (subtle raise)
- Duration: 200ms
- Easing: easeOut
```

## Detail Accordion
```typescript
// Open/close
- Height: auto with layout animation
- Opacity: fade in content
- Duration: 300-400ms
- Easing: easeInOut
- Smooth layout shifts
```

