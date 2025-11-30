# Itinerary Page Structure and Copy

This document contains the current structure and all copy from the itinerary page. Use this to make updates to days, activities, and content.

---

## Page Structure

The itinerary page consists of:

1. **Hero Section** (`HeroSection.tsx`)
   - Background image with dark overlay
   - Eyebrow: "COSTA2K26"
   - Title: "Trip Itinerary"
   - Subtitle: "Six days in Costa Rica, all in one place."
   - CTA Button: "View days"

2. **Sticky Day Scroller** (`DayScroller.tsx`)
   - Horizontal scrollable navigation
   - Shows day numbers, dates, and labels
   - Sticky at top when scrolled

3. **Day Cards** (`DayCard.tsx`)
   - Each day is a card with:
     - Banner image
     - Date label and title
     - Vibe summary box
     - Timeline of events with icons
     - Special notes section (optional)
     - Getting around section

4. **Footer Actions** (`FooterActions.tsx`)
   - Download and share buttons

---

## Hero Section Copy

```
Eyebrow: COSTA2K26
Title: Trip Itinerary
Subtitle: Six days in Costa Rica, all in one place.
CTA Button: View days
```

---

## Day Scroller Labels

The DayScroller uses labels from `dayConfig.ts`:

- Day 1: "Arrivals"
- Day 2: "Beach Club"
- Day 3: "Free Day"
- Day 4: "Adventure"
- Day 5: "Catamaran"
- Day 6: "Departures"

---

## Day 1: Fri Feb 13 - Arrivals and Welcome Party

**Metadata:**
- ID: `day-1`
- Date Label: `Fri Feb 13`
- Title: `Arrivals and Welcome Party`
- Summary: `Settle in, meet the group, and kick off the week with dinner and drinks.`
- Theme Color: `#C46A28` (sunset orange)
- Card Background: `#FDF3EA`
- Banner Image: `/media/itinerary/day1-banner.png`

**Vibe Summary:**
```
First night in Costa Rica. Soft landings, sunset views, and a warm welcome with the whole crew.
```

**Special Notes:**
1. Welcome party dress code: all white.
2. Pack a light layer for ocean breeze at Pangas.
3. Keep passports and valuables in the villa safe once you arrive.

**Events Timeline:**
1. **Time:** 4-5 pm
   - **Title:** Arrive at the villa
   - **Location:** Diamante del Bosque, Hacienda Pinilla
   - **Description:** Check in, drop your bags, and grab a drink by the pool.
   - **Icon:** arrival (🧳)

2. **Time:** Evening
   - **Title:** Welcome party
   - **Location:** At the villa
   - **Description:** Casual vibes, music, and time to meet everyone.
   - **Icon:** party (🎉)

3. **Time:** 7:30 pm
   - **Title:** Dinner
   - **Location:** Pangas Beach Club
   - **Description:** Beachfront dinner and drinks to start the trip right.
   - **Icon:** meal (🍽️)

**Getting Around:**
```
Shuttle, rental car, or taxi or Uber from the villa.
```

---

## Day 2: Sat Feb 14 - Valentines at the Beach Club

**Metadata:**
- ID: `day-2`
- Date Label: `Sat Feb 14`
- Title: `Valentines at the Beach Club`
- Summary: `A full day at Tamarindo Beach Club with watersports, brunch, and sunset drinks.`
- Theme Color: `#E8A48F` (peach/coral)
- Card Background: `#FDEFEA`
- Banner Image: `/media/itinerary/day2-banner.png`

**Vibe Summary:**
```
Beach club Valentine energy. Daybeds, water, and slow-motion sunshine all day.
```

**Special Notes:**
1. Bring sunglasses, hat, and sunscreen.
2. Light, beach friendly outfits are perfect.
3. Tabs for food and drinks will be handled at the end of the day.

**Events Timeline:**
1. **Time:** Morning
   - **Title:** Brunch
   - **Location:** Tamarindo Beach Club
   - **Description:** Slow morning, good coffee, and a first swim.
   - **Icon:** meal (🍽️)

2. **Time:** 12-6 pm
   - **Title:** Beach club day
   - **Location:** Tamarindo Beach Club
   - **Description:** Daybeds, pool, and access to watersports gear.
   - **Icon:** beach (🏖️)

3. **Time:** Afternoon
   - **Title:** Watersports
   - **Location:** Tamarindo Beach Club
   - **Description:** Surfing, paddleboard, kayaks, and beach volleyball.
   - **Icon:** beach (🏖️)

