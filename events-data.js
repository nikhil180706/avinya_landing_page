/**
 * AVINYA '27 - FEST & EVENTS DATA CONFIGURATION
 * -------------------------------------------------------------
 * Yeh file 100% modular hai. Yahan aap koi bhi event ka naam, photo, 
 * time, prize money, description ya registration link asani se change kar sakte hain.
 */

window.AVINYA_DATA = {
  fest: {
    name: "AVINYA '27",
    tagline: "The Techno-Cultural Odyssey of IIIT Dharwad",
    dates: "March 12 - 14, 2027",
    location: "Indian Institute of Information Technology, Dharwad, Karnataka",
    coordinates: "15.4288° N, 75.0560° E",
    countdownTarget: "2027-03-12T09:00:00+05:30",
    hack2futureUrl: "https://hack2future.iiitdwd.ac.in/",
    registrationFormUrl: "https://forms.gle/avinya27-register"
  },

  islands: [
    {
      id: "day1",
      dayNumber: "DAY 01",
      date: "March 12, 2027",
      name: "The Last Outpost",
      theme: "Dune Desert Sci-Fi",
      tagline: "Uncover the Ancient Monoliths of Code",
      accentColor: "#F59E0B",
      gradient: "from-amber-500/20 via-orange-600/10 to-transparent",
      badge: "Arid Sector // Compass Locked",
      heroImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80",
      description: "Step into an ancient planetary desert where shifting dunes meet colossal monolithic citadels. Day 1 tests raw algorithmic intellect, cryptographic mastery, and deep systems engineering.",
      events: [
        {
          id: "d1-e1",
          title: "Algorithmic Dunes (CP Contest)",
          category: "Technical",
          time: "10:30 AM - 01:30 PM",
          venue: "Main Computing Hub, Academic Block",
          bounty: "₹35,000",
          berries: "฿ 35,000,000",
          teamSize: "1-2 Pilots",
          image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
          summary: "Intense competitive programming arena where coders race against time to solve complex graph algorithms and mathematical puzzles.",
          rules: ["Individual or duo participation", "Languages allowed: C++, Python, Java", "Standard ICPC scoring penalties apply"]
        },
        {
          id: "d1-e2",
          title: "Sand-Cipher (National CTF)",
          category: "Cybersecurity",
          time: "02:00 PM - 06:00 PM",
          venue: "Cyber Defense Lab",
          bounty: "₹40,000",
          berries: "฿ 40,000,000",
          teamSize: "Team of 2-4",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
          summary: "A high-stakes Capture The Flag warfare involving reverse engineering, binary exploitation, and binary forensics in a sandboxed dune network.",
          rules: ["No attacking the infrastructure directly", "Flag format: AVINYA{...}", "Live scoreboard with dynamic point decay"]
        },
        {
          id: "d1-e3",
          title: "Dune Rover Challenge",
          category: "Robotics",
          time: "03:30 PM - 06:30 PM",
          venue: "Desert Arena Grounds",
          bounty: "₹30,000",
          berries: "฿ 30,000,000",
          teamSize: "Up to 4 Pilots",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
          summary: "Autonomous and RC rovers navigate through treacherous desert obstacle courses, sand dunes, and planetary slopes.",
          rules: ["Max rover dimensions: 40cm x 40cm", "Weight limit: 5kg", "Points awarded for speed and payload retention"]
        },
        {
          id: "d1-e4",
          title: "Monolith Keynotes & AI Panel",
          category: "Summit",
          time: "07:00 PM - 09:00 PM",
          venue: "Auditorium Prime",
          bounty: "Exclusive Perks",
          berries: "VIP Access",
          teamSize: "Open to All",
          image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
          summary: "Fireside chats with leading AI researchers, founders, and engineers discussing the future of autonomous intelligence.",
          rules: ["Free entry with Avinya Badge", "Q&A session with industry speakers"]
        }
      ]
    },

    {
      id: "day2",
      dayNumber: "DAY 02",
      date: "March 13, 2027",
      name: "The Pandemonium",
      theme: "Synthwave Cyberpunk",
      tagline: "Overclock the Neon Surge in the Digital Metropolis",
      accentColor: "#EC4899",
      gradient: "from-pink-500/20 via-purple-600/10 to-transparent",
      badge: "High Distortion // Magnetic Overdrive",
      heroImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=80",
      description: "Neon magenta rain, electric water reflections, and hyper-caffeinated energy. The Pandemonium is an adrenaline surge featuring robot combat, neon hack battles, and e-sports championships.",
      events: [
        {
          id: "d2-e1",
          title: "RoboWars: Cyber Clash",
          category: "Combat Robotics",
          time: "11:00 AM - 03:00 PM",
          venue: "The Steel Pit (Central Amphitheater)",
          bounty: "₹60,000",
          berries: "฿ 60,000,000",
          teamSize: "Team of 3-5",
          image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
          summary: "Heavyweight and featherweight bot combat inside an armored polycarbonate arena. Spikes, flippers, and vertical spinners collide.",
          rules: ["Bot safety lock required", "Weight categories: 15kg & 30kg", "Double elimination knockout tournament"]
        },
        {
          id: "d2-e2",
          title: "Neon Overdrive: UI/UX Sprint",
          category: "Design",
          time: "01:00 PM - 05:00 PM",
          venue: "Design Studio Hub",
          bounty: "₹25,000",
          berries: "฿ 25,000,000",
          teamSize: "Solo or Duo",
          image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
          summary: "Design a futuristic spatial interface for autonomous maritime navigation or cyberpunk operating systems within 4 hours.",
          rules: ["Figma / Spline allowed", "Prompt given on the spot", "Judged on ergonomics, design thinking & micro-interactions"]
        },
        {
          id: "d2-e3",
          title: "Retro Wave E-Sports Arena",
          category: "Gaming",
          time: "02:00 PM - 08:00 PM",
          venue: "Indoor Sports Complex",
          bounty: "₹50,000",
          berries: "฿ 50,000,000",
          teamSize: "Squad of 5",
          image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
          summary: "Championship tournaments for Valorant & BGMI with live caster commentary, big screen casting, and high-octane clutch plays.",
          rules: ["Tournament lobby rules apply", "Zero tolerance for aimbots/cheats", "Bring your own peripherals (PC provided)"]
        },
        {
          id: "d2-e4",
          title: "Cyber Beats: DJ War & Beatbox",
          category: "Music & Cultural",
          time: "08:00 PM - 11:00 PM",
          venue: "Main Open Air Stage",
          bounty: "₹30,000",
          berries: "฿ 30,000,000",
          teamSize: "Solo Performers",
          image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
          summary: "Underground electronic producers, synthesizers, and beatboxers battle head-to-head under pulsating laser grids.",
          rules: ["10-minute live set per participant", "Judged on crowd hype, mixing fluency & originality"]
        }
      ]
    },

    {
      id: "day3",
      dayNumber: "DAY 03",
      date: "March 14, 2027",
      name: "The Carnival Island",
      theme: "Grand Midnight Festival",
      tagline: "Celebrate the Grand Finale Across Golden Illuminated Waters",
      accentColor: "#EAB308",
      gradient: "from-yellow-500/20 via-amber-600/10 to-transparent",
      badge: "Critical Overload // Grand Revelry",
      heroImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
      description: "Glowing Ferris wheels, floating lantern waters, and electrifying stage lights. Day 3 is the culmination of Avinya with massive musical concerts, dance battles, and the celebration of champions.",
      events: [
        {
          id: "d3-e1",
          title: "Star-Nite: Grand Celebrity Concert",
          category: "Pro-Nite",
          time: "07:30 PM - 11:30 PM",
          venue: "The Grand Festival Grounds",
          bounty: "Epic Finale",
          berries: "VIP Access",
          teamSize: "All Attendees",
          image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80",
          summary: "The flagship concert night of Avinya featuring a national Bollywood/Indie pop headliner alongside high-energy EDM DJs.",
          rules: ["Fest Wristband compulsory", "Security gate closes at 08:30 PM", "Zero illicit substances permitted"]
        },
        {
          id: "d3-e2",
          title: "Rhythm of the Tide (Choreo Battle)",
          category: "Dance",
          time: "01:00 PM - 05:00 PM",
          venue: "Main Stage Auditorium",
          bounty: "₹45,000",
          berries: "฿ 45,000,000",
          teamSize: "Crew of 8-25",
          image: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80",
          summary: "Eastern and Western group choreography face-off. Stunning formations, dramatic storytelling, and sync moves.",
          rules: ["Time limit: 8-12 minutes per crew", "Audio track submission 2 hours prior", "Props allowed with prior approval"]
        },
        {
          id: "d3-e3",
          title: "Battle of the Bands",
          category: "Music",
          time: "10:30 AM - 01:30 PM",
          venue: "Acoustic Arena",
          bounty: "₹35,000",
          berries: "฿ 35,000,000",
          teamSize: "Band of 3-7",
          image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
          summary: "Live rock, metal, and fusion bands battle it out on stage. Drum solos, heavy distortion, and soaring vocals.",
          rules: ["15-minute set including line check", "At least one original composition mandatory"]
        },
        {
          id: "d3-e4",
          title: "Haute Couture: Runway of Nations",
          category: "Fashion",
          time: "05:00 PM - 07:00 PM",
          venue: "Grand Ramp Walkway",
          bounty: "₹30,000",
          berries: "฿ 30,000,000",
          teamSize: "Team of 10-18",
          image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
          summary: "A theatrical fashion showcase bringing together avant-garde futuristic textures, traditional silk heritage, and celestial designs.",
          rules: ["Theme-based presentation required", "Judging based on poise, garment craftsmanship & runway choreography"]
        }
      ]
    }
  ],

  hack2future: {
    id: "hack2future",
    title: "HACK2FUTURE '27",
    tagline: "The Flagship National Astronaut Hackathon",
    institution: "IIIT Dharwad // Research & Innovation Park",
    badge: "Ascent Vector: Stratosphere // Orbit Locked",
    officialUrl: "https://hack2future.iiitdwd.ac.in/",
    theme: "Astronaut Deep Space Odyssey",
    prizePool: "₹1,50,000+",
    berriesPrize: "฿ 150,000,000",
    duration: "36 Hours Non-Stop",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    astronautImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    description: "Breach through the earth's atmosphere. Hack2Future is the premier 36-hour hackathon challenging developers, designers, and innovators to solve cutting-edge industry problems under zero-gravity conditions.",
    tracks: [
      {
        id: "t1",
        name: "Autonomous AI & Agentic Systems",
        icon: "cpu",
        bounty: "₹40,000",
        description: "Build next-gen autonomous LLM agents, multimodality pipelines, and decision intelligence tools."
      },
      {
        id: "t2",
        name: "Cosmic Web3 & Cryptographic Rails",
        icon: "shield",
        bounty: "₹40,000",
        description: "Zero-knowledge proofs, decentralized physical infrastructure networks (DePIN), and resilient protocols."
      },
      {
        id: "t3",
        name: "BioTech, Health & Planetary Sensors",
        icon: "activity",
        bounty: "₹35,000",
        description: "Remote telemetry, health diagnostic models, and planetary climate intelligence data systems."
      },
      {
        id: "t4",
        name: "Open Orbit / Uncharted Innovation",
        icon: "compass",
        bounty: "₹35,000",
        description: "No boundaries. Tackle real-world civic, space exploration, or campus challenges with deep-tech hacks."
      }
    ],
    timeline: [
      { phase: "Phase 01", title: "Online Registration & Idea Blueprint", date: "Until Feb 28, 2027", status: "Open Now" },
      { phase: "Phase 02", title: "Shortlisting & Crew Finalization", date: "March 05, 2027", status: "Upcoming" },
      { phase: "Phase 03", title: "36-Hour Offline Hackathon Kickoff", date: "March 12, 10:00 AM", status: "Grand Stage" },
      { phase: "Phase 04", title: "Final Pitch & Bounty Award Ceremony", date: "March 13, 08:00 PM", status: "Victory" }
    ],
    perks: [
      "₹1.5 Lakhs+ Cash Bounty Pool",
      "Internship & Job Interviews with Sponsor Tech Firms",
      "Free 3-Day Meals, Swag Packs, & Hacker Beds",
      "Direct Mentorship from Industry Staff Engineers"
    ]
  },

  faqs: [
    {
      q: "What is Avinya '27 and who can participate?",
      a: "Avinya is the annual techno-cultural fest of IIIT Dharwad. Students from all recognized colleges across India are eligible to participate in both technical, gaming, cultural, and hackathon events."
    },
    {
      q: "How does the boat navigation and 3 Islands concept work?",
      a: "Avinya is framed as a 3-day nautical expedition across three distinct themed islands: Day 1 (The Last Outpost - Dune Desert), Day 2 (The Pandemonium - Synthwave Cyberpunk), and Day 3 (The Carnival Island - Grand Night Festival). Hack2Future is our cosmic ascension section!"
    },
    {
      q: "Where will the events take place?",
      a: "All events are held offline at the state-of-the-art campus of IIIT Dharwad, Ittigatti Road, Near Sattur Colony, Dharwad, Karnataka."
    },
    {
      q: "Is accommodation provided for outside participants?",
      a: "Yes! Dedicated hostel accommodation and meal packages are available for registered outstation participants on a first-come, first-served basis."
    }
  ]
};
