# 🚢 AVINYA '27 — The Techno-Cultural Odyssey

> **The Official Flagship Techno-Cultural Fest of IIIT Dharwad (March 12 - 14, 2027)**  
> Featuring **HACK2FUTURE**, the 36-Hour National Astronaut Hackathon.

---

## 🌟 Overview & Concept: The Grand Archipelago

Avinya '27 is conceived as an immersive nautical expedition across three distinct islands:
- **Day 1: The Last Outpost** (Dune Sci-Fi Desert // Amber & Spice // Monoliths of Code)
- **Day 2: The Pandemonium** (Synthwave Cyberpunk // Electric Magenta & Cyan // RoboWars & Adrenaline)
- **Day 3: The Carnival Island** (Grand Night Festival // Golden Waters & Fireworks // Pro-Nite Star Concert)
- **The Cosmic Frontier: Hack2Future** (Deep Space & Astronaut Odyssey // ₹1,50,000+ Prize Bounty)

---

## 🚀 Key Highlights & Architecture

1. **Apple-Style Scroll Physics (GSAP + ScrollTrigger)**:
   - Scrubbed pinning and cinematic text reveals.
   - Dynamic Island ambient shifting: as you scroll, the lighting, glowing borders, and particle engine seamlessly morph to match that island's ecosystem.
2. **The 3-Dial Log Pose HUD**:
   - Pinned at the bottom of the screen (or collapsed into a thumb-friendly dock on mobile).
   - Features physical needles that calculate magnetic attraction and vibrate as distortion increases.
3. **100% Modular (`events-data.js`)**:
   - Everything (Event titles, images, prize money, rules, timings, FAQs) is stored in a clean, isolated JavaScript data configuration.
   - **Need to change an event, swap a photo, or update a date?** Simply edit `events-data.js`—the UI updates dynamically without touching HTML!
4. **Secret Poneglyph DevTools Easter Egg**:
   - Open browser developer tools (`F12` or `Ctrl+Shift+I`) to find an ancient ASCII Poneglyph cipher planted in the console!
5. **Ultra-Responsive**:
   - Desktop: Horizon view with glassmorphism panels.
   - Mobile: Native iOS-style bottom sheets, swipeable cards, and 60fps lightweight hardware-accelerated animations.

---

## ⚡ Instant 1-Click Deployment (Vercel)

### Option 1: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: Via GitHub + Vercel Dashboard (Recommended)
1. Create a new repository on GitHub (e.g. `avinya-fest`).
2. Push this directory:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/avinya-fest.git
   git branch -M main
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new), select your repo, and click **Deploy**.
4. Your site will be live within 15 seconds!

---

## 📁 File Structure

```
avinya-fest/
├── index.html        # Main semantic markup with GSAP & Tailwind
├── styles.css        # Luxury Apple-grade typography (Syne, Plus Jakarta Sans), glassmorphism
├── events-data.js    # 100% MODULAR data store (Photos, events, rules, prizes)
├── app.js            # Controller, Canvas particles, Log Pose sync & modals
├── vercel.json       # Zero-config deployment file
└── README.md         # Documentation
```