4. **Time:** Afternoon
   - **Title:** Drinks
   - **Location:** Langosta area
   - **Description:** Optional - head over to Langosta for a drink and sunset.
   - **Icon:** beach (🏖️)

5. **Time:** Evening
   - **Title:** Dinner
   - **Location:** El Mercadito
   - **Description:** Food stalls, cocktails, and a relaxed night market vibe.
   - **Icon:** meal (🍽️)

**Getting Around:**
```
Rental car or taxi or Uber from the villa.
```

---

## Day 3: Sun Feb 15 - Free Day and Night Market

**Metadata:**
- ID: `day-3`
- Date Label: `Sun Feb 15`
- Title: `Free Day and Night Market`
- Summary: `Your day to explore, relax, or choose your own adventure, with the night market to close it out.`
- Theme Color: `#4AA7A4` (teal)
- Card Background: `#EBF7F6`
- Banner Image: `/media/itinerary/day3-banner.png`

**Vibe Summary:**
```
Choose your own adventure. Explore town, find your spots, and end the night at the market.
```

**Special Notes:**
1. Great day to book optional excursions or spa.
2. Bring a small bag if you plan to shop at the night market.
3. Ask our experience guide if you want help planning.

**Events Timeline:**
1. **Time:** Morning
   - **Title:** Breakfast
   - **Location:** At the villa
   - **Description:** Slow breakfast, pool time, or a quick walk around the property.
   - **Icon:** meal (🍽️)

2. **Time:** Afternoon
   - **Title:** Free time
   - **Location:** Tamarindo and nearby beaches
   - **Description:** Explore Tamarindo, grab lunch wherever you like, or head to a nearby playa.
   - **Icon:** free (🗺️)

3. **Time:** Evening
   - **Title:** Dinner
   - **Location:** Tamarindo
   - **Description:** Pick your own spot or follow the group.
   - **Icon:** meal (🍽️)

4. **Time:** Evening
   - **Title:** Night market
   - **Location:** El Mercadito Tamarindo
   - **Description:** Local vendors, food, music, and a very Tamarindo vibe.
   - **Icon:** free (🗺️)

**Getting Around:**
```
Rental car or taxi or Uber from the villa.
```

---

## Day 4: Mon Feb 16 - Adventure and Hot Springs

**Metadata:**
- ID: `day-4`
- Date Label: `Mon Feb 16`
- Title: `Adventure and Hot Springs`
- Summary: `River tubing, hot springs, and authentic Costa Rican cuisine.`
- Theme Color: `#3A784F` (deep jungle green)
- Card Background: `#E7F2EB`
- Banner Image: `/media/itinerary/day4-banner.png`

**Vibe Summary:**
```
Adventure day. Rivers, hot springs, and a little bit of jungle.
```

**Special Notes:**
1. Bring a change of clothes in case you get wet.
2. Wear secure shoes that can handle water and uneven ground.
3. Towel and dry bag are recommended for your phone.

**Events Timeline:**
1. **Time:** Morning
   - **Title:** Breakfast
   - **Location:** At the villa
   - **Description:** Light breakfast before a full adventure day.
   - **Icon:** meal (🍽️)

2. **Time:** Morning
   - **Title:** Adventure tour departure
   - **Location:** Pickup from the villa
   - **Description:** Group departs for a guided adventure tour.
   - **Icon:** adventure (🌋)

3. **Time:** Afternoon
   - **Title:** Adventure tour
   - **Location:** Rivers and hot springs
   - **Description:** River tubing, hot springs, and time to explore the property.
   - **Icon:** adventure (🌋)

4. **Time:** Afternoon
   - **Title:** Option 1 - Water
   - **Location:** On site
   - **Description:** Stick with water activities and soak in the hot springs.
   - **Icon:** adventure (🌋)

5. **Time:** Afternoon
   - **Title:** Option 2 - Land
   - **Location:** On site
   - **Description:** Choose land based activities, depending on what the tour offers that day.
   - **Icon:** adventure (🌋)

6. **Time:** Evening
   - **Title:** Dinner
   - **Location:** Local Costa Rican spot
   - **Description:** Group dinner with classic Costa Rican dishes.
   - **Icon:** meal (🍽️)

**Getting Around:**
```
Round trip transport is organized as part of the tour, plus backup options by rental car if needed.
```

---

## Day 5: Tue Feb 17 - Catamaran Party at Sea

