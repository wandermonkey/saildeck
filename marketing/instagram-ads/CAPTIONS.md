# Saildeck — Instagram ad set

Rebuild after editing copy or photos: `node scripts/instagram-ads/build.js`
(add a name to rebuild just one, e.g. `node scripts/instagram-ads/build.js story-1`).

**Suggested setup:** Meta Ads → objective **Engagement → Messaging apps (WhatsApp)**.
Location: Mumbai + 30 km. Age 22–45. Run each concept as its own ad so Meta
can push budget to the winner. Expect the group chat and boarding pass to do
best with younger audiences, and luxury and proposal with 28+.

---

## Feed (4:5) + matching Story (9:16)

### 1 · Group chat — `feed-1-group-chat.png` · `story-2-group-chat.png`
**Primary text**
Every group chat has that one friend who actually makes the plan happen. Be them. 🌅⛵
Private sunset sails from the Gateway of India — music on, phones out, Mumbai glowing behind you. Captain and crew included, no sailing experience needed.
**Headline:** Saturday plans, sorted
**CTA:** Send WhatsApp message

### 2 · Boarding pass — `feed-2-boarding-pass.png` · (story: use `story-1-taj.png`)
**Primary text**
Departing: Gateway of India. Destination: golden hour. ✨
Sail right past the Taj on your own private boat — the view everyone photographs from the shore, except you're in it.
**Headline:** Mumbai's best view is from the water
**CTA:** Send WhatsApp message

### 3 · Proposal — `feed-3-proposal.png` · `story-4-proposal.png`
**Primary text**
You've got the ring. You've (mostly) got the speech. 💍
We'll handle the yacht, the roses and the sunset. A private boat off the Gateway of India, decorated and waiting — all you have to do is get down on one knee.
**Headline:** Plan the proposal they'll never forget
**CTA:** Send WhatsApp message

### 4 · Luxury — `feed-4-luxury.png` · `story-3-luxury.png`
**Primary text**
The best table in Mumbai has no walls, no waiting list and a sunset included. 🥂
Charter a private motor yacht for a milestone birthday, an anniversary or a team day out. Tell us your date and guest count on WhatsApp and we'll match you with the right boat.
**Headline:** Private yacht charters in Mumbai
**CTA:** Get quote

---

## Carousel (1:1) — `carousel-1.png` … `carousel-6.png`, in order

**Primary text**
Bored of rooftops? Here are 5 Mumbai plans that hit different on the water 👉
Birthdays, proposals, sundowners with the squad and the big milestones — all departing from the Gateway of India. Captain and crew included.

**Card headlines**
1. Bored of rooftops?
2. Birthdays on the water
3. Proposals at sea
4. Sundowners with the squad
5. Milestone celebrations
6. Book on WhatsApp

**CTA:** Send WhatsApp message

---

### Before running
- **Logo:** the ads use a typed "SAILDECK" wordmark with a simple sail icon,
  because the logo files in `public/images` are placeholders. Swap in the
  real logo before spending budget.
- **Photo rights:** check you have permission to use these photos in paid
  ads, especially ones where guests' faces are visible (group chat, carousel
  birthdays and sundowners).
- **The chat is a mock-up:** the names in the group chat are made up. That's
  a common ad format, but don't present it as a real customer conversation.

---
---

# Set 2 — from the marketing Drive photos (`set2-*.png`)

Rebuild just this set: `node scripts/instagram-ads/build.js set2`
Source photos live in `marketing/instagram-ads/source/`.

## Feed (4:5) + matching Story (9:16)

### 1 · Weekend upgrade — `set2-feed-1-weekend-upgrade.png`
**Primary text**
Same café. Same rooftop. Same traffic. Same friends — but this time, on the water. 🌅
Take the whole gang out on a private yacht at sunset. Music up, city glowing, captain and crew included.
**Headline:** Upgrade your weekend
**CTA:** Send WhatsApp message

### 2 · Your evening — `set2-feed-2-your-evening.png` · `set2-story-1-golden-hour.png`
**Primary text**
Picture this: the Taj and the Gateway behind you, golden light on the water, and nowhere to be. ✨
Private sunset sails from the Gateway of India. Our skipper sails, you sit back and enjoy the view.
**Headline:** This could be your evening
**CTA:** Send WhatsApp message