**Metadata:**
- ID: `day-5`
- Date Label: `Tue Feb 17`
- Title: `Catamaran Party at Sea`
- Summary: `Sail, swim, and watch the sunset from the water with the whole group.`
- Theme Color: `#3D829F` (ocean blue)
- Card Background: `#E9F4F8`
- Banner Image: `/media/itinerary/day5-banner.png`

**Vibe Summary:**
```
Catamaran party at sea. Swim, sail, and watch the sunset from the water.
```

**Special Notes:**
1. Bring swim outfits and something dry for the sail back.
2. Sunscreen, sunglasses, and a hat are your best friends.
3. Avoid bringing valuables that cannot get wet.

**Events Timeline:**
1. **Time:** Morning
   - **Title:** Slow morning
   - **Location:** At the villa
   - **Description:** Sleep in, swim, or walk the property.
   - **Icon:** free (🗺️)

2. **Time:** Early afternoon
   - **Title:** Transfer to marina
   - **Location:** Pickup from villa
   - **Description:** Shuttle or carpool to the catamaran departure point.
   - **Icon:** boat (⛵)

3. **Time:** Afternoon
   - **Title:** Catamaran cruise
   - **Location:** Pacific coast
   - **Description:** Open bar, snacks, music, and time in the water.
   - **Icon:** boat (⛵)

4. **Time:** Sunset
   - **Title:** Sunset sail
   - **Location:** On the catamaran
   - **Description:** Golden hour views and photos with the group.
   - **Icon:** boat (⛵)

5. **Time:** Evening
   - **Title:** Return to villa
   - **Location:** Diamante del Bosque
   - **Description:** Open evening. Light dinner and hangout back at the villa.
   - **Icon:** boat (⛵)

**Getting Around:**
```
Group transport to and from the marina is organized. If you miss the shuttle, taxis or Ubers are available from Tamarindo.
```

---

## Day 6: Wed Feb 18 - Last Morning and Departures

**Metadata:**
- ID: `day-6`
- Date Label: `Wed Feb 18`
- Title: `Last Morning and Departures`
- Summary: `One last slow morning together before everyone heads home.`
- Theme Color: `#AFA98A` (muted beige/khaki)
- Card Background: `#F5F3EA`
- Banner Image: `/media/itinerary/day6-banner.png`

**Vibe Summary:**
```
Last slow morning together before everyone heads home.
```

**Special Notes:**
1. Keep your passport and boarding pass handy.
2. Double check check-out time and shuttle time.
3. Leave anything you do not want to travel with in the villa's donation box.

**Events Timeline:**
1. **Time:** Morning
   - **Title:** Breakfast and checkout
   - **Location:** At the villa
   - **Description:** Pack up, grab breakfast, and say goodbye.
   - **Icon:** meal (🍽️)

2. **Time:** Late morning and afternoon
   - **Title:** Airport departures
   - **Location:** Liberia International Airport
   - **Description:** Shuttles and car shares based on your flight time.
   - **Icon:** plane (✈️)

**Getting Around:**
```
Pre booked airport shuttles, rental cars, or shared rides based on your plans.
```

---

## Event Icons Reference

The timeline uses the following icon mappings:

- `arrival` → 🧳
- `party` → 🎉
- `meal` → 🍽️
- `beach` → 🏖️
- `free` → 🗺️
- `adventure` → 🌋
- `boat` → ⛵
- `plane` → ✈️

---

## File Locations

- **Main Page Component:** `app/itinerary/page.tsx`
- **Itinerary Page Logic:** `app/itinerary/components/ItineraryPage.tsx`
- **Day Cards:** `app/itinerary/components/DayCard.tsx`
- **Hero Section:** `app/itinerary/components/HeroSection.tsx`
- **Day Scroller:** `app/itinerary/components/DayScroller.tsx`
- **Day Config (labels):** `app/itinerary/components/dayConfig.ts`

**The main data array is located in:** `app/itinerary/components/ItineraryPage.tsx` starting at line 9.

---

## How to Update

To update the itinerary:

1. Edit the `days` array in `app/itinerary/components/ItineraryPage.tsx`
2. Update any day's properties:
   - `id`, `dayIndex`, `dateLabel`
   - `title`, `summary`
   - `themeColor`, `cardBg`, `bannerImage`
   - `vibeSummary`
   - `notes` array
   - `events` array (each event has: `time`, `title`, `location`, `description`, `icon`)
   - `gettingAround` string
3. Update the day labels in `app/itinerary/components/dayConfig.ts` if needed
4. Update hero section copy in `app/itinerary/components/HeroSection.tsx` if needed

---

*Last updated: Current structure as of latest commit*