### 3 · Girls' trip to Goa — `set2-feed-3-girls-trip-goa.png`
**Primary text**
Planning the girls' trip to Goa? 👯‍♀️ Make one day a yacht day.
A private yacht just for your group: outfits, photos, and the river all to yourselves. Captain and crew included.
**Headline:** Private yacht charters in Goa
**CTA:** Send WhatsApp message

### 4 · Date ideas, ranked — `set2-feed-4-date-ideas.png` · `set2-story-4-date-ideas.png`
**Primary text**
Date ideas, ranked:
4. Dinner at the usual place
3. Another movie
2. A long drive (in traffic)
1. A private sunset sail ⛵
Trust us on this one. Message us to book date night.
**Headline:** Plan a date they'll remember
**CTA:** Send WhatsApp message

### Stories only
- `set2-story-2-say-it.png` — *"Say it where the whole city can see."* Proposals & anniversaries.
  Primary text: Some questions deserve the best backdrop in Mumbai. 💍 We'll decorate the yacht — you bring the ring.
- `set2-story-3-no-plans.png` — *"No plans. Just the sea."*
  Primary text: Switch off for an evening. Private sunset sails from the Gateway of India. 🌊

## Carousel (1:1) — "Pick your vibe": `set2-carousel-1.png` … `set2-carousel-6.png`
**Primary text**
What's your yacht vibe? 👀 Romantic, party, girls' day or sail & chill — swipe, pick one, then tell us on WhatsApp and we'll match you with the right boat.
**Card headlines:** 1. What's your yacht vibe? · 2. The romantic · 3. The party · 4. The girls' day · 5. The sail & chill · 6. Book on WhatsApp
**CTA:** Send WhatsApp message

---

### ⚠️ Check before running Set 2

**AI-generated photos.** These three are Gemini images. I cropped out the
Gemini sparkle mark, but they are still AI-generated:
- `ai-sailboat-gateway-golden.png` → used in *Your evening*, *Golden hour*
- `ai-couple-gateway-sunset.png` → used in *Say it*
- `ai-group-party-sunset-bridge.png` → used in *Weekend upgrade*, carousel *The party*

When you upload these ads, turn on Meta's AI disclosure ("AI info"). Meta may
also detect and label them automatically. The sailboat in the AI image says
"AVENTURA" on the hull. If you don't have a boat by that name, a customer might
ask to book it, so consider this before using it.

**Photos that may not be yours to use.** Filenames and styles suggest these came
from stock sites or other companies' websites. Confirm you have the rights
before paying to promote them, because Meta can reject or take down ads that
use photos without permission:
- `couple-bow-sunset-vertical.jpg` (*No plans* story) looks like a stock photo
- `couple-yacht-sunset-landscape.webp` (carousel *The romantic*) is a widely
  circulated stock image
- `goa-girls-group-white.jpg` (*Girls' trip*, carousel *The girls' day*). Its
  original filename (`kitty-party-yacht-Mumbai-1-1024x679`) looks like a
  download from someone else's website.
- `goa-yellow-dress-bow.jpg`, `goa-red-dress-sunpad.jpg`: the filenames look like
  Instagram downloads. If they're your customers, get their OK to use their
  photos in ads.

**Not used:** `Couple yacht photoshoot in mumbai.avif` (only 700×400, too
small) and the TRIDENT sailboat photo (678×452, and the boat's name is on the
hull).

---
---

# College student offer — `student-story-599.png` (9:16)

**Primary text**
Calling all college squads 🎓⛵
Grab 4 friends and get your own sailboat in Mumbai harbour for 2 hours, at just ₹599 per person.

☀️ 8–10 AM
🌤️ 2–4 PM
🌅 4–6 PM

Skipper included. No sailing experience needed. Valid college ID required for all 5.
DM us on WhatsApp to lock your slot 👉 +91 84248 48489

**Headline:** Student special: ₹599 per person
**CTA:** Send WhatsApp message

**Targeting idea:** ages 18–24, Mumbai + 25 km. Interests: college/university,
travel, adventure. Run it on Stories + Reels placements only.

Confirm these offer details before running: price per person, group of
exactly 5, 2-hour slots, skipper included, college ID needed for all 5.
